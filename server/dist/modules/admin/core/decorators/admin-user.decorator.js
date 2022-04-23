"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUser = void 0;
const common_1 = require("@nestjs/common");
const admin_constants_1 = require("../../admin.constants");
exports.AdminUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request[admin_constants_1.ADMIN_USER];
    return data ? user === null || user === void 0 ? void 0 : user[data] : user;
});
//# sourceMappingURL=admin-user.decorator.js.map