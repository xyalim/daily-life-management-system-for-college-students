"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRoleIdProvider = void 0;
const config_1 = require("@nestjs/config");
const admin_constants_1 = require("../../admin.constants");
function rootRoleIdProvider() {
    return {
        provide: admin_constants_1.ROOT_ROLE_ID,
        useFactory: (configService) => {
            return configService.get('rootRoleId', 1);
        },
        inject: [config_1.ConfigService],
    };
}
exports.rootRoleIdProvider = rootRoleIdProvider;
//# sourceMappingURL=root-role-id.provider.js.map