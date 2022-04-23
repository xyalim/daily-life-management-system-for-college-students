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
exports.SysRoleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_constants_1 = require("../../admin.constants");
const page_dto_1 = require("../../../../common/dto/page.dto");
const sys_role_entity_1 = require("../../../../entities/admin/sys-role.entity");
const role_service_1 = require("./role.service");
const role_dto_1 = require("./role.dto");
const api_exception_1 = require("../../../../common/exceptions/api.exception");
const admin_user_decorator_1 = require("../../core/decorators/admin-user.decorator");
const role_class_1 = require("./role.class");
const menu_service_1 = require("../menu/menu.service");
let SysRoleController = class SysRoleController {
    constructor(roleService, menuService) {
        this.roleService = roleService;
        this.menuService = menuService;
    }
    async list() {
        return await this.roleService.list();
    }
    async page(dto) {
        const list = await this.roleService.page(dto.page - 1, dto.limit);
        const count = await this.roleService.count();
        return {
            list,
            pagination: {
                size: dto.limit,
                page: dto.page,
                total: count,
            },
        };
    }
    async delete(dto) {
        const count = await this.roleService.countUserIdByRole(dto.roleIds);
        if (count > 0) {
            throw new api_exception_1.ApiException(10008);
        }
        await this.roleService.delete(dto.roleIds);
        await this.menuService.refreshOnlineUserPerms();
    }
    async add(dto, user) {
        await this.roleService.add(dto, user.uid);
    }
    async update(dto) {
        await this.roleService.update(dto);
        await this.menuService.refreshOnlineUserPerms();
    }
    async info(dto) {
        return await this.roleService.info(dto.roleId);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '获取角色列表' }),
    (0, swagger_1.ApiOkResponse)({ type: [sys_role_entity_1.default] }),
    (0, common_1.Get)('list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SysRoleController.prototype, "list", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '分页查询角色信息' }),
    (0, swagger_1.ApiOkResponse)({ type: [sys_role_entity_1.default] }),
    (0, common_1.Get)('page'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_dto_1.PageOptionsDto]),
    __metadata("design:returntype", Promise)
], SysRoleController.prototype, "page", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '删除角色' }),
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.DeleteRoleDto]),
    __metadata("design:returntype", Promise)
], SysRoleController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '新增角色' }),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, admin_user_decorator_1.AdminUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.CreateRoleDto, Object]),
    __metadata("design:returntype", Promise)
], SysRoleController.prototype, "add", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '更新角色' }),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.UpdateRoleDto]),
    __metadata("design:returntype", Promise)
], SysRoleController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '获取角色信息' }),
    (0, swagger_1.ApiOkResponse)({ type: role_class_1.RoleInfo }),
    (0, common_1.Get)('info'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.InfoRoleDto]),
    __metadata("design:returntype", Promise)
], SysRoleController.prototype, "info", null);
SysRoleController = __decorate([
    (0, swagger_1.ApiSecurity)(admin_constants_1.ADMIN_PREFIX),
    (0, swagger_1.ApiTags)('角色模块'),
    (0, common_1.Controller)('role'),
    __metadata("design:paramtypes", [role_service_1.SysRoleService,
        menu_service_1.SysMenuService])
], SysRoleController);
exports.SysRoleController = SysRoleController;
//# sourceMappingURL=role.controller.js.map