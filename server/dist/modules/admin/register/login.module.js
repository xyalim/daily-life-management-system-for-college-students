"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterModule = void 0;
const common_1 = require("@nestjs/common");
const system_module_1 = require("../system/system.module");
const register_controller_1 = require("./register.controller");
const register_service_1 = require("./register.service");
let RegisterModule = class RegisterModule {
};
RegisterModule = __decorate([
    (0, common_1.Module)({
        imports: [system_module_1.SystemModule],
        controllers: [register_controller_1.RegisterController],
        providers: [register_service_1.RegisterService],
        exports: [register_service_1.RegisterService],
    })
], RegisterModule);
exports.RegisterModule = RegisterModule;
//# sourceMappingURL=login.module.js.map