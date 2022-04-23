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
exports.InfoMenuDto = exports.DeleteMenuDto = exports.UpdateMenuDto = exports.CreateMenuDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateMenuDto {
    constructor() {
        this.isShow = true;
        this.keepalive = true;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '菜单类型' }),
    (0, class_validator_1.IsIn)([0, 1, 2]),
    __metadata("design:type", Number)
], CreateMenuDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '父级菜单' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateMenuDto.prototype, "parentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '菜单或权限名称' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '排序' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateMenuDto.prototype, "orderNum", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '前端路由地址' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateIf)((o) => o.type !== 2),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "router", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '菜单是否显示', required: false, default: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.ValidateIf)((o) => o.type !== 2),
    __metadata("design:type", Boolean)
], CreateMenuDto.prototype, "isShow", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '开启页面缓存', required: false, default: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.ValidateIf)((o) => o.type === 1),
    __metadata("design:type", Boolean)
], CreateMenuDto.prototype, "keepalive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '菜单图标', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((o) => o.type !== 2),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '对应权限' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((o) => o.type === 2),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "perms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '菜单路由路径或外链' }),
    (0, class_validator_1.ValidateIf)((o) => o.type !== 2),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "viewPath", void 0);
exports.CreateMenuDto = CreateMenuDto;
class UpdateMenuDto extends CreateMenuDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '更新的菜单ID' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateMenuDto.prototype, "menuId", void 0);
exports.UpdateMenuDto = UpdateMenuDto;
class DeleteMenuDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '删除的菜单ID' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], DeleteMenuDto.prototype, "menuId", void 0);
exports.DeleteMenuDto = DeleteMenuDto;
class InfoMenuDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '查询的菜单ID' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], InfoMenuDto.prototype, "menuId", void 0);
exports.InfoMenuDto = InfoMenuDto;
//# sourceMappingURL=menu.dto.js.map