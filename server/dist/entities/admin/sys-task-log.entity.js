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
let SysTaskLog = class SysTaskLog extends base_entity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SysTaskLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'task_id' }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SysTaskLog.prototype, "taskId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', default: 0 }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SysTaskLog.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SysTaskLog.prototype, "detail", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, name: 'consume_time', default: 0 }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SysTaskLog.prototype, "consumeTime", void 0);
SysTaskLog = __decorate([
    (0, typeorm_1.Entity)({ name: 'sys_task_log' })
], SysTaskLog);
exports.default = SysTaskLog;
//# sourceMappingURL=sys-task-log.entity.js.map