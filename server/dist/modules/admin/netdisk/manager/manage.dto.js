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
exports.FileOpDto = exports.MarkFileDto = exports.DeleteDto = exports.FileInfoDto = exports.RenameDto = exports.MKDirDto = exports.GetFileListDto = exports.FileOpItem = exports.IsLegalNameExpression = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const lodash_1 = require("lodash");
const admin_constants_1 = require("../../admin.constants");
let IsLegalNameExpression = class IsLegalNameExpression {
    validate(value, args) {
        try {
            if ((0, lodash_1.isEmpty)(value)) {
                throw new Error('dir name is empty');
            }
            if (value.includes('/')) {
                throw new Error('dir name not allow /');
            }
            return true;
        }
        catch (e) {
            return false;
        }
    }
    defaultMessage(_args) {
        return 'file or dir name invalid';
    }
};
IsLegalNameExpression = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'IsLegalNameExpression', async: false })
], IsLegalNameExpression);
exports.IsLegalNameExpression = IsLegalNameExpression;
class FileOpItem {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '文件类型', enum: ['file', 'dir'] }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/(^file$)|(^dir$)/),
    __metadata("design:type", String)
], FileOpItem.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '文件名称' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Validate)(IsLegalNameExpression),
    __metadata("design:type", String)
], FileOpItem.prototype, "name", void 0);
exports.FileOpItem = FileOpItem;
class GetFileListDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '分页标识' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetFileListDto.prototype, "marker", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '当前路径' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetFileListDto.prototype, "path", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '搜索关键字' }),
    (0, class_validator_1.Validate)(IsLegalNameExpression),
    (0, class_validator_1.ValidateIf)((o) => !(0, lodash_1.isEmpty)(o.key)),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetFileListDto.prototype, "key", void 0);
exports.GetFileListDto = GetFileListDto;
class MKDirDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '文件夹名称' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Validate)(IsLegalNameExpression),
    __metadata("design:type", String)
], MKDirDto.prototype, "dirName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '所属路径' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MKDirDto.prototype, "path", void 0);
exports.MKDirDto = MKDirDto;
class RenameDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '文件类型' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/(^file$)|(^dir$)/),
    __metadata("design:type", String)
], RenameDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '更改的名称' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Validate)(IsLegalNameExpression),
    __metadata("design:type", String)
], RenameDto.prototype, "toName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '原来的名称' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Validate)(IsLegalNameExpression),
    __metadata("design:type", String)
], RenameDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '路径' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RenameDto.prototype, "path", void 0);
exports.RenameDto = RenameDto;
class FileInfoDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '文件名' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Validate)(IsLegalNameExpression),
    __metadata("design:type", String)
], FileInfoDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '文件所在路径' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FileInfoDto.prototype, "path", void 0);
exports.FileInfoDto = FileInfoDto;
class DeleteDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '需要操作的文件或文件夹', type: [FileOpItem] }),
    (0, class_transformer_1.Type)(() => FileOpItem),
    (0, class_validator_1.ArrayMaxSize)(admin_constants_1.NETDISK_HANDLE_MAX_ITEM),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], DeleteDto.prototype, "files", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '所在目录' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DeleteDto.prototype, "path", void 0);
exports.DeleteDto = DeleteDto;
class MarkFileDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '文件名' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Validate)(IsLegalNameExpression),
    __metadata("design:type", String)
], MarkFileDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '文件所在路径' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MarkFileDto.prototype, "path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '备注信息' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MarkFileDto.prototype, "mark", void 0);
exports.MarkFileDto = MarkFileDto;
class FileOpDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '需要操作的文件或文件夹', type: [FileOpItem] }),
    (0, class_transformer_1.Type)(() => FileOpItem),
    (0, class_validator_1.ArrayMaxSize)(admin_constants_1.NETDISK_HANDLE_MAX_ITEM),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], FileOpDto.prototype, "files", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '操作前的目录' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FileOpDto.prototype, "originPath", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '操作后的目录' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FileOpDto.prototype, "toPath", void 0);
exports.FileOpDto = FileOpDto;
//# sourceMappingURL=manage.dto.js.map