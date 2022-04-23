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
exports.OverviewSpaceInfo = exports.HitInfo = exports.FlowInfo = exports.CountInfo = exports.SpaceInfo = void 0;
const swagger_1 = require("@nestjs/swagger");
class SpaceInfo {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '当月的X号', type: [Number] }),
    __metadata("design:type", Array)
], SpaceInfo.prototype, "times", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '对应天数的容量, byte单位', type: [Number] }),
    __metadata("design:type", Array)
], SpaceInfo.prototype, "datas", void 0);
exports.SpaceInfo = SpaceInfo;
class CountInfo {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '当月的X号', type: [Number] }),
    __metadata("design:type", Array)
], CountInfo.prototype, "times", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '对应天数的文件数量', type: [Number] }),
    __metadata("design:type", Array)
], CountInfo.prototype, "datas", void 0);
exports.CountInfo = CountInfo;
class FlowInfo {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '当月的X号', type: [Number] }),
    __metadata("design:type", Array)
], FlowInfo.prototype, "times", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '对应天数的耗费流量', type: [Number] }),
    __metadata("design:type", Array)
], FlowInfo.prototype, "datas", void 0);
exports.FlowInfo = FlowInfo;
class HitInfo {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '当月的X号', type: [Number] }),
    __metadata("design:type", Array)
], HitInfo.prototype, "times", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '对应天数的Get请求次数', type: [Number] }),
    __metadata("design:type", Array)
], HitInfo.prototype, "datas", void 0);
exports.HitInfo = HitInfo;
class OverviewSpaceInfo {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '当前使用容量' }),
    __metadata("design:type", Number)
], OverviewSpaceInfo.prototype, "spaceSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '当前文件数量' }),
    __metadata("design:type", Number)
], OverviewSpaceInfo.prototype, "fileSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '当天使用流量' }),
    __metadata("design:type", Number)
], OverviewSpaceInfo.prototype, "flowSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '当天请求次数' }),
    __metadata("design:type", Number)
], OverviewSpaceInfo.prototype, "hitSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '流量趋势，从当月1号开始计算', type: FlowInfo }),
    __metadata("design:type", FlowInfo)
], OverviewSpaceInfo.prototype, "flowTrend", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '容量趋势，从当月1号开始计算', type: SpaceInfo }),
    __metadata("design:type", SpaceInfo)
], OverviewSpaceInfo.prototype, "sizeTrend", void 0);
exports.OverviewSpaceInfo = OverviewSpaceInfo;
//# sourceMappingURL=overview.class.js.map