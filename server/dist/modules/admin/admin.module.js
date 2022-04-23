"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const account_module_1 = require("./account/account.module");
const admin_constants_1 = require("./admin.constants");
const auth_guard_1 = require("./core/guards/auth.guard");
const login_module_1 = require("./login/login.module");
const netdisk_module_1 = require("./netdisk/netdisk.module");
const system_module_1 = require("./system/system.module");
let AdminModule = class AdminModule {
};
AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: admin_constants_1.ADMIN_PREFIX,
                    children: [
                        { path: 'netdisk', module: netdisk_module_1.NetdiskModule },
                        { path: 'account', module: account_module_1.AccountModule },
                        { path: 'sys', module: system_module_1.SystemModule },
                    ],
                },
                {
                    path: admin_constants_1.ADMIN_PREFIX,
                    module: login_module_1.LoginModule,
                },
            ]),
            login_module_1.LoginModule,
            system_module_1.SystemModule,
            account_module_1.AccountModule,
            netdisk_module_1.NetdiskModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
        ],
        exports: [system_module_1.SystemModule],
    })
], AdminModule);
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map