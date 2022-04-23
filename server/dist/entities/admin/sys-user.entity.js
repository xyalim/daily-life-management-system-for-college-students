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
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const base_entity_1 = require("../base.entity");
let SysUser = class SysUser extends base_entity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SysUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'department_id' }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SysUser.prototype, "departmentId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SysUser.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SysUser.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SysUser.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 32 }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SysUser.prototype, "psalt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nick_name', nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SysUser.prototype, "nickName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'head_img', nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SysUser.prototype, "headImg", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SysUser.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SysUser.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SysUser.prototype, "remark", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', nullable: true, default: 1 }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SysUser.prototype, "status", void 0);
SysUser = __decorate([
    (0, typeorm_1.Entity)({ name: 'sys_user' })
], SysUser);
exports.default = SysUser;
//# sourceMappingURL=sys-user.entity.js.map