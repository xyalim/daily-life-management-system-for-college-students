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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SysTaskController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const lodash_1 = require("lodash");
const page_dto_1 = require("../../../../common/dto/page.dto");
const api_exception_1 = require("../../../../common/exceptions/api.exception");
const sys_task_entity_1 = require("../../../../entities/admin/sys-task.entity");
const admin_constants_1 = require("../../admin.constants");
const task_dto_1 = require("./task.dto");
const task_service_1 = require("./task.service");
let SysTaskController = class SysTaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    async page(dto) {
        const list = await this.taskService.page(dto.page - 1, dto.limit);
        const count = await this.taskService.count();
        return {
            list,
            pagination: {
                total: count,
                size: dto.limit,
                page: dto.page,
            },
        };
    }
    async add(dto) {
        const serviceCall = dto.service.split('.');
        await this.taskService.checkHasMissionMeta(serviceCall[0], serviceCall[1]);
        await this.taskService.addOrUpdate(dto);
    }
    async update(dto) {
        const serviceCall = dto.service.split('.');
        await this.taskService.checkHasMissionMeta(serviceCall[0], serviceCall[1]);
        await this.taskService.addOrUpdate(dto);
    }
    async info(dto) {
        return await this.taskService.info(dto.id);
    }
    async once(dto) {
        const task = await this.taskService.info(dto.id);
        if (!(0, lodash_1.isEmpty)(task)) {
            await this.taskService.once(task);
        }
        else {
            throw new api_exception_1.ApiException(10020);
        }
    }
    async stop(dto) {
        const task = await this.taskService.info(dto.id);
        if (!(0, lodash_1.isEmpty)(task)) {
            await this.taskService.stop(task);
        }
        else {
            throw new api_exception_1.ApiException(10020);
        }
    }
    async start(dto) {
        const task = await this.taskService.info(dto.id);
        if (!(0, lodash_1.isEmpty)(task)) {
            await this.taskService.start(task);
        }
        else {
            throw new api_exception_1.ApiException(10020);
        }
    }
    async delete(dto) {
        const task = await this.taskService.info(dto.id);
        if (!(0, lodash_1.isEmpty)(task)) {
            await this.taskService.delete(task);
        }
        else {
            throw new api_exception_1.ApiException(10020);
        }
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '获取任务列表' }),
    (0, swagger_1.ApiOkResponse)({ type: [sys_task_entity_1.default] }),
    (0, common_1.Get)('page'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_dto_1.PageOptionsDto]),
    __metadata("design:returntype", Promise)
], SysTaskController.prototype, "page", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '添加任务' }),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", Promise)
], SysTaskController.prototype, "add", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '更新任务' }),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.UpdateTaskDto]),
    __metadata("design:returntype", Promise)
], SysTaskController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '查询任务详细信息' }),
    (0, swagger_1.ApiOkResponse)({ type: sys_task_entity_1.default }),
    (0, common_1.Get)('info'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.CheckIdTaskDto]),
    __metadata("design:returntype", Promise)
], SysTaskController.prototype, "info", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '手动执行一次任务' }),
    (0, common_1.Post)('once'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.CheckIdTaskDto]),
    __metadata("design:returntype", Promise)
], SysTaskController.prototype, "once", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '停止任务' }),
    (0, common_1.Post)('stop'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.CheckIdTaskDto]),
    __metadata("design:returntype", Promise)
], SysTaskController.prototype, "stop", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '启动任务' }),
    (0, common_1.Post)('start'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.CheckIdTaskDto]),
    __metadata("design:returntype", Promise)
], SysTaskController.prototype, "start", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '删除任务' }),
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.CheckIdTaskDto]),
    __metadata("design:returntype", Promise)
], SysTaskController.prototype, "delete", null);
SysTaskController = __decorate([
    (0, swagger_1.ApiSecurity)(admin_constants_1.ADMIN_PREFIX),
    (0, swagger_1.ApiTags)('任务调度模块'),
    (0, common_1.Controller)('task'),
    __metadata("design:paramtypes", [task_service_1.SysTaskService])
], SysTaskController);
exports.SysTaskController = SysTaskController;
//# sourceMappingURL=task.controller.js.map