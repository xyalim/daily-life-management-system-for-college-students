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
let SysRoleMenu = class SysRoleMenu extends base_entity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SysRoleMenu.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'role_id' }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SysRoleMenu.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'menu_id' }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SysRoleMenu.prototype, "menuId", void 0);
SysRoleMenu = __decorate([
    (0, typeorm_1.Entity)({ name: 'sys_role_menu' })
], SysRoleMenu);
exports.default = SysRoleMenu;
//# sourceMappingURL=sys-role-menu.entity.js.map