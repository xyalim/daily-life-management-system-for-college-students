"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorize = void 0;
const common_1 = require("@nestjs/common");
const admin_constants_1 = require("../../admin.constants");
const Authorize = () => (0, common_1.SetMetadata)(admin_constants_1.AUTHORIZE_KEY_METADATA, true);
exports.Authorize = Authorize;
//# sourceMappingURL=authorize.decorator.js.map