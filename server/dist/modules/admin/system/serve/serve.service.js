"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SysServeService = void 0;
const common_1 = require("@nestjs/common");
const si = require("systeminformation");
const serve_class_1 = require("./serve.class");
let SysServeService = class SysServeService {
    async getServeStat() {
        const versions = await si.versions('node, npm');
        const osinfo = await si.osInfo();
        const cpuinfo = await si.cpu();
        const currentLoadinfo = await si.currentLoad();
        const diskListInfo = await si.fsSize();
        const diskinfo = new serve_class_1.Disk();
        diskinfo.size = diskListInfo[0].size;
        diskinfo.available = diskListInfo[0].available;
        diskinfo.used = 0;
        diskListInfo.forEach((d) => {
            diskinfo.used += d.used;
        });
        const meminfo = await si.mem();
        return {
            runtime: {
                npmVersion: versions.npm,
                nodeVersion: versions.node,
                os: osinfo.platform,
                arch: osinfo.arch,
            },
            cpu: {
                manufacturer: cpuinfo.manufacturer,
                brand: cpuinfo.brand,
                physicalCores: cpuinfo.physicalCores,
                model: cpuinfo.model,
                speed: cpuinfo.speed,
                rawCurrentLoad: currentLoadinfo.rawCurrentLoad,
                rawCurrentLoadIdle: currentLoadinfo.rawCurrentLoadIdle,
                coresLoad: currentLoadinfo.cpus.map((e) => {
                    return {
                        rawLoad: e.rawLoad,
                        rawLoadIdle: e.rawLoadIdle,
                    };
                }),
            },
            disk: diskinfo,
            memory: {
                total: meminfo.total,
                available: meminfo.available,
            },
        };
    }
};
SysServeService = __decorate([
    (0, common_1.Injectable)()
], SysServeService);
exports.SysServeService = SysServeService;
//# sourceMappingURL=serve.service.js.map