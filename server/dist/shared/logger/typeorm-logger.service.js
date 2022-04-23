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
var TypeORMLoggerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeORMLoggerService = void 0;
const common_1 = require("@nestjs/common");
const logger_constants_1 = require("./logger.constants");
const logger_service_1 = require("./logger.service");
let TypeORMLoggerService = TypeORMLoggerService_1 = class TypeORMLoggerService {
    constructor(options, config) {
        this.options = options;
        this.config = config;
        this.logger = new logger_service_1.LoggerService(TypeORMLoggerService_1.name, {
            level: 'warn',
            consoleLevel: 'verbose',
            appLogName: logger_constants_1.DEFAULT_SQL_SLOW_LOG_NAME,
            errorLogName: logger_constants_1.DEFAULT_SQL_ERROR_LOG_NAME,
            timestamp: this.config.timestamp,
            dir: this.config.dir,
            maxFileSize: this.config.maxFileSize,
            maxFiles: this.config.maxFiles,
        });
    }
    logQuery(query, parameters) {
        if (this.options === 'all' ||
            this.options === true ||
            (Array.isArray(this.options) && this.options.indexOf('query') !== -1)) {
            const sql = query +
                (parameters && parameters.length
                    ? ' -- PARAMETERS: ' + this.stringifyParams(parameters)
                    : '');
            this.logger.verbose('[QUERY]: ' + sql);
        }
    }
    logQueryError(error, query, parameters) {
        if (this.options === 'all' ||
            this.options === true ||
            (Array.isArray(this.options) && this.options.indexOf('error') !== -1)) {
            const sql = query +
                (parameters && parameters.length
                    ? ' -- PARAMETERS: ' + this.stringifyParams(parameters)
                    : '');
            this.logger.error([`[FAILED QUERY]: ${sql}`, `[QUERY ERROR]: ${error}`]);
        }
    }
    logQuerySlow(time, query, parameters) {
        const sql = query +
            (parameters && parameters.length
                ? ' -- PARAMETERS: ' + this.stringifyParams(parameters)
                : '');
        this.logger.warn(`[SLOW QUERY: ${time} ms]: ` + sql);
    }
    logSchemaBuild(message) {
        if (this.options === 'all' ||
            (Array.isArray(this.options) && this.options.indexOf('schema') !== -1)) {
            this.logger.verbose(message);
        }
    }
    logMigration(message) {
        this.logger.verbose(message);
    }
    log(level, message) {
        switch (level) {
            case 'log':
                if (this.options === 'all' ||
                    (Array.isArray(this.options) && this.options.indexOf('log') !== -1))
                    this.logger.verbose('[LOG]: ' + message);
                break;
            case 'info':
                if (this.options === 'all' ||
                    (Array.isArray(this.options) && this.options.indexOf('info') !== -1))
                    this.logger.log('[INFO]: ' + message);
                break;
            case 'warn':
                if (this.options === 'all' ||
                    (Array.isArray(this.options) && this.options.indexOf('warn') !== -1))
                    this.logger.warn('[WARN]: ' + message);
                break;
        }
    }
    stringifyParams(parameters) {
        try {
            return JSON.stringify(parameters);
        }
        catch (error) {
            return parameters;
        }
    }
};
TypeORMLoggerService = TypeORMLoggerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object, Object])
], TypeORMLoggerService);
exports.TypeORMLoggerService = TypeORMLoggerService;
//# sourceMappingURL=typeorm-logger.service.js.map