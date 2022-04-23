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
exports.SysServeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_constants_1 = require("../../admin.constants");
const permission_optional_decorator_1 = require("../../core/decorators/permission-optional.decorator");
const serve_class_1 = require("./serve.class");
const serve_service_1 = require("./serve.service");
let SysServeController = class SysServeController {
    constructor(serveService) {
        this.serveService = serveService;
    }
    async stat() {
        return await this.serveService.getServeStat();
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '获取服务器运行信息' }),
    (0, swagger_1.ApiOkResponse)({ type: serve_class_1.ServeStatInfo }),
    (0, permission_optional_decorator_1.PermissionOptional)(),
    (0, common_1.Get)('stat'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SysServeController.prototype, "stat", null);
SysServeController = __decorate([
    (0, swagger_1.ApiSecurity)(admin_constants_1.ADMIN_PREFIX),
    (0, swagger_1.ApiTags)('服务监控'),
    (0, common_1.Controller)('serve'),
    __metadata("design:paramtypes", [serve_service_1.SysServeService])
], SysServeController);
exports.SysServeController = SysServeController;
//# sourceMappingURL=serve.controller.js.map