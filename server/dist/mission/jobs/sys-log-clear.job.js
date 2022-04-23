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
exports.SysLogClearJob = void 0;
const common_1 = require("@nestjs/common");
const log_service_1 = require("../../modules/admin/system/log/log.service");
const mission_decorator_1 = require("../mission.decorator");
let SysLogClearJob = class SysLogClearJob {
    constructor(sysLogService) {
        this.sysLogService = sysLogService;
    }
    async clearLoginLog() {
        await this.sysLogService.clearLoginLog();
    }
    async clearTaskLog() {
        await this.sysLogService.clearTaskLog();
    }
};
SysLogClearJob = __decorate([
    (0, common_1.Injectable)(),
    (0, mission_decorator_1.Mission)(),
    __metadata("design:paramtypes", [log_service_1.SysLogService])
], SysLogClearJob);
exports.SysLogClearJob = SysLogClearJob;
//# sourceMappingURL=sys-log-clear.job.js.map