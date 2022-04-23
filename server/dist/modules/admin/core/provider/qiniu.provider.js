"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.qiniuProvider = void 0;
const config_1 = require("@nestjs/config");
const admin_constants_1 = require("../../admin.constants");
function qiniuProvider() {
    return {
        provide: admin_constants_1.QINIU_CONFIG,
        useFactory: (configService) => ({
            accessKey: configService.get('qiniu.accessKey'),
            secretKey: configService.get('qiniu.secretKey'),
            domain: configService.get('qiniu.domain'),
            bucket: configService.get('qiniu.bucket'),
            zone: configService.get('qiniu.zone'),
            access: configService.get('qiniu.access'),
        }),
        inject: [config_1.ConfigService],
    };
}
exports.qiniuProvider = qiniuProvider;
//# sourceMappingURL=qiniu.provider.js.map