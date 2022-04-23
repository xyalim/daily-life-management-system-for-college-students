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
exports.RegisterInfoDto = exports.ImageCaptchaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class ImageCaptchaDto {
    constructor() {
        this.width = 100;
        this.height = 50;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        default: 100,
        description: '验证码宽度',
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ImageCaptchaDto.prototype, "width", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        default: 50,
        description: '验证码宽度',
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ImageCaptchaDto.prototype, "height", void 0);
exports.ImageCaptchaDto = ImageCaptchaDto;
class RegisterInfoDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '管理员用户名' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], RegisterInfoDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '管理员密码' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4),
    __metadata("design:type", String)
], RegisterInfoDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '验证码标识' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterInfoDto.prototype, "captchaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户输入的验证码' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(4),
    __metadata("design:type", String)
], RegisterInfoDto.prototype, "verifyCode", void 0);
exports.RegisterInfoDto = RegisterInfoDto;
//# sourceMappingURL=register.dto.js.map