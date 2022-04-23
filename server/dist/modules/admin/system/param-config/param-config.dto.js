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
exports.InfoParamConfigDto = exports.DeleteParamConfigDto = exports.UpdateParamConfigDto = exports.CreateParamConfigDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateParamConfigDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '参数名称' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateParamConfigDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '参数键名' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], CreateParamConfigDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '参数值' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateParamConfigDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '备注' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateParamConfigDto.prototype, "remark", void 0);
exports.CreateParamConfigDto = CreateParamConfigDto;
class UpdateParamConfigDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '配置编号' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdateParamConfigDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '参数名称' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateParamConfigDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '参数值' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateParamConfigDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '备注' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateParamConfigDto.prototype, "remark", void 0);
exports.UpdateParamConfigDto = UpdateParamConfigDto;
class DeleteParamConfigDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '需要删除的配置id列表', type: [Number] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    __metadata("design:type", Array)
], DeleteParamConfigDto.prototype, "ids", void 0);
exports.DeleteParamConfigDto = DeleteParamConfigDto;
class InfoParamConfigDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '需要查询的配置编号' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], InfoParamConfigDto.prototype, "id", void 0);
exports.InfoParamConfigDto = InfoParamConfigDto;
//# sourceMappingURL=param-config.dto.js.map