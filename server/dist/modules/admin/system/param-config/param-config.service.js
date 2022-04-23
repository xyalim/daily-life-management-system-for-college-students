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
exports.SysParamConfigService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const api_exception_1 = require("../../../../common/exceptions/api.exception");
const sys_config_entity_1 = require("../../../../entities/admin/sys-config.entity");
const typeorm_2 = require("typeorm");
let SysParamConfigService = class SysParamConfigService {
    constructor(configRepository) {
        this.configRepository = configRepository;
    }
    async getConfigListByPage(page, count) {
        return this.configRepository.find({
            order: {
                id: 'ASC',
            },
            take: count,
            skip: page * count,
        });
    }
    async countConfigList() {
        return this.configRepository.count();
    }
    async add(dto) {
        await this.configRepository.insert(dto);
    }
    async update(dto) {
        await this.configRepository.update({ id: dto.id }, { name: dto.name, value: dto.value, remark: dto.remark });
    }
    async delete(ids) {
        await this.configRepository.delete(ids);
    }
    async findOne(id) {
        return await this.configRepository.findOne({ id });
    }
    async isExistKey(key) {
        const result = await this.configRepository.findOne({ key });
        if (result) {
            throw new api_exception_1.ApiException(10021);
        }
    }
    async findValueByKey(key) {
        const result = await this.configRepository.findOne({ key }, { select: ['value'] });
        if (result) {
            return result.value;
        }
        return null;
    }
};
SysParamConfigService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sys_config_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SysParamConfigService);
exports.SysParamConfigService = SysParamConfigService;
//# sourceMappingURL=param-config.service.js.map