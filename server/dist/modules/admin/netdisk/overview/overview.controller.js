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
exports.NetDiskOverviewController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_constants_1 = require("../../admin.constants");
const permission_optional_decorator_1 = require("../../core/decorators/permission-optional.decorator");
const overview_class_1 = require("./overview.class");
const overview_service_1 = require("./overview.service");
let NetDiskOverviewController = class NetDiskOverviewController {
    constructor(overviewService) {
        this.overviewService = overviewService;
    }
    async space() {
        const date = this.overviewService.getZeroHourAnd1Day(new Date());
        const hit = await this.overviewService.getHit(date);
        const flow = await this.overviewService.getFlow(date);
        const space = await this.overviewService.getSpace(date);
        const count = await this.overviewService.getCount(date);
        return {
            fileSize: count.datas[count.datas.length - 1],
            flowSize: flow.datas[flow.datas.length - 1],
            hitSize: hit.datas[hit.datas.length - 1],
            spaceSize: space.datas[space.datas.length - 1],
            flowTrend: flow,
            sizeTrend: space,
        };
    }
};
__decorate([
    (0, common_1.CacheKey)('netdisk_overview_desc'),
    (0, common_1.CacheTTL)(3600),
    (0, common_1.UseInterceptors)(common_1.CacheInterceptor),
    (0, swagger_1.ApiOperation)({ summary: '获取网盘空间数据统计' }),
    (0, swagger_1.ApiOkResponse)({ type: overview_class_1.OverviewSpaceInfo }),
    (0, permission_optional_decorator_1.PermissionOptional)(),
    (0, common_1.Get)('desc'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NetDiskOverviewController.prototype, "space", null);
NetDiskOverviewController = __decorate([
    (0, swagger_1.ApiSecurity)(admin_constants_1.ADMIN_PREFIX),
    (0, swagger_1.ApiTags)('网盘概览模块'),
    (0, common_1.Controller)('overview'),
    __metadata("design:paramtypes", [overview_service_1.NetDiskOverviewService])
], NetDiskOverviewController);
exports.NetDiskOverviewController = NetDiskOverviewController;
//# sourceMappingURL=overview.controller.js.map