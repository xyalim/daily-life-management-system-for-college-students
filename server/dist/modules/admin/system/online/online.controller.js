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
exports.SysOnlineController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_exception_1 = require("../../../../common/exceptions/api.exception");
const admin_constants_1 = require("../../admin.constants");
const admin_user_decorator_1 = require("../../core/decorators/admin-user.decorator");
const log_disabled_decorator_1 = require("../../core/decorators/log-disabled.decorator");
const online_class_1 = require("./online.class");
const online_dto_1 = require("./online.dto");
const online_service_1 = require("./online.service");
let SysOnlineController = class SysOnlineController {
    constructor(onlineService) {
        this.onlineService = onlineService;
    }
    async list(user) {
        return await this.onlineService.listOnlineUser(user.uid);
    }
    async kick(dto, user) {
        if (dto.id === user.uid) {
            throw new api_exception_1.ApiException(10012);
        }
        await this.onlineService.kickUser(dto.id, user.uid);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '查询当前在线用户' }),
    (0, swagger_1.ApiOkResponse)({ type: [online_class_1.OnlineUserInfo] }),
    (0, log_disabled_decorator_1.LogDisabled)(),
    (0, common_1.Get)('list'),
    __param(0, (0, admin_user_decorator_1.AdminUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SysOnlineController.prototype, "list", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '下线指定在线用户' }),
    (0, common_1.Post)('kick'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, admin_user_decorator_1.AdminUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [online_dto_1.KickDto, Object]),
    __metadata("design:returntype", Promise)
], SysOnlineController.prototype, "kick", null);
SysOnlineController = __decorate([
    (0, swagger_1.ApiSecurity)(admin_constants_1.ADMIN_PREFIX),
    (0, swagger_1.ApiTags)('在线用户模块'),
    (0, common_1.Controller)('online'),
    __metadata("design:paramtypes", [online_service_1.SysOnlineService])
], SysOnlineController);
exports.SysOnlineController = SysOnlineController;
//# sourceMappingURL=online.controller.js.map