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
exports.CheckIdTaskDto = exports.UpdateTaskDto = exports.CreateTaskDto = exports.IsCronExpression = void 0;
const parser = require("cron-parser");
const lodash_1 = require("lodash");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
let IsCronExpression = class IsCronExpression {
    validate(value, args) {
        try {
            if ((0, lodash_1.isEmpty)(value)) {
                throw new Error('cron expression is empty');
            }
            parser.parseExpression(value);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    defaultMessage(_args) {
        return 'this cron expression ($value) invalid';
    }
};
IsCronExpression = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isCronExpression', async: false })
], IsCronExpression);
exports.IsCronExpression = IsCronExpression;
class CreateTaskDto {
    constructor() {
        this.limit = -1;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '任务名称' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '调用的服务' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "service", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '任务类别：cron | interval' }),
    (0, class_validator_1.IsIn)([0, 1]),
    __metadata("design:type", Number)
], CreateTaskDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '任务状态' }),
    (0, class_validator_1.IsIn)([0, 1]),
    __metadata("design:type", Number)
], CreateTaskDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '开始时间', type: Date }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.ValidateIf)((o) => !(0, lodash_1.isEmpty)(o.startTime)),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '结束时间', type: Date }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.ValidateIf)((o) => !(0, lodash_1.isEmpty)(o.endTime)),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '限制执行次数，负数则无限制' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateTaskDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'cron表达式' }),
    (0, class_validator_1.Validate)(IsCronExpression),
    (0, class_validator_1.ValidateIf)((o) => o.type === 0),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "cron", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '执行间隔，毫秒单位' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(100),
    (0, class_validator_1.ValidateIf)((o) => o.type === 1),
    __metadata("design:type", Number)
], CreateTaskDto.prototype, "every", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '执行参数' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '任务备注' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "remark", void 0);
exports.CreateTaskDto = CreateTaskDto;
class UpdateTaskDto extends CreateTaskDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '需要更新的任务ID' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateTaskDto.prototype, "id", void 0);
exports.UpdateTaskDto = UpdateTaskDto;
class CheckIdTaskDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '任务ID' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CheckIdTaskDto.prototype, "id", void 0);
exports.CheckIdTaskDto = CheckIdTaskDto;
//# sourceMappingURL=task.dto.js.map