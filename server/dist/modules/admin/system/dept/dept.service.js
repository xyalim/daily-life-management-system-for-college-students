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
exports.SysDeptService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const admin_constants_1 = require("../../admin.constants");
const api_exception_1 = require("../../../../common/exceptions/api.exception");
const sys_department_entity_1 = require("../../../../entities/admin/sys-department.entity");
const sys_role_department_entity_1 = require("../../../../entities/admin/sys-role-department.entity");
const sys_user_entity_1 = require("../../../../entities/admin/sys-user.entity");
const typeorm_2 = require("typeorm");
const role_service_1 = require("../role/role.service");
let SysDeptService = class SysDeptService {
    constructor(userRepositoty, deptRepositoty, roleDeptRepositoty, entityManager, rootRoleId, roleService) {
        this.userRepositoty = userRepositoty;
        this.deptRepositoty = deptRepositoty;
        this.roleDeptRepositoty = roleDeptRepositoty;
        this.entityManager = entityManager;
        this.rootRoleId = rootRoleId;
        this.roleService = roleService;
    }
    async list() {
        return await this.deptRepositoty.find();
    }
    async info(id) {
        const department = await this.deptRepositoty.findOne({ id });
        if ((0, lodash_1.isEmpty)(department)) {
            throw new api_exception_1.ApiException(10019);
        }
        let parentDepartment = null;
        if (department.parentId) {
            parentDepartment = await this.deptRepositoty.findOne({
                id: department.parentId,
            });
        }
        return { department, parentDepartment };
    }
    async update(param) {
        await this.deptRepositoty.update(param.id, {
            parentId: param.parentId === -1 ? undefined : param.parentId,
            name: param.name,
            orderNum: param.orderNum,
        });
    }
    async transfer(userIds, deptId) {
        await this.userRepositoty.update({ id: (0, typeorm_2.In)(userIds) }, { departmentId: deptId });
    }
    async add(deptName, parentDeptId) {
        await this.deptRepositoty.insert({
            name: deptName,
            parentId: parentDeptId === -1 ? null : parentDeptId,
        });
    }
    async move(depts) {
        await this.entityManager.transaction(async (manager) => {
            for (let i = 0; i < depts.length; i++) {
                await manager.update(sys_department_entity_1.default, { id: depts[i].id }, { parentId: depts[i].parentId });
            }
        });
    }
    async delete(departmentId) {
        await this.deptRepositoty.delete(departmentId);
    }
    async countUserByDeptId(id) {
        return await this.userRepositoty.count({ departmentId: id });
    }
    async countRoleByDeptId(id) {
        return await this.roleDeptRepositoty.count({ departmentId: id });
    }
    async countChildDept(id) {
        return await this.deptRepositoty.count({ parentId: id });
    }
    async getDepts(uid) {
        const roleIds = await this.roleService.getRoleIdByUser(uid);
        let depts = [];
        if ((0, lodash_1.includes)(roleIds, this.rootRoleId)) {
            depts = await this.deptRepositoty.find();
        }
        else {
            depts = await this.deptRepositoty
                .createQueryBuilder('dept')
                .innerJoinAndSelect('sys_role_department', 'role_dept', 'dept.id = role_dept.department_id')
                .andWhere('role_dept.role_id IN (:...roldIds)', { roldIds: roleIds })
                .orderBy('dept.order_num', 'ASC')
                .getMany();
        }
        return depts;
    }
};
SysDeptService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sys_user_entity_1.default)),
    __param(1, (0, typeorm_1.InjectRepository)(sys_department_entity_1.default)),
    __param(2, (0, typeorm_1.InjectRepository)(sys_role_department_entity_1.default)),
    __param(3, (0, typeorm_1.InjectEntityManager)()),
    __param(4, (0, common_1.Inject)(admin_constants_1.ROOT_ROLE_ID)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.EntityManager, Number, role_service_1.SysRoleService])
], SysDeptService);
exports.SysDeptService = SysDeptService;
//# sourceMappingURL=dept.service.js.map