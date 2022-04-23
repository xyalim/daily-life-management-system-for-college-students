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
exports.LoginController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const authorize_decorator_1 = require("../core/decorators/authorize.decorator");
const login_dto_1 = require("./login.dto");
const login_class_1 = require("./login.class");
const login_service_1 = require("./login.service");
const log_disabled_decorator_1 = require("../core/decorators/log-disabled.decorator");
const util_service_1 = require("../../../shared/services/util.service");
let LoginController = class LoginController {
    constructor(loginService, utils) {
        this.loginService = loginService;
        this.utils = utils;
    }
    async captchaByImg(dto) {
        return await this.loginService.createImageCaptcha(dto);
    }
    async login(dto, req, ua) {
        await this.loginService.checkImgCaptcha(dto.captchaId, dto.verifyCode);
        const token = await this.loginService.getLoginSign(dto.username, dto.password, this.utils.getReqIP(req), ua);
        return { token };
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '获取登录图片验证码',
    }),
    (0, swagger_1.ApiOkResponse)({ type: login_class_1.ImageCaptcha }),
    (0, common_1.Get)('captcha/img'),
    (0, authorize_decorator_1.Authorize)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.ImageCaptchaDto]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "captchaByImg", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '管理员登录',
    }),
    (0, swagger_1.ApiOkResponse)({ type: login_class_1.LoginToken }),
    (0, common_1.Post)('login'),
    (0, log_disabled_decorator_1.LogDisabled)(),
    (0, authorize_decorator_1.Authorize)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Headers)('user-agent')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginInfoDto, Object, String]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "login", null);
LoginController = __decorate([
    (0, swagger_1.ApiTags)('登录模块'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [login_service_1.LoginService, util_service_1.UtilService])
], LoginController);
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map