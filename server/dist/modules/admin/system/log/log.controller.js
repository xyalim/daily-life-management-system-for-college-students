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
exports.SysLogController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const page_dto_1 = require("../../../../common/dto/page.dto");
const admin_constants_1 = require("../../admin.constants");
const log_disabled_decorator_1 = require("../../core/decorators/log-disabled.decorator");
const log_class_1 = require("./log.class");
const log_service_1 = require("./log.service");
let SysLogController = class SysLogController {
    constructor(logService) {
        this.logService = logService;
    }
    async loginLogPage(dto) {
        const list = await this.logService.pageGetLoginLog(dto.page - 1, dto.limit);
        const count = await this.logService.countLoginLog();
        return {
            list,
            pagination: {
                total: count,
                size: dto.limit,
                page: dto.page,
            },
        };
    }
    async taskPage(dto) {
        const list = await this.logService.page(dto.page - 1, dto.limit);
        const count = await this.logService.countTaskLog();
        return {
            list,
            pagination: {
                total: count,
                size: dto.limit,
                page: dto.page,
            },
        };
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '分页查询登录日志' }),
    (0, swagger_1.ApiOkResponse)({ type: [log_class_1.LoginLogInfo] }),
    (0, log_disabled_decorator_1.LogDisabled)(),
    (0, common_1.Get)('login/page'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_dto_1.PageOptionsDto]),
    __metadata("design:returntype", Promise)
], SysLogController.prototype, "loginLogPage", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '分页查询任务日志' }),
    (0, swagger_1.ApiOkResponse)({ type: [log_class_1.TaskLogInfo] }),
    (0, log_disabled_decorator_1.LogDisabled)(),
    (0, common_1.Get)('task/page'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_dto_1.PageOptionsDto]),
    __metadata("design:returntype", Promise)
], SysLogController.prototype, "taskPage", null);
SysLogController = __decorate([
    (0, swagger_1.ApiSecurity)(admin_constants_1.ADMIN_PREFIX),
    (0, swagger_1.ApiTags)('日志模块'),
    (0, common_1.Controller)('log'),
    __metadata("design:paramtypes", [log_service_1.SysLogService])
], SysLogController);
exports.SysLogController = SysLogController;
//# sourceMappingURL=log.controller.js.map