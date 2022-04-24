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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchMajorController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const major_service_1 = require("./major.service");
const major_dto_1 = require("./major.dto");
const major_class_1 = require("./major.class");
let SchMajorController = class SchMajorController {
    constructor(majorService) {
        this.majorService = majorService;
    }
    async info(dto) {
        return await this.majorService.info(dto.majorId);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '获取角色信息' }),
    (0, swagger_1.ApiOkResponse)({ type: major_class_1.MajorInfo }),
    (0, common_1.Get)('info'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [major_dto_1.InfoMajorDto]),
    __metadata("design:returntype", Promise)
], SchMajorController.prototype, "info", null);
SchMajorController = __decorate([
    (0, swagger_1.ApiTags)('角色模块'),
    (0, common_1.Controller)('major'),
    __metadata("design:paramtypes", [major_service_1.MajorService])
], SchMajorController);
exports.SchMajorController = SchMajorController;
//# sourceMappingURL=major.controller.js.map