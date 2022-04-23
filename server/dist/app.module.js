"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
require("./polyfill");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const bull_1 = require("@nestjs/bull");
const configuration_1 = require("./config/configuration");
const admin_module_1 = require("./modules/admin/admin.module");
const shared_module_1 = require("./shared/shared.module");
const mission_module_1 = require("./mission/mission.module");
const ws_module_1 = require("./modules/ws/ws.module");
const logger_module_1 = require("./shared/logger/logger.module");
const typeorm_logger_service_1 = require("./shared/logger/typeorm-logger.service");
const logger_constants_1 = require("./shared/logger/logger.constants");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule, logger_module_1.LoggerModule],
                useFactory: (configService, loggerOptions) => ({
                    autoLoadEntities: true,
                    type: configService.get('database.type'),
                    host: configService.get('database.host'),
                    port: configService.get('database.port'),
                    username: configService.get('database.username'),
                    password: configService.get('database.password'),
                    database: configService.get('database.database'),
                    synchronize: configService.get('database.synchronize'),
                    logging: configService.get('database.logging'),
                    logger: new typeorm_logger_service_1.TypeORMLoggerService(configService.get('database.logging'), loggerOptions),
                }),
                inject: [config_1.ConfigService, logger_constants_1.LOGGER_MODULE_OPTIONS],
            }),
            bull_1.BullModule.forRoot({}),
            logger_module_1.LoggerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    return {
                        level: configService.get('logger.level'),
                        consoleLevel: configService.get('logger.consoleLevel'),
                        timestamp: configService.get('logger.timestamp'),
                        maxFiles: configService.get('logger.maxFiles'),
                        maxFileSize: configService.get('logger.maxFileSize'),
                        disableConsoleAtProd: configService.get('logger.disableConsoleAtProd'),
                        dir: configService.get('logger.dir'),
                        errorLogName: configService.get('logger.errorLogName'),
                        appLogName: configService.get('logger.appLogName'),
                    };
                },
                inject: [config_1.ConfigService],
            }, true),
            shared_module_1.SharedModule,
            mission_module_1.MissionModule.forRoot(),
            admin_module_1.AdminModule,
            ws_module_1.WSModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map