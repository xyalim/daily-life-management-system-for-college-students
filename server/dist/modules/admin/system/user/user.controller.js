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
exports.SysUserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_constants_1 = require("../../admin.constants");
const admin_user_decorator_1 = require("../../core/decorators/admin-user.decorator");
const user_dto_1 = require("./user.dto");
const user_class_1 = require("./user.class");
const user_service_1 = require("./user.service");
const menu_service_1 = require("../menu/menu.service");
let SysUserController = class SysUserController {
    constructor(userService, menuService) {
        this.userService = userService;
        this.menuService = menuService;
    }
    async add(dto) {
        await this.userService.add(dto);
    }
    async info(dto) {
        return await this.userService.info(dto.userId);
    }
    async delete(dto) {
        await this.userService.delete(dto.userIds);
        await this.userService.multiForbidden(dto.userIds);
    }
    async page(dto, user) {
        const list = await this.userService.page(user.uid, dto.departmentIds, dto.page - 1, dto.limit);
        const total = await this.userService.count(user.uid, dto.departmentIds);
        return {
            list,
            pagination: {
                total,
                page: dto.page,
                size: dto.limit,
            },
        };
    }
    async update(dto) {
        await this.userService.update(dto);
        await this.menuService.refreshPerms(dto.id);
    }
    async password(dto) {
        await this.userService.forceUpdatePassword(dto.userId, dto.password);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '新增管理员',
    }),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], SysUserController.prototype, "add", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '查询管理员信息',
    }),
    (0, swagger_1.ApiOkResponse)({ type: user_class_1.UserDetailInfo }),
    (0, common_1.Get)('info'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.InfoUserDto]),
    __metadata("design:returntype", Promise)
], SysUserController.prototype, "info", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '根据ID列表删除管理员',
    }),
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.DeleteUserDto]),
    __metadata("design:returntype", Promise)
], SysUserController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '分页获取管理员列表',
    }),
    (0, swagger_1.ApiOkResponse)({ type: [user_class_1.PageSearchUserInfo] }),
    (0, common_1.Post)('page'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, admin_user_decorator_1.AdminUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.PageSearchUserDto, Object]),
    __metadata("design:returntype", Promise)
], SysUserController.prototype, "page", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '更新管理员信息',
    }),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], SysUserController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '更改指定管理员密码',
    }),
    (0, common_1.Post)('password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.PasswordUserDto]),
    __metadata("design:returntype", Promise)
], SysUserController.prototype, "password", null);
SysUserController = __decorate([
    (0, swagger_1.ApiSecurity)(admin_constants_1.ADMIN_PREFIX),
    (0, swagger_1.ApiTags)('管理员模块'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.SysUserService,
        menu_service_1.SysMenuService])
], SysUserController);
exports.SysUserController = SysUserController;
//# sourceMappingURL=user.controller.js.map