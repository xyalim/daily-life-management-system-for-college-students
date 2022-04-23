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
exports.AccountController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_constants_1 = require("../admin.constants");
const admin_user_decorator_1 = require("../core/decorators/admin-user.decorator");
const permission_optional_decorator_1 = require("../core/decorators/permission-optional.decorator");
const login_class_1 = require("../login/login.class");
const login_service_1 = require("../login/login.service");
const user_class_1 = require("../system/user/user.class");
const user_dto_1 = require("../system/user/user.dto");
const user_service_1 = require("../system/user/user.service");
const account_dto_1 = require("./account.dto");
let AccountController = class AccountController {
    constructor(userService, loginService) {
        this.userService = userService;
        this.loginService = loginService;
    }
    async info(user) {
        return await this.userService.getAccountInfo(user.uid);
    }
    async update(dto, user) {
        await this.userService.updatePersonInfo(user.uid, dto);
    }
    async password(dto, user) {
        await this.userService.updatePassword(user.uid, dto);
    }
    async logout(user) {
        await this.loginService.clearLoginStatus(user.uid);
    }
    async permmenu(user) {
        return await this.loginService.getPermMenu(user.uid);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '获取管理员资料' }),
    (0, swagger_1.ApiOkResponse)({ type: user_class_1.AccountInfo }),
    (0, permission_optional_decorator_1.PermissionOptional)(),
    (0, common_1.Get)('info'),
    __param(0, (0, admin_user_decorator_1.AdminUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "info", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '更改管理员资料' }),
    (0, permission_optional_decorator_1.PermissionOptional)(),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, admin_user_decorator_1.AdminUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_dto_1.UpdatePersonInfoDto, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '更改管理员密码' }),
    (0, permission_optional_decorator_1.PermissionOptional)(),
    (0, common_1.Post)('password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, admin_user_decorator_1.AdminUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdatePasswordDto, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "password", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '管理员登出' }),
    (0, permission_optional_decorator_1.PermissionOptional)(),
    (0, common_1.Post)('logout'),
    __param(0, (0, admin_user_decorator_1.AdminUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "logout", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '获取菜单列表及权限列表' }),
    (0, swagger_1.ApiOkResponse)({ type: login_class_1.PermMenuInfo }),
    (0, permission_optional_decorator_1.PermissionOptional)(),
    (0, common_1.Get)('permmenu'),
    __param(0, (0, admin_user_decorator_1.AdminUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "permmenu", null);
AccountController = __decorate([
    (0, swagger_1.ApiTags)('账户模块'),
    (0, swagger_1.ApiSecurity)(admin_constants_1.ADMIN_PREFIX),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [user_service_1.SysUserService,
        login_service_1.LoginService])
], AccountController);
exports.AccountController = AccountController;
//# sourceMappingURL=account.controller.js.map