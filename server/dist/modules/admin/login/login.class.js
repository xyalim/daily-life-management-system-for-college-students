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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermMenuInfo = exports.LoginToken = exports.ImageCaptcha = void 0;
const swagger_1 = require("@nestjs/swagger");
const sys_menu_entity_1 = require("../../../entities/admin/sys-menu.entity");
class ImageCaptcha {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'base64格式的svg图片',
    }),
    __metadata("design:type", String)
], ImageCaptcha.prototype, "img", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '验证码对应的唯一ID',
    }),
    __metadata("design:type", String)
], ImageCaptcha.prototype, "id", void 0);
exports.ImageCaptcha = ImageCaptcha;
class LoginToken {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'JWT身份Token' }),
    __metadata("design:type", String)
], LoginToken.prototype, "token", void 0);
exports.LoginToken = LoginToken;
class PermMenuInfo {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '菜单列表', type: [sys_menu_entity_1.default] }),
    __metadata("design:type", Array)
], PermMenuInfo.prototype, "menus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '权限列表', type: [String] }),
    __metadata("design:type", Array)
], PermMenuInfo.prototype, "perms", void 0);
exports.PermMenuInfo = PermMenuInfo;
//# sourceMappingURL=login.class.js.map