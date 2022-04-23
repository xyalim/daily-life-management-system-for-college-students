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
exports.TaskLogInfo = exports.LoginLogInfo = void 0;
const swagger_1 = require("@nestjs/swagger");
class LoginLogInfo {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '日志编号' }),
    __metadata("design:type", Number)
], LoginLogInfo.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '登录ip' }),
    __metadata("design:type", String)
], LoginLogInfo.prototype, "ip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '系统' }),
    __metadata("design:type", String)
], LoginLogInfo.prototype, "os", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '浏览器' }),
    __metadata("design:type", String)
], LoginLogInfo.prototype, "browser", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '时间' }),
    __metadata("design:type", String)
], LoginLogInfo.prototype, "time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '登录用户名' }),
    __metadata("design:type", String)
], LoginLogInfo.prototype, "username", void 0);
exports.LoginLogInfo = LoginLogInfo;
class TaskLogInfo {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '日志编号' }),
    __metadata("design:type", Number)
], TaskLogInfo.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '任务编号' }),
    __metadata("design:type", Number)
], TaskLogInfo.prototype, "taskId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '任务名称' }),
    __metadata("design:type", String)
], TaskLogInfo.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '创建时间' }),
    __metadata("design:type", String)
], TaskLogInfo.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '耗时' }),
    __metadata("design:type", Number)
], TaskLogInfo.prototype, "consumeTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '执行信息' }),
    __metadata("design:type", String)
], TaskLogInfo.prototype, "detail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '任务执行状态' }),
    __metadata("design:type", Number)
], TaskLogInfo.prototype, "status", void 0);
exports.TaskLogInfo = TaskLogInfo;
//# sourceMappingURL=log.class.js.map