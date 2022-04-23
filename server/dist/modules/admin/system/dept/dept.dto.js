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
exports.MoveDeptDto = exports.MoveDept = exports.TransferDeptDto = exports.InfoDeptDto = exports.DeleteDeptDto = exports.UpdateDeptDto = exports.CreateDeptDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateDeptDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '部门名称' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], CreateDeptDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '父级部门id' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateDeptDto.prototype, "parentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '排序编号', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateDeptDto.prototype, "orderNum", void 0);
exports.CreateDeptDto = CreateDeptDto;
class UpdateDeptDto extends CreateDeptDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '需要更新的部门id' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateDeptDto.prototype, "id", void 0);
exports.UpdateDeptDto = UpdateDeptDto;
class DeleteDeptDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '删除的系统部门ID' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], DeleteDeptDto.prototype, "departmentId", void 0);
exports.DeleteDeptDto = DeleteDeptDto;
class InfoDeptDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '查询的系统部门ID' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], InfoDeptDto.prototype, "departmentId", void 0);
exports.InfoDeptDto = InfoDeptDto;
class TransferDeptDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '需要转移的管理员列表编号', type: [Number] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    __metadata("design:type", Array)
], TransferDeptDto.prototype, "userIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '需要转移过去的系统部门ID' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], TransferDeptDto.prototype, "departmentId", void 0);
exports.TransferDeptDto = TransferDeptDto;
class MoveDept {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '当前部门ID' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], MoveDept.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '移动到指定父级部门的ID' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], MoveDept.prototype, "parentId", void 0);
exports.MoveDept = MoveDept;
class MoveDeptDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '部门列表', type: [MoveDept] }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => MoveDept),
    __metadata("design:type", Array)
], MoveDeptDto.prototype, "depts", void 0);
exports.MoveDeptDto = MoveDeptDto;
//# sourceMappingURL=dept.dto.js.map