"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const admin_constants_1 = require("./modules/admin/admin.constants");
function setupSwagger(app) {
    const configService = app.get(config_1.ConfigService);
    const enable = configService.get('swagger.enable', true);
    if (!enable) {
        return;
    }
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle(configService.get('swagger.title'))
        .setDescription(configService.get('swagger.desc'))
        .setLicense('MIT', 'https://github.com/hackycy/sf-nest-admin')
        .addSecurity(admin_constants_1.ADMIN_PREFIX, {
        description: '后台管理接口授权',
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
    })
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup(configService.get('swagger.path', '/swagger-api'), app, document);
}
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=setup-swagger.js.map