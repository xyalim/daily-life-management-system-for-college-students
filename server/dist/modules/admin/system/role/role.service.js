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
exports.SysRoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const sys_role_department_entity_1 = require("../../../../entities/admin/sys-role-department.entity");
const sys_role_menu_entity_1 = require("../../../../entities/admin/sys-role-menu.entity");
const sys_role_entity_1 = require("../../../../entities/admin/sys-role.entity");
const sys_user_role_entity_1 = require("../../../../entities/admin/sys-user-role.entity");
const typeorm_2 = require("typeorm");
const admin_constants_1 = require("../../admin.constants");
let SysRoleService = class SysRoleService {
    constructor(roleRepository, roleMenuRepository, roleDepartmentRepository, userRoleRepository, entityManager, rootRoleId) {
        this.roleRepository = roleRepository;
        this.roleMenuRepository = roleMenuRepository;
        this.roleDepartmentRepository = roleDepartmentRepository;
        this.userRoleRepository = userRoleRepository;
        this.entityManager = entityManager;
        this.rootRoleId = rootRoleId;
    }
    async list() {
        const result = await this.roleRepository.find({
            id: (0, typeorm_2.Not)(this.rootRoleId),
        });
        return result;
    }
    async count() {
        const count = await this.roleRepository.count({
            id: (0, typeorm_2.Not)(this.rootRoleId),
        });
        return count;
    }
    async info(rid) {
        const roleInfo = await this.roleRepository.findOne({ id: rid });
        const menus = await this.roleMenuRepository.find({ roleId: rid });
        const depts = await this.roleDepartmentRepository.find({ roleId: rid });
        return { roleInfo, menus, depts };
    }
    async delete(roleIds) {
        if ((0, lodash_1.includes)(roleIds, this.rootRoleId)) {
            throw new Error('Not Support Delete Root');
        }
        await this.entityManager.transaction(async (manager) => {
            await manager.delete(sys_role_entity_1.default, roleIds);
            await manager.delete(sys_role_menu_entity_1.default, { roleId: (0, typeorm_2.In)(roleIds) });
            await manager.delete(sys_role_department_entity_1.default, { roleId: (0, typeorm_2.In)(roleIds) });
        });
    }
    async add(param, uid) {
        const { name, label, remark, menus, depts } = param;
        const role = await this.roleRepository.insert({
            name,
            label,
            remark,
            userId: `${uid}`,
        });
        const { identifiers } = role;
        const roleId = parseInt(identifiers[0].id);
        if (menus && menus.length > 0) {
            const insertRows = menus.map((m) => {
                return {
                    roleId,
                    menuId: m,
                };
            });
            await this.roleMenuRepository.insert(insertRows);
        }
        if (depts && depts.length > 0) {
            const insertRows = depts.map((d) => {
                return {
                    roleId,
                    departmentId: d,
                };
            });
            await this.roleDepartmentRepository.insert(insertRows);
        }
        return { roleId };
    }
    async update(param) {
        const { roleId, name, label, remark, menus, depts } = param;
        const role = await this.roleRepository.save({
            id: roleId,
            name,
            label,
            remark,
        });
        const originDeptRows = await this.roleDepartmentRepository.find({ roleId });
        const originMenuRows = await this.roleMenuRepository.find({ roleId });
        const originMenuIds = originMenuRows.map((e) => {
            return e.menuId;
        });
        const originDeptIds = originDeptRows.map((e) => {
            return e.departmentId;
        });
        const insertMenusRowIds = (0, lodash_1.difference)(menus, originMenuIds);
        const deleteMenusRowIds = (0, lodash_1.difference)(originMenuIds, menus);
        const insertDeptRowIds = (0, lodash_1.difference)(depts, originDeptIds);
        const deleteDeptRowIds = (0, lodash_1.difference)(originDeptIds, depts);
        await this.entityManager.transaction(async (manager) => {
            if (insertMenusRowIds.length > 0) {
                const insertRows = insertMenusRowIds.map((e) => {
                    return {
                        roleId,
                        menuId: e,
                    };
                });
                await manager.insert(sys_role_menu_entity_1.default, insertRows);
            }
            if (deleteMenusRowIds.length > 0) {
                const realDeleteRowIds = (0, lodash_1.filter)(originMenuRows, (e) => {
                    return (0, lodash_1.includes)(deleteMenusRowIds, e.menuId);
                }).map((e) => {
                    return e.id;
                });
                await manager.delete(sys_role_menu_entity_1.default, realDeleteRowIds);
            }
            if (insertDeptRowIds.length > 0) {
                const insertRows = insertDeptRowIds.map((e) => {
                    return {
                        roleId,
                        departmentId: e,
                    };
                });
                await manager.insert(sys_role_department_entity_1.default, insertRows);
            }
            if (deleteDeptRowIds.length > 0) {
                const realDeleteRowIds = (0, lodash_1.filter)(originDeptRows, (e) => {
                    return (0, lodash_1.includes)(deleteDeptRowIds, e.departmentId);
                }).map((e) => {
                    return e.id;
                });
                await manager.delete(sys_role_department_entity_1.default, realDeleteRowIds);
            }
        });
        return role;
    }
    async page(page, count) {
        const result = await this.roleRepository.find({
            where: {
                id: (0, typeorm_2.Not)(this.rootRoleId),
            },
            order: {
                id: 'ASC',
            },
            take: count,
            skip: page * count,
        });
        return result;
    }
    async getRoleIdByUser(id) {
        const result = await this.userRoleRepository.find({
            where: {
                userId: id,
            },
        });
        if (!(0, lodash_1.isEmpty)(result)) {
            return (0, lodash_1.map)(result, (v) => {
                return v.roleId;
            });
        }
        return [];
    }
    async countUserIdByRole(ids) {
        if ((0, lodash_1.includes)(ids, this.rootRoleId)) {
            throw new Error('Not Support Delete Root');
        }
        return await this.userRoleRepository.count({ roleId: (0, typeorm_2.In)(ids) });
    }
};
SysRoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sys_role_entity_1.default)),
    __param(1, (0, typeorm_1.InjectRepository)(sys_role_menu_entity_1.default)),
    __param(2, (0, typeorm_1.InjectRepository)(sys_role_department_entity_1.default)),
    __param(3, (0, typeorm_1.InjectRepository)(sys_user_role_entity_1.default)),
    __param(4, (0, typeorm_1.InjectEntityManager)()),
    __param(5, (0, common_1.Inject)(admin_constants_1.ROOT_ROLE_ID)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.EntityManager, Number])
], SysRoleService);
exports.SysRoleService = SysRoleService;
//# sourceMappingURL=role.service.js.map