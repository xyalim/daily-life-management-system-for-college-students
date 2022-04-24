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
exports.CreatedMajor = exports.MajorInfo = void 0;
const swagger_1 = require("@nestjs/swagger");
const sch_major_entity_1 = require("../../../../entities/sch/sch-major.entity");
class MajorInfo {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: sch_major_entity_1.default,
    }),
    __metadata("design:type", sch_major_entity_1.default)
], MajorInfo.prototype, "majorInfo", void 0);
exports.MajorInfo = MajorInfo;
class CreatedMajor {
}
exports.CreatedMajor = CreatedMajor;
//# sourceMappingURL=major.class.js.map