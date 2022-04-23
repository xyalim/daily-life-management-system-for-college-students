"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionOptional = void 0;
const common_1 = require("@nestjs/common");
const admin_constants_1 = require("../../admin.constants");
const PermissionOptional = () => (0, common_1.SetMetadata)(admin_constants_1.PERMISSION_OPTIONAL_KEY_METADATA, true);
exports.PermissionOptional = PermissionOptional;
//# sourceMappingURL=permission-optional.decorator.js.map