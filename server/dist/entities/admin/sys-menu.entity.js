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
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const base_entity_1 = require("../base.entity");
let SysMenu = class SysMenu extends base_entity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SysMenu.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'parent_id', nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SysMenu.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SysMenu.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SysMenu.prototype, "router", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SysMenu.prototype, "perms", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', default: 0 }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SysMenu.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SysMenu.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order_num', type: 'int', default: 0, nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SysMenu.prototype, "orderNum", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'view_path', nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SysMenu.prototype, "viewPath", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true, default: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], SysMenu.prototype, "keepalive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_show', type: 'boolean', nullable: true, default: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], SysMenu.prototype, "isShow", void 0);
SysMenu = __decorate([
    (0, typeorm_1.Entity)({ name: 'sys_menu' })
], SysMenu);
exports.default = SysMenu;
//# sourceMappingURL=sys-menu.entity.js.map