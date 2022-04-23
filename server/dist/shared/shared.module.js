"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const redis_module_1 = require("./redis/redis.module");
const redis_service_1 = require("./services/redis.service");
const util_service_1 = require("./services/util.service");
const providers = [util_service_1.UtilService, redis_service_1.RedisService];
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule.register({
                timeout: 5000,
                maxRedirects: 5,
            }),
            common_1.CacheModule.register(),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    secret: configService.get('jwt.secret'),
                }),
                inject: [config_1.ConfigService],
            }),
            redis_module_1.RedisModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    host: configService.get('redis.host'),
                    port: configService.get('redis.port'),
                    password: configService.get('redis.password'),
                    db: configService.get('redis.db'),
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [...providers],
        exports: [axios_1.HttpModule, common_1.CacheModule, jwt_1.JwtModule, ...providers],
    })
], SharedModule);
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map