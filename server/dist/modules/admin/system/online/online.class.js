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
exports.OnlineUserInfo = void 0;
const swagger_1 = require("@nestjs/swagger");
class OnlineUserInfo {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '最近的一条登录日志ID' }),
    __metadata("design:type", Number)
], OnlineUserInfo.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '登录IP' }),
    __metadata("design:type", String)
], OnlineUserInfo.prototype, "ip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户名' }),
    __metadata("design:type", String)
], OnlineUserInfo.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '是否当前' }),
    __metadata("design:type", Boolean)
], OnlineUserInfo.prototype, "isCurrent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '登陆时间' }),
    __metadata("design:type", String)
], OnlineUserInfo.prototype, "time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '系统' }),
    __metadata("design:type", String)
], OnlineUserInfo.prototype, "os", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '浏览器' }),
    __metadata("design:type", String)
], OnlineUserInfo.prototype, "browser", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '是否禁用' }),
    __metadata("design:type", Boolean)
], OnlineUserInfo.prototype, "disable", void 0);
exports.OnlineUserInfo = OnlineUserInfo;
//# sourceMappingURL=online.class.js.map