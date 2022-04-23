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
exports.PasswordUserDto = exports.PageSearchUserDto = exports.DeleteUserDto = exports.InfoUserDto = exports.UpdateUserDto = exports.CreateUserDto = exports.UpdatePasswordDto = exports.UpdateUserInfoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const lodash_1 = require("lodash");
const page_dto_1 = require("../../../../common/dto/page.dto");
class UpdateUserInfoDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '用户呢称',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserInfoDto.prototype, "nickName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '用户邮箱',
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.ValidateIf)((o) => !(0, lodash_1.isEmpty)(o.email)),
    __metadata("design:type", String)
], UpdateUserInfoDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '用户手机号',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserInfoDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '用户备注',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserInfoDto.prototype, "remark", void 0);
exports.UpdateUserInfoDto = UpdateUserInfoDto;
class UpdatePasswordDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '更改前的密码',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.Matches)(/^[a-z0-9A-Z`~!#%^&*=+\\|{};:'\\",<>/?]+$/),
    __metadata("design:type", String)
], UpdatePasswordDto.prototype, "originPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '更改后的密码',
    }),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.Matches)(/^[a-z0-9A-Z`~!#%^&*=+\\|{};:'\\",<>/?]+$/),
    __metadata("design:type", String)
], UpdatePasswordDto.prototype, "newPassword", void 0);
exports.UpdatePasswordDto = UpdatePasswordDto;
class CreateUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '所属部门编号',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '用户姓名',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '登录账号',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[a-z0-9A-Z]+$/),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '归属角色',
        type: [Number],
    }),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ArrayMaxSize)(3),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "roles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '呢称',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "nickName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '邮箱',
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.ValidateIf)((o) => !(0, lodash_1.isEmpty)(o.email)),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '手机号',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '备注',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "remark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '状态',
    }),
    (0, class_validator_1.IsIn)([0, 1]),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "status", void 0);
exports.CreateUserDto = CreateUserDto;
class UpdateUserDto extends CreateUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '用户ID',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "id", void 0);
exports.UpdateUserDto = UpdateUserDto;
class InfoUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '用户ID',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], InfoUserDto.prototype, "userId", void 0);
exports.InfoUserDto = InfoUserDto;
class DeleteUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '需要删除的用户ID列表',
        type: [Number],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    __metadata("design:type", Array)
], DeleteUserDto.prototype, "userIds", void 0);
exports.DeleteUserDto = DeleteUserDto;
class PageSearchUserDto extends page_dto_1.PageOptionsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '部门列表',
        type: [Number],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], PageSearchUserDto.prototype, "departmentIds", void 0);
exports.PageSearchUserDto = PageSearchUserDto;
class PasswordUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '管理员ID',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PasswordUserDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '更改后的密码',
    }),
    (0, class_validator_1.Matches)(/^[a-z0-9A-Z`~!#%^&*=+\\|{};:'\\",<>/?]+$/),
    __metadata("design:type", String)
], PasswordUserDto.prototype, "password", void 0);
exports.PasswordUserDto = PasswordUserDto;
//# sourceMappingURL=user.dto.js.map