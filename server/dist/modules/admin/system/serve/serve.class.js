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
exports.ServeStatInfo = exports.Memory = exports.Disk = exports.Cpu = exports.CoreLoad = exports.Runtime = void 0;
const swagger_1 = require("@nestjs/swagger");
class Runtime {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '系统' }),
    __metadata("design:type", String)
], Runtime.prototype, "os", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '服务器架构' }),
    __metadata("design:type", String)
], Runtime.prototype, "arch", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Node版本' }),
    __metadata("design:type", String)
], Runtime.prototype, "nodeVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Npm版本' }),
    __metadata("design:type", String)
], Runtime.prototype, "npmVersion", void 0);
exports.Runtime = Runtime;
class CoreLoad {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '当前CPU资源消耗' }),
    __metadata("design:type", Number)
], CoreLoad.prototype, "rawLoad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '当前空闲CPU资源' }),
    __metadata("design:type", Number)
], CoreLoad.prototype, "rawLoadIdle", void 0);
exports.CoreLoad = CoreLoad;
class Cpu {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '制造商 e.g. Intel(R)' }),
    __metadata("design:type", String)
], Cpu.prototype, "manufacturer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '品牌	e.g. Core(TM)2 Duo' }),
    __metadata("design:type", String)
], Cpu.prototype, "brand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '物理核心数' }),
    __metadata("design:type", Number)
], Cpu.prototype, "physicalCores", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '型号' }),
    __metadata("design:type", String)
], Cpu.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '速度 in GHz e.g. 3.4' }),
    __metadata("design:type", Number)
], Cpu.prototype, "speed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'CPU资源消耗 原始滴答' }),
    __metadata("design:type", Number)
], Cpu.prototype, "rawCurrentLoad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '空闲CPU资源 原始滴答' }),
    __metadata("design:type", Number)
], Cpu.prototype, "rawCurrentLoadIdle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'cpu资源消耗', type: [CoreLoad] }),
    __metadata("design:type", Array)
], Cpu.prototype, "coresLoad", void 0);
exports.Cpu = Cpu;
class Disk {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '磁盘空间大小 (bytes)' }),
    __metadata("design:type", Number)
], Disk.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '已使用磁盘空间 (bytes)' }),
    __metadata("design:type", Number)
], Disk.prototype, "used", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '可用磁盘空间 (bytes)' }),
    __metadata("design:type", Number)
], Disk.prototype, "available", void 0);
exports.Disk = Disk;
class Memory {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'total memory in bytes' }),
    __metadata("design:type", Number)
], Memory.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '可用内存' }),
    __metadata("design:type", Number)
], Memory.prototype, "available", void 0);
exports.Memory = Memory;
class ServeStatInfo {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '运行环境', type: Runtime }),
    __metadata("design:type", Runtime)
], ServeStatInfo.prototype, "runtime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'CPU信息', type: Cpu }),
    __metadata("design:type", Cpu)
], ServeStatInfo.prototype, "cpu", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '磁盘信息', type: Disk }),
    __metadata("design:type", Disk)
], ServeStatInfo.prototype, "disk", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '内存信息', type: Memory }),
    __metadata("design:type", Memory)
], ServeStatInfo.prototype, "memory", void 0);
exports.ServeStatInfo = ServeStatInfo;
//# sourceMappingURL=serve.class.js.map