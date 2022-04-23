"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Keep = void 0;
const common_1 = require("@nestjs/common");
const decorator_contants_1 = require("../contants/decorator.contants");
const Keep = () => (0, common_1.SetMetadata)(decorator_contants_1.TRANSFORM_KEEP_KEY_METADATA, true);
exports.Keep = Keep;
//# sourceMappingURL=keep.decorator.js.map