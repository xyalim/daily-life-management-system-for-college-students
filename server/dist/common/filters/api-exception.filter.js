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
var ApiExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const env_1 = require("../../config/env");
const api_exception_1 = require("../exceptions/api.exception");
const res_class_1 = require("../class/res.class");
const logger_service_1 = require("../../shared/logger/logger.service");
let ApiExceptionFilter = ApiExceptionFilter_1 = class ApiExceptionFilter {
    constructor(logger) {
        this.logger = logger;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        response.header('Content-Type', 'application/json; charset=utf-8');
        const code = exception instanceof api_exception_1.ApiException
            ? exception.getErrorCode()
            : status;
        let message = '服务器异常，请稍后再试';
        if ((0, env_1.isDev)() || status < 500) {
            message =
                exception instanceof common_1.HttpException ? exception.message : `${exception}`;
        }
        if (status >= 500) {
            this.logger.error(exception, ApiExceptionFilter_1.name);
        }
        const result = new res_class_1.ResOp(code, null, message);
        response.status(status).send(result);
    }
};
ApiExceptionFilter = ApiExceptionFilter_1 = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [logger_service_1.LoggerService])
], ApiExceptionFilter);
exports.ApiExceptionFilter = ApiExceptionFilter;
//# sourceMappingURL=api-exception.filter.js.map