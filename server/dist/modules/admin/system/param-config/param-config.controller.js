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
exports.SysParamConfigController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const page_dto_1 = require("../../../../common/dto/page.dto");
const sys_config_entity_1 = require("../../../../entities/admin/sys-config.entity");
const admin_constants_1 = require("../../admin.constants");
const param_config_dto_1 = require("./param-config.dto");
const param_config_service_1 = require("./param-config.service");
let SysParamConfigController = class SysParamConfigController {
    constructor(paramConfigService) {
        this.paramConfigService = paramConfigService;
    }
    async page(dto) {
        const list = await this.paramConfigService.getConfigListByPage(dto.page - 1, dto.limit);
        const count = await this.paramConfigService.countConfigList();
        return {
            pagination: {
                total: count,
                size: dto.limit,
                page: dto.page,
            },
            list,
        };
    }
    async add(dto) {
        await this.paramConfigService.isExistKey(dto.key);
        await this.paramConfigService.add(dto);
    }
    async info(dto) {
        return this.paramConfigService.findOne(dto.id);
    }
    async update(dto) {
        await this.paramConfigService.update(dto);
    }
    async delete(dto) {
        await this.paramConfigService.delete(dto.ids);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '分页获取参数配置列表' }),
    (0, swagger_1.ApiOkResponse)({ type: [sys_config_entity_1.default] }),
    (0, common_1.Get)('page'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_dto_1.PageOptionsDto]),
    __metadata("design:returntype", Promise)
], SysParamConfigController.prototype, "page", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '新增参数配置' }),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [param_config_dto_1.CreateParamConfigDto]),
    __metadata("design:returntype", Promise)
], SysParamConfigController.prototype, "add", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '查询单个参数配置信息' }),
    (0, swagger_1.ApiOkResponse)({ type: sys_config_entity_1.default }),
    (0, common_1.Get)('info'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [param_config_dto_1.InfoParamConfigDto]),
    __metadata("design:returntype", Promise)
], SysParamConfigController.prototype, "info", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '更新单个参数配置' }),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [param_config_dto_1.UpdateParamConfigDto]),
    __metadata("design:returntype", Promise)
], SysParamConfigController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '删除指定的参数配置' }),
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [param_config_dto_1.DeleteParamConfigDto]),
    __metadata("design:returntype", Promise)
], SysParamConfigController.prototype, "delete", null);
SysParamConfigController = __decorate([
    (0, swagger_1.ApiSecurity)(admin_constants_1.ADMIN_PREFIX),
    (0, swagger_1.ApiTags)('参数配置模块'),
    (0, common_1.Controller)('param-config'),
    __metadata("design:paramtypes", [param_config_service_1.SysParamConfigService])
], SysParamConfigController);
exports.SysParamConfigController = SysParamConfigController;
//# sourceMappingURL=param-config.controller.js.map