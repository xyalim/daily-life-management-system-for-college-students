"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mission = void 0;
const common_1 = require("@nestjs/common");
const decorator_contants_1 = require("../common/contants/decorator.contants");
const Mission = () => (0, common_1.SetMetadata)(decorator_contants_1.MISSION_KEY_METADATA, true);
exports.Mission = Mission;
//# sourceMappingURL=mission.decorator.js.map