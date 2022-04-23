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
exports.SysDeptController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_constants_1 = require("../../admin.constants");
const api_exception_1 = require("../../../../common/exceptions/api.exception");
const sys_department_entity_1 = require("../../../../entities/admin/sys-department.entity");
const admin_user_decorator_1 = require("../../core/decorators/admin-user.decorator");
const dept_class_1 = require("./dept.class");
const dept_dto_1 = require("./dept.dto");
const dept_service_1 = require("./dept.service");
let SysDeptController = class SysDeptController {
    constructor(deptService) {
        this.deptService = deptService;
    }
    async list(uid) {
        return await this.deptService.getDepts(uid);
    }
    async add(createDeptDto) {
        await this.deptService.add(createDeptDto.name, createDeptDto.parentId);
    }
    async delete(deleteDeptDto) {
        const count = await this.deptService.countUserByDeptId(deleteDeptDto.departmentId);
        if (count > 0) {
            throw new api_exception_1.ApiException(10009);
        }
        const count2 = await this.deptService.countRoleByDeptId(deleteDeptDto.departmentId);
        if (count2 > 0) {
            throw new api_exception_1.ApiException(10010);
        }
        const count3 = await this.deptService.countChildDept(deleteDeptDto.departmentId);
        if (count3 > 0) {
            throw new api_exception_1.ApiException(10015);
        }
        await this.deptService.delete(deleteDeptDto.departmentId);
    }
    async info(infoDeptDto) {
        return await this.deptService.info(infoDeptDto.departmentId);
    }
    async update(updateDeptDto) {
        await this.deptService.update(updateDeptDto);
    }
    async transfer(transferDeptDto) {
        await this.deptService.transfer(transferDeptDto.userIds, transferDeptDto.departmentId);
    }
    async move(dto) {
        await this.deptService.move(dto.depts);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '获取系统部门列表' }),
    (0, swagger_1.ApiOkResponse)({ type: [sys_department_entity_1.default] }),
    (0, common_1.Get)('list'),
    __param(0, (0, admin_user_decorator_1.AdminUser)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SysDeptController.prototype, "list", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '创建系统部门' }),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dept_dto_1.CreateDeptDto]),
    __metadata("design:returntype", Promise)
], SysDeptController.prototype, "add", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '删除系统部门' }),
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dept_dto_1.DeleteDeptDto]),
    __metadata("design:returntype", Promise)
], SysDeptController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '查询单个系统部门信息' }),
    (0, swagger_1.ApiOkResponse)({ type: dept_class_1.DeptDetailInfo }),
    (0, common_1.Get)('info'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dept_dto_1.InfoDeptDto]),
    __metadata("design:returntype", Promise)
], SysDeptController.prototype, "info", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '更新系统部门' }),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dept_dto_1.UpdateDeptDto]),
    __metadata("design:returntype", Promise)
], SysDeptController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '管理员部门转移' }),
    (0, common_1.Post)('transfer'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dept_dto_1.TransferDeptDto]),
    __metadata("design:returntype", Promise)
], SysDeptController.prototype, "transfer", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '部门移动排序' }),
    (0, common_1.Post)('move'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dept_dto_1.MoveDeptDto]),
    __metadata("design:returntype", Promise)
], SysDeptController.prototype, "move", null);
SysDeptController = __decorate([
    (0, swagger_1.ApiSecurity)(admin_constants_1.ADMIN_PREFIX),
    (0, swagger_1.ApiTags)('部门模块'),
    (0, common_1.Controller)('dept'),
    __metadata("design:paramtypes", [dept_service_1.SysDeptService])
], SysDeptController);
exports.SysDeptController = SysDeptController;
//# sourceMappingURL=dept.controller.js.map