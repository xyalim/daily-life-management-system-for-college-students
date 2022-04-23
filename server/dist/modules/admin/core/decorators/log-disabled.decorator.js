"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogDisabled = void 0;
const common_1 = require("@nestjs/common");
const admin_constants_1 = require("../../admin.constants");
const LogDisabled = () => (0, common_1.SetMetadata)(admin_constants_1.LOG_DISABLED_KEY_METADATA, true);
exports.LogDisabled = LogDisabled;
//# sourceMappingURL=log-disabled.decorator.js.map