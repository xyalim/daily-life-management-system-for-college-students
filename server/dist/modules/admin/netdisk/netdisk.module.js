"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetdiskModule = void 0;
const common_1 = require("@nestjs/common");
const qiniu_provider_1 = require("../core/provider/qiniu.provider");
const system_module_1 = require("../system/system.module");
const manage_controller_1 = require("./manager/manage.controller");
const manage_service_1 = require("./manager/manage.service");
const overview_controller_1 = require("./overview/overview.controller");
const overview_service_1 = require("./overview/overview.service");
let NetdiskModule = class NetdiskModule {
};
NetdiskModule = __decorate([
    (0, common_1.Module)({
        imports: [system_module_1.SystemModule],
        controllers: [manage_controller_1.NetDiskManageController, overview_controller_1.NetDiskOverviewController],
        providers: [manage_service_1.NetDiskManageService, overview_service_1.NetDiskOverviewService, (0, qiniu_provider_1.qiniuProvider)()],
    })
], NetdiskModule);
exports.NetdiskModule = NetdiskModule;
//# sourceMappingURL=netdisk.module.js.map