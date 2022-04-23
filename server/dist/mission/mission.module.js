"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MissionModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionModule = void 0;
const common_1 = require("@nestjs/common");
const admin_module_1 = require("../modules/admin/admin.module");
const log_service_1 = require("../modules/admin/system/log/log.service");
const http_request_job_1 = require("./jobs/http-request.job");
const sys_log_clear_job_1 = require("./jobs/sys-log-clear.job");
const providers = [sys_log_clear_job_1.SysLogClearJob, http_request_job_1.HttpRequestJob];
function createAliasProviders() {
    const aliasProviders = [];
    for (const p of providers) {
        aliasProviders.push({
            provide: p.name,
            useExisting: p,
        });
    }
    return aliasProviders;
}
let MissionModule = MissionModule_1 = class MissionModule {
    static forRoot() {
        const aliasProviders = createAliasProviders();
        return {
            global: true,
            module: MissionModule_1,
            imports: [admin_module_1.AdminModule],
            providers: [...providers, ...aliasProviders, log_service_1.SysLogService],
            exports: aliasProviders,
        };
    }
};
MissionModule = MissionModule_1 = __decorate([
    (0, common_1.Module)({})
], MissionModule);
exports.MissionModule = MissionModule;
//# sourceMappingURL=mission.module.js.map