"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SysUserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const api_exception_1 = require("../../../../common/exceptions/api.exception");
const sys_department_entity_1 = require("../../../../entities/admin/sys-department.entity");
const sys_user_role_entity_1 = require("../../../../entities/admin/sys-user-role.entity");
const sys_user_entity_1 = require("../../../../entities/admin/sys-user.entity");
const util_service_1 = require("../../../../shared/services/util.service");
const typeorm_2 = require("typeorm");
const admin_constants_1 = require("../../admin.constants");
const redis_service_1 = require("../../../../shared/services/redis.service");
const param_config_service_1 = require("../param-config/param-config.service");
const param_config_contants_1 = require("../../../../common/contants/param-config.contants");
let SysUserService = class SysUserService {
    constructor(userRepository, departmentRepository, userRoleRepository, redisService, paramConfigService, entityManager, rootRoleId, util) {
        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
        this.userRoleRepository = userRoleRepository;
        this.redisService = redisService;
        this.paramConfigService = paramConfigService;
        this.entityManager = entityManager;
        this.rootRoleId = rootRoleId;
        this.util = util;
    }
    async findUserByUserName(username) {
        return await this.userRepository.findOne({
            username: username,
            status: 1,
        });
    }
    async getAccountInfo(uid) {
        const user = await this.userRepository.findOne({ id: uid });
        if ((0, lodash_1.isEmpty)(user)) {
            throw new api_exception_1.ApiException(10017);
        }
        return {
            name: user.name,
            nickName: user.nickName,
            email: user.email,
            phone: user.phone,
            remark: user.remark,
            headImg: user.headImg,
        };
    }
    async updatePersonInfo(uid, info) {
        await this.userRepository.update(uid, info);
    }
    async updatePassword(uid, dto) {
        const user = await this.userRepository.findOne({ id: uid });
        if ((0, lodash_1.isEmpty)(user)) {
            throw new api_exception_1.ApiException(10017);
        }
        const comparePassword = this.util.md5(`${dto.originPassword}${user.psalt}`);
        if (user.password !== comparePassword) {
            throw new api_exception_1.ApiException(10011);
        }
        const password = this.util.md5(`${dto.newPassword}${user.psalt}`);
        await this.userRepository.update({ id: uid }, { password });
        await this.upgradePasswordV(user.id);
    }
    async forceUpdatePassword(uid, password) {
        const user = await this.userRepository.findOne({ id: uid });
        if ((0, lodash_1.isEmpty)(user)) {
            throw new api_exception_1.ApiException(10017);
        }
        const newPassword = this.util.md5(`${password}${user.psalt}`);
        await this.userRepository.update({ id: uid }, { password: newPassword });
        await this.upgradePasswordV(user.id);
    }
    async add(param) {
        const exists = await this.userRepository.findOne({
            username: param.username,
        });
        if (!(0, lodash_1.isEmpty)(exists)) {
            throw new api_exception_1.ApiException(10001);
        }
        await this.entityManager.transaction(async (manager) => {
            const salt = this.util.generateRandomValue(32);
            const initPassword = await this.paramConfigService.findValueByKey(param_config_contants_1.SYS_USER_INITPASSWORD);
            const password = this.util.md5(`${initPassword !== null && initPassword !== void 0 ? initPassword : '123456'}${salt}`);
            const u = manager.create(sys_user_entity_1.default, {
                departmentId: param.departmentId,
                username: param.username,
                password,
                name: param.name,
                nickName: param.nickName,
                email: param.email,
                phone: param.phone,
                remark: param.remark,
                status: param.status,
                psalt: salt,
            });
            const result = await manager.save(u);
            const { roles } = param;
            const insertRoles = roles.map((e) => {
                return {
                    roleId: e,
                    userId: result.id,
                };
            });
            await manager.insert(sys_user_role_entity_1.default, insertRoles);
        });
    }
    async update(param) {
        await this.entityManager.transaction(async (manager) => {
            await manager.update(sys_user_entity_1.default, param.id, {
                departmentId: param.departmentId,
                username: param.username,
                name: param.name,
                nickName: param.nickName,
                email: param.email,
                phone: param.phone,
                remark: param.remark,
                status: param.status,
            });
            await manager.delete(sys_user_role_entity_1.default, { userId: param.id });
            const insertRoles = param.roles.map((e) => {
                return {
                    roleId: e,
                    userId: param.id,
                };
            });
            await manager.insert(sys_user_role_entity_1.default, insertRoles);
            if (param.status === 0) {
                await this.forbidden(param.id);
            }
        });
    }
    async info(id) {
        const user = await this.userRepository.findOne(id);
        if ((0, lodash_1.isEmpty)(user)) {
            throw new api_exception_1.ApiException(10017);
        }
        const departmentRow = await this.departmentRepository.findOne({
            id: user.departmentId,
        });
        if ((0, lodash_1.isEmpty)(departmentRow)) {
            throw new api_exception_1.ApiException(10018);
        }
        const roleRows = await this.userRoleRepository.find({ userId: user.id });
        const roles = roleRows.map((e) => {
            return e.roleId;
        });
        delete user.password;
        return Object.assign(Object.assign({}, user), { roles, departmentName: departmentRow.name });
    }
    async infoList(ids) {
        const users = await this.userRepository.findByIds(ids);
        return users;
    }
    async delete(userIds) {
        const rootUserId = await this.findRootUserId();
        if (userIds.includes(rootUserId)) {
            throw new Error('can not delete root user!');
        }
        await this.userRepository.delete(userIds);
        await this.userRoleRepository.delete({ userId: (0, typeorm_2.In)(userIds) });
    }
    async count(uid, deptIds) {
        const queryAll = (0, lodash_1.isEmpty)(deptIds);
        const rootUserId = await this.findRootUserId();
        if (queryAll) {
            return await this.userRepository.count({
                id: (0, typeorm_2.Not)((0, typeorm_2.In)([rootUserId, uid])),
            });
        }
        return await this.userRepository.count({
            id: (0, typeorm_2.Not)((0, typeorm_2.In)([rootUserId, uid])),
            departmentId: (0, typeorm_2.In)(deptIds),
        });
    }
    async findRootUserId() {
        const result = await this.userRoleRepository.findOne({
            id: this.rootRoleId,
        });
        return result.userId;
    }
    async page(uid, deptIds, page, count) {
        const queryAll = (0, lodash_1.isEmpty)(deptIds);
        const rootUserId = await this.findRootUserId();
        const result = await this.userRepository
            .createQueryBuilder('user')
            .innerJoinAndSelect('sys_department', 'dept', 'dept.id = user.departmentId')
            .innerJoinAndSelect('sys_user_role', 'user_role', 'user_role.user_id = user.id')
            .innerJoinAndSelect('sys_role', 'role', 'role.id = user_role.role_id')
            .where('user.id NOT IN (:...ids)', { ids: [rootUserId, uid] })
            .andWhere(queryAll ? '1 = 1' : 'user.departmentId IN (:...deptIds)', {
            deptIds,
        })
            .offset(page * count)
            .limit(count)
            .getRawMany();
        const dealResult = [];
        result.forEach((e) => {
            const index = (0, lodash_1.findIndex)(dealResult, (e2) => e2.id === e.user_id);
            if (index < 0) {
                dealResult.push({
                    createdAt: e.user_created_at,
                    departmentId: e.user_department_id,
                    email: e.user_email,
                    headImg: e.user_head_img,
                    id: e.user_id,
                    name: e.user_name,
                    nickName: e.user_nick_name,
                    phone: e.user_phone,
                    remark: e.user_remark,
                    status: e.user_status,
                    updatedAt: e.user_updated_at,
                    username: e.user_username,
                    departmentName: e.dept_name,
                    roleNames: [e.role_name],
                });
            }
            else {
                dealResult[index].roleNames.push(e.role_name);
            }
        });
        return dealResult;
    }
    async forbidden(uid) {
        await this.redisService.getRedis().del(`admin:passwordVersion:${uid}`);
        await this.redisService.getRedis().del(`admin:token:${uid}`);
        await this.redisService.getRedis().del(`admin:perms:${uid}`);
    }
    async multiForbidden(uids) {
        if (uids) {
            const pvs = [];
            const ts = [];
            const ps = [];
            uids.forEach((e) => {
                pvs.push(`admin:passwordVersion:${e}`);
                ts.push(`admin:token:${e}`);
                ps.push(`admin:perms:${e}`);
            });
            await this.redisService.getRedis().del(pvs);
            await this.redisService.getRedis().del(ts);
            await this.redisService.getRedis().del(ps);
        }
    }
    async upgradePasswordV(id) {
        const v = await this.redisService
            .getRedis()
            .get(`admin:passwordVersion:${id}`);
        if (!(0, lodash_1.isEmpty)(v)) {
            await this.redisService
                .getRedis()
                .set(`admin:passwordVersion:${id}`, parseInt(v) + 1);
        }
    }
};
SysUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sys_user_entity_1.default)),
    __param(1, (0, typeorm_1.InjectRepository)(sys_department_entity_1.default)),
    __param(2, (0, typeorm_1.InjectRepository)(sys_user_role_entity_1.default)),
    __param(5, (0, typeorm_1.InjectEntityManager)()),
    __param(6, (0, common_1.Inject)(admin_constants_1.ROOT_ROLE_ID)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        redis_service_1.RedisService,
        param_config_service_1.SysParamConfigService,
        typeorm_2.EntityManager, Number, util_service_1.UtilService])
], SysUserService);
exports.SysUserService = SysUserService;
//# sourceMappingURL=user.service.js.map