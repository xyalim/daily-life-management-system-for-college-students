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
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const svgCaptcha = require("svg-captcha");
const lodash_1 = require("lodash");
const jwt_1 = require("@nestjs/jwt");
const util_service_1 = require("../../../shared/services/util.service");
const menu_service_1 = require("../system/menu/menu.service");
const user_service_1 = require("../system/user/user.service");
const api_exception_1 = require("../../../common/exceptions/api.exception");
const log_service_1 = require("../system/log/log.service");
const redis_service_1 = require("../../../shared/services/redis.service");
let LoginService = class LoginService {
    constructor(redisService, menuService, userService, logService, util, jwtService) {
        this.redisService = redisService;
        this.menuService = menuService;
        this.userService = userService;
        this.logService = logService;
        this.util = util;
        this.jwtService = jwtService;
    }
    async createImageCaptcha(captcha) {
        const svg = svgCaptcha.create({
            size: 4,
            color: true,
            noise: 4,
            width: (0, lodash_1.isEmpty)(captcha.width) ? 100 : captcha.width,
            height: (0, lodash_1.isEmpty)(captcha.height) ? 50 : captcha.height,
            charPreset: '1234567890',
        });
        const result = {
            img: `data:image/svg+xml;base64,${Buffer.from(svg.data).toString('base64')}`,
            id: this.util.generateUUID(),
        };
        await this.redisService
            .getRedis()
            .set(`admin:captcha:img:${result.id}`, svg.text, 'EX', 60 * 5);
        return result;
    }
    async checkImgCaptcha(id, code) {
        const result = await this.redisService
            .getRedis()
            .get(`admin:captcha:img:${id}`);
        if ((0, lodash_1.isEmpty)(result) || code.toLowerCase() !== result.toLowerCase()) {
            throw new api_exception_1.ApiException(10002);
        }
        await this.redisService.getRedis().del(`admin:captcha:img:${id}`);
    }
    async getLoginSign(username, password, ip, ua) {
        const user = await this.userService.findUserByUserName(username);
        if ((0, lodash_1.isEmpty)(user)) {
            throw new api_exception_1.ApiException(10003);
        }
        const comparePassword = this.util.md5(`${password}${user.psalt}`);
        if (user.password !== comparePassword) {
            throw new api_exception_1.ApiException(10003);
        }
        const perms = await this.menuService.getPerms(user.id);
        const jwtSign = this.jwtService.sign({
            uid: parseInt(user.id.toString()),
            pv: 1,
        });
        await this.redisService
            .getRedis()
            .set(`admin:passwordVersion:${user.id}`, 1);
        await this.redisService
            .getRedis()
            .set(`admin:token:${user.id}`, jwtSign, 'EX', 60 * 60 * 24);
        await this.redisService
            .getRedis()
            .set(`admin:perms:${user.id}`, JSON.stringify(perms));
        await this.logService.saveLoginLog(user.id, ip, ua);
        return jwtSign;
    }
    async clearLoginStatus(uid) {
        await this.userService.forbidden(uid);
    }
    async getPermMenu(uid) {
        const menus = await this.menuService.getMenus(uid);
        const perms = await this.menuService.getPerms(uid);
        return { menus, perms };
    }
    async getRedisPasswordVersionById(id) {
        return this.redisService.getRedis().get(`admin:passwordVersion:${id}`);
    }
    async getRedisTokenById(id) {
        return this.redisService.getRedis().get(`admin:token:${id}`);
    }
    async getRedisPermsById(id) {
        return this.redisService.getRedis().get(`admin:perms:${id}`);
    }
};
LoginService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService,
        menu_service_1.SysMenuService,
        user_service_1.SysUserService,
        log_service_1.SysLogService,
        util_service_1.UtilService,
        jwt_1.JwtService])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map