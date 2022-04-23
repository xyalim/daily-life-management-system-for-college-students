"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const lodash_1 = require("lodash");
const app_module_1 = require("./app.module");
const api_exception_filter_1 = require("./common/filters/api-exception.filter");
const api_transform_interceptor_1 = require("./common/interceptors/api-transform.interceptor");
const setup_swagger_1 = require("./setup-swagger");
const logger_service_1 = require("./shared/logger/logger.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter(), {
        bufferLogs: true,
    });
    app.useLogger(app.get(logger_service_1.LoggerService));
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
        exceptionFactory: (errors) => {
            return new common_1.UnprocessableEntityException((0, lodash_1.flatten)(errors
                .filter((item) => !!item.constraints)
                .map((item) => Object.values(item.constraints))).join('; '));
        },
    }));
    app.useGlobalFilters(new api_exception_filter_1.ApiExceptionFilter(app.get(logger_service_1.LoggerService)));
    app.useGlobalInterceptors(new api_transform_interceptor_1.ApiTransformInterceptor(new core_1.Reflector()));
    app.useWebSocketAdapter(new platform_socket_io_1.IoAdapter());
    (0, setup_swagger_1.setupSwagger)(app);
    await app.listen(process.env.PORT || 7001, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map