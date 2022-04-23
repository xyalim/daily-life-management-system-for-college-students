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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const lodash_1 = require("lodash");
const jwt_1 = require("@nestjs/jwt");
const api_exception_1 = require("../../../../common/exceptions/api.exception");
const admin_constants_1 = require("../../admin.constants");
const login_service_1 = require("../../login/login.service");
let AuthGuard = class AuthGuard {
    constructor(reflector, jwtService, loginService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.loginService = loginService;
    }
    async canActivate(context) {
        const authorize = this.reflector.get(admin_constants_1.AUTHORIZE_KEY_METADATA, context.getHandler());
        if (authorize) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const url = request.url;
        const path = url.split('?')[0];
        const token = request.headers['authorization'];
        if ((0, lodash_1.isEmpty)(token)) {
            throw new api_exception_1.ApiException(11001);
        }
        try {
            request[admin_constants_1.ADMIN_USER] = this.jwtService.verify(token);
        }
        catch (e) {
            throw new api_exception_1.ApiException(11001);
        }
        if ((0, lodash_1.isEmpty)(request[admin_constants_1.ADMIN_USER])) {
            throw new api_exception_1.ApiException(11001);
        }
        const pv = await this.loginService.getRedisPasswordVersionById(request[admin_constants_1.ADMIN_USER].uid);
        if (pv !== `${request[admin_constants_1.ADMIN_USER].pv}`) {
            throw new api_exception_1.ApiException(11002);
        }
        const redisToken = await this.loginService.getRedisTokenById(request[admin_constants_1.ADMIN_USER].uid);
        if (token !== redisToken) {
            throw new api_exception_1.ApiException(11002);
        }
        const notNeedPerm = this.reflector.get(admin_constants_1.PERMISSION_OPTIONAL_KEY_METADATA, context.getHandler());
        if (notNeedPerm) {
            return true;
        }
        const perms = await this.loginService.getRedisPermsById(request[admin_constants_1.ADMIN_USER].uid);
        if ((0, lodash_1.isEmpty)(perms)) {
            throw new api_exception_1.ApiException(11001);
        }
        const permArray = JSON.parse(perms).map((e) => {
            return e.replace(/:/g, '/');
        });
        if (!permArray.includes(path.replace(`/${admin_constants_1.ADMIN_PREFIX}/`, ''))) {
            throw new api_exception_1.ApiException(11003);
        }
        return true;
    }
};
AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService,
        login_service_1.LoginService])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map