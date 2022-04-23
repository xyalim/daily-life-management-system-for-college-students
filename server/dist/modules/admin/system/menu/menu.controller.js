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
exports.SysMenuController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const lodash_1 = require("lodash");
const admin_constants_1 = require("../../admin.constants");
const api_exception_1 = require("../../../../common/exceptions/api.exception");
const sys_menu_entity_1 = require("../../../../entities/admin/sys-menu.entity");
const admin_user_decorator_1 = require("../../core/decorators/admin-user.decorator");
const menu_class_1 = require("./menu.class");
const menu_dto_1 = require("./menu.dto");
const menu_service_1 = require("./menu.service");
let SysMenuController = class SysMenuController {
    constructor(menuService) {
        this.menuService = menuService;
    }
    async list(user) {
        return await this.menuService.getMenus(user.uid);
    }
    async add(dto) {
        await this.menuService.check(dto);
        if (dto.parentId === -1) {
            dto.parentId = null;
        }
        await this.menuService.save(dto);
        if (dto.type === 2) {
            await this.menuService.refreshOnlineUserPerms();
        }
    }
    async update(dto) {
        if (dto.menuId <= admin_constants_1.FORBIDDEN_OP_MENU_ID_INDEX) {
            throw new api_exception_1.ApiException(10016);
        }
        await this.menuService.check(dto);
        if (dto.parentId === -1) {
            dto.parentId = null;
        }
        const insertData = Object.assign(Object.assign({}, dto), { id: dto.menuId });
        await this.menuService.save(insertData);
        if (dto.type === 2) {
            await this.menuService.refreshOnlineUserPerms();
        }
    }
    async delete(dto) {
        if (dto.menuId <= admin_constants_1.FORBIDDEN_OP_MENU_ID_INDEX) {
            throw new api_exception_1.ApiException(10016);
        }
        const childMenus = await this.menuService.findChildMenus(dto.menuId);
        await this.menuService.deleteMenuItem((0, lodash_1.flattenDeep)([dto.menuId, childMenus]));
        await this.menuService.refreshOnlineUserPerms();
    }
    async info(dto) {
        return await this.menuService.getMenuItemAndParentInfo(dto.menuId);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '获取对应权限的菜单列表' }),
    (0, swagger_1.ApiOkResponse)({ type: [sys_menu_entity_1.default] }),
    (0, common_1.Get)('list'),
    __param(0, (0, admin_user_decorator_1.AdminUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SysMenuController.prototype, "list", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '新增菜单或权限' }),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [menu_dto_1.CreateMenuDto]),
    __metadata("design:returntype", Promise)
], SysMenuController.prototype, "add", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '新增菜单或权限' }),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [menu_dto_1.UpdateMenuDto]),
    __metadata("design:returntype", Promise)
], SysMenuController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '删除菜单或权限' }),
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [menu_dto_1.DeleteMenuDto]),
    __metadata("design:returntype", Promise)
], SysMenuController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '菜单或权限信息' }),
    (0, swagger_1.ApiOkResponse)({ type: menu_class_1.MenuItemAndParentInfoResult }),
    (0, common_1.Get)('info'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [menu_dto_1.InfoMenuDto]),
    __metadata("design:returntype", Promise)
], SysMenuController.prototype, "info", null);
SysMenuController = __decorate([
    (0, swagger_1.ApiSecurity)(admin_constants_1.ADMIN_PREFIX),
    (0, swagger_1.ApiTags)('菜单权限模块'),
    (0, common_1.Controller)('menu'),
    __metadata("design:paramtypes", [menu_service_1.SysMenuService])
], SysMenuController);
exports.SysMenuController = SysMenuController;
//# sourceMappingURL=menu.controller.js.map