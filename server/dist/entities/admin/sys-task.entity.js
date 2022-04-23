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
let SysTask = class SysTask extends base_entity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SysTask.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SysTask.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SysTask.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', default: 0 }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SysTask.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', default: 1 }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SysTask.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_time', type: 'datetime', nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], SysTask.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_time', type: 'datetime', nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], SysTask.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, default: 0 }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SysTask.prototype, "limit", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SysTask.prototype, "cron", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SysTask.prototype, "every", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SysTask.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'job_opts', type: 'text', nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SysTask.prototype, "jobOpts", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SysTask.prototype, "remark", void 0);
SysTask = __decorate([
    (0, typeorm_1.Entity)({ name: 'sys_task' })
], SysTask);
exports.default = SysTask;
//# sourceMappingURL=sys-task.entity.js.map