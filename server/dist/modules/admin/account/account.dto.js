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
exports.UpdatePersonInfoDto = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdatePersonInfoDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '管理员昵称', required: false }),
    (0, class_validator_1.IsString)(),
    (0, common_1.Optional)(),
    __metadata("design:type", String)
], UpdatePersonInfoDto.prototype, "nickName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '邮箱', required: false }),
    (0, class_validator_1.IsString)(),
    (0, common_1.Optional)(),
    __metadata("design:type", String)
], UpdatePersonInfoDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '手机', required: false }),
    (0, class_validator_1.IsString)(),
    (0, common_1.Optional)(),
    __metadata("design:type", String)
], UpdatePersonInfoDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '备注', required: false }),
    (0, class_validator_1.IsString)(),
    (0, common_1.Optional)(),
    __metadata("design:type", String)
], UpdatePersonInfoDto.prototype, "remark", void 0);
exports.UpdatePersonInfoDto = UpdatePersonInfoDto;
//# sourceMappingURL=account.dto.js.map