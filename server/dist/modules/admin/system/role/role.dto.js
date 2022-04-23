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
exports.InfoRoleDto = exports.UpdateRoleDto = exports.CreateRoleDto = exports.DeleteRoleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class DeleteRoleDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '需要删除的角色ID列表',
        type: [Number],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    __metadata("design:type", Array)
], DeleteRoleDto.prototype, "roleIds", void 0);
exports.DeleteRoleDto = DeleteRoleDto;
class CreateRoleDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '角色名称',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], CreateRoleDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '角色唯一标识',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[a-z0-9A-Z]+$/),
    __metadata("design:type", String)
], CreateRoleDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '角色备注',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateRoleDto.prototype, "remark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '关联菜单、权限编号',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateRoleDto.prototype, "menus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '关联部门编号',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateRoleDto.prototype, "depts", void 0);
exports.CreateRoleDto = CreateRoleDto;
class UpdateRoleDto extends CreateRoleDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '关联部门编号',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateRoleDto.prototype, "roleId", void 0);
exports.UpdateRoleDto = UpdateRoleDto;
class InfoRoleDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '需要查找的角色ID',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], InfoRoleDto.prototype, "roleId", void 0);
exports.InfoRoleDto = InfoRoleDto;
//# sourceMappingURL=role.dto.js.map