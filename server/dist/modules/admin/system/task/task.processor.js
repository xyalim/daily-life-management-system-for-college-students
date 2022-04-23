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
exports.SysTaskConsumer = void 0;
const bull_1 = require("@nestjs/bull");
const admin_constants_1 = require("../../admin.constants");
const log_service_1 = require("../log/log.service");
const task_service_1 = require("./task.service");
let SysTaskConsumer = class SysTaskConsumer {
    constructor(taskService, taskLogService) {
        this.taskService = taskService;
        this.taskLogService = taskLogService;
    }
    async handle(job) {
        const startTime = Date.now();
        const { data } = job;
        try {
            await this.taskService.callService(data.service, data.args);
            const timing = Date.now() - startTime;
            await this.taskLogService.recordTaskLog(data.id, 1, timing);
        }
        catch (e) {
            const timing = Date.now() - startTime;
            await this.taskLogService.recordTaskLog(data.id, 0, timing, `${e}`);
        }
    }
    onCompleted(job) {
        this.taskService.updateTaskCompleteStatus(job.data.id);
    }
};
__decorate([
    (0, bull_1.Process)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SysTaskConsumer.prototype, "handle", null);
__decorate([
    (0, bull_1.OnQueueCompleted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SysTaskConsumer.prototype, "onCompleted", null);
SysTaskConsumer = __decorate([
    (0, bull_1.Processor)(admin_constants_1.SYS_TASK_QUEUE_NAME),
    __metadata("design:paramtypes", [task_service_1.SysTaskService,
        log_service_1.SysLogService])
], SysTaskConsumer);
exports.SysTaskConsumer = SysTaskConsumer;
//# sourceMappingURL=task.processor.js.map