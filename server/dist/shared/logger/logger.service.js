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
var LoggerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const common_1 = require("@nestjs/common");
const cli_colors_util_1 = require("@nestjs/common/utils/cli-colors.util");
const logger_constants_1 = require("./logger.constants");
const app_root_path_util_1 = require("./utils/app-root-path.util");
const winston_1 = require("winston");
const path_1 = require("path");
const WinstonDailyRotateFile = require("winston-daily-rotate-file");
const env_1 = require("../../config/env");
const lodash_1 = require("lodash");
const DEFAULT_LOG_CONSOLE_LEVELS = (0, env_1.isDev)() ? 'info' : 'error';
const DEFAULT_LOG_WINSTON_LEVELS = 'info';
const LOG_LEVEL_VALUES = {
    debug: 4,
    verbose: 3,
    info: 2,
    warn: 1,
    error: 0,
};
let LoggerService = LoggerService_1 = class LoggerService {
    constructor(context, options = {}) {
        this.context = context;
        this.options = options;
        this.options.timestamp === undefined && (this.options.timestamp = true);
        !this.options.level && (this.options.level = DEFAULT_LOG_WINSTON_LEVELS);
        !this.options.consoleLevel &&
            (this.options.consoleLevel = DEFAULT_LOG_CONSOLE_LEVELS);
        !this.options.maxFileSize && (this.options.maxFileSize = logger_constants_1.DEFAULT_MAX_SIZE);
        !this.options.appLogName &&
            (this.options.appLogName = logger_constants_1.DEFAULT_WEB_LOG_NAME);
        !this.options.errorLogName &&
            (this.options.errorLogName = logger_constants_1.DEFAULT_ERROR_LOG_NAME);
        this.initWinston();
    }
    initWinston() {
        if (this.options.dir) {
            this.logDir = this.options.dir;
        }
        else {
            this.logDir = (0, path_1.join)((0, app_root_path_util_1.getAppRootPath)(), logger_constants_1.PROJECT_LOG_DIR_NAME);
        }
        const transportOptions = {
            dirname: this.logDir,
            maxSize: this.options.maxFileSize,
            maxFiles: this.options.maxFiles,
        };
        const webTransport = new WinstonDailyRotateFile(Object.assign(transportOptions, { filename: this.options.appLogName }));
        const errorTransport = new WinstonDailyRotateFile(Object.assign(transportOptions, {
            filename: this.options.errorLogName,
            level: 'error',
        }));
        this.winstonLogger = (0, winston_1.createLogger)({
            level: this.options.level,
            format: winston_1.format.json({
                space: 0,
            }),
            levels: LOG_LEVEL_VALUES,
            transports: [webTransport, errorTransport],
        });
    }
    getLogDir() {
        return this.logDir;
    }
    getWinstonLogger() {
        return this.winstonLogger;
    }
    log(message, ...optionalParams) {
        const consoleEnable = this.isConsoleLevelEnabled('info');
        const winstonEnable = this.isWinstonLevelEnabled('info');
        if (!consoleEnable && !winstonEnable) {
            return;
        }
        const { messages, context } = this.getContextAndMessagesToPrint([
            message,
            ...optionalParams,
        ]);
        if (consoleEnable) {
            this.printMessages(messages, context, 'info');
        }
        this.recordMessages(messages, context, 'info');
    }
    error(message, ...optionalParams) {
        const consoleEnable = this.isConsoleLevelEnabled('error');
        const winstonEnable = this.isWinstonLevelEnabled('error');
        if (!consoleEnable && !winstonEnable) {
            return;
        }
        const { messages, context, stack } = this.getContextAndStackAndMessagesToPrint([message, ...optionalParams]);
        if (consoleEnable) {
            this.printMessages(messages, context, 'error', 'stderr');
            this.printStackTrace(stack);
        }
        this.recordMessages(messages, context, 'error', stack);
    }
    warn(message, ...optionalParams) {
        const consoleEnable = this.isConsoleLevelEnabled('warn');
        const winstonEnable = this.isWinstonLevelEnabled('warn');
        if (!consoleEnable && !winstonEnable) {
            return;
        }
        const { messages, context } = this.getContextAndMessagesToPrint([
            message,
            ...optionalParams,
        ]);
        if (consoleEnable) {
            this.printMessages(messages, context, 'warn');
        }
        this.recordMessages(messages, context, 'warn');
    }
    debug(message, ...optionalParams) {
        const consoleEnable = this.isConsoleLevelEnabled('debug');
        const winstonEnable = this.isWinstonLevelEnabled('debug');
        if (!consoleEnable && !winstonEnable) {
            return;
        }
        const { messages, context } = this.getContextAndMessagesToPrint([
            message,
            ...optionalParams,
        ]);
        if (consoleEnable) {
            this.printMessages(messages, context, 'debug');
        }
        this.recordMessages(messages, context, 'debug');
    }
    verbose(message, ...optionalParams) {
        const consoleEnable = this.isConsoleLevelEnabled('verbose');
        const winstonEnable = this.isWinstonLevelEnabled('verbose');
        if (!consoleEnable && !winstonEnable) {
            return;
        }
        const { messages, context } = this.getContextAndMessagesToPrint([
            message,
            ...optionalParams,
        ]);
        if (consoleEnable) {
            this.printMessages(messages, context, 'verbose');
        }
        this.recordMessages(messages, context, 'verbose');
    }
    isConsoleLevelEnabled(level) {
        if (!(0, env_1.isDev)() && !this.options.disableConsoleAtProd) {
            return false;
        }
        if (this.options.consoleLevel === 'none') {
            return false;
        }
        return LOG_LEVEL_VALUES[level] <= LOG_LEVEL_VALUES[level];
    }
    isWinstonLevelEnabled(level) {
        if (this.options.level === 'none') {
            return false;
        }
        return LOG_LEVEL_VALUES[level] <= LOG_LEVEL_VALUES[level];
    }
    getTimestamp() {
        const localeStringOptions = {
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            day: '2-digit',
            month: '2-digit',
        };
        return new Date(Date.now()).toLocaleString(undefined, localeStringOptions);
    }
    recordMessages(messages, context = '', logLevel = 'info', stack) {
        messages.forEach((message) => {
            const output = (0, lodash_1.isPlainObject)(message)
                ? JSON.stringify(message, (_, value) => typeof value === 'bigint' ? value.toString() : value, 0)
                : message;
            this.winstonLogger.log(logLevel, output, {
                context,
                stack,
                pid: process.pid,
                timestamp: this.getTimestamp(),
            });
        });
    }
    printMessages(messages, context = '', logLevel = 'info', writeStreamType) {
        const color = this.getColorByLogLevel(logLevel);
        messages.forEach((message) => {
            const output = (0, lodash_1.isPlainObject)(message)
                ? `${color('Object:')}\n${JSON.stringify(message, (_, value) => typeof value === 'bigint' ? value.toString() : value, 2)}\n`
                : color(message);
            const pidMessage = color(`[Nest] ${process.pid}  - `);
            const contextMessage = context ? (0, cli_colors_util_1.yellow)(`[${context}] `) : '';
            const timestampDiff = this.updateAndGetTimestampDiff();
            const formattedLogLevel = color(logLevel.toUpperCase().padStart(7, ' '));
            const computedMessage = `${pidMessage}${this.getTimestamp()} ${formattedLogLevel} ${contextMessage}${output}${timestampDiff}\n`;
            process[writeStreamType !== null && writeStreamType !== void 0 ? writeStreamType : 'stdout'].write(computedMessage);
        });
    }
    printStackTrace(stack) {
        if (!stack) {
            return;
        }
        process.stderr.write(`${stack}\n`);
    }
    updateAndGetTimestampDiff() {
        var _a;
        const includeTimestamp = LoggerService_1.lastTimestampAt && ((_a = this.options) === null || _a === void 0 ? void 0 : _a.timestamp);
        const result = includeTimestamp
            ? (0, cli_colors_util_1.yellow)(` +${Date.now() - LoggerService_1.lastTimestampAt}ms`)
            : '';
        LoggerService_1.lastTimestampAt = Date.now();
        return result;
    }
    getContextAndMessagesToPrint(args) {
        if ((args === null || args === void 0 ? void 0 : args.length) <= 1) {
            return { messages: args, context: this.context };
        }
        const lastElement = args[args.length - 1];
        const isContext = typeof lastElement === 'string';
        if (!isContext) {
            return { messages: args, context: this.context };
        }
        return {
            context: lastElement,
            messages: args.slice(0, args.length - 1),
        };
    }
    getContextAndStackAndMessagesToPrint(args) {
        const { messages, context } = this.getContextAndMessagesToPrint(args);
        if ((messages === null || messages === void 0 ? void 0 : messages.length) <= 1) {
            return { messages, context };
        }
        const lastElement = messages[messages.length - 1];
        const isStack = typeof lastElement === 'string';
        if (!isStack) {
            return { messages, context };
        }
        return {
            stack: lastElement,
            messages: messages.slice(0, messages.length - 1),
            context,
        };
    }
    getColorByLogLevel(level) {
        switch (level) {
            case 'debug':
                return cli_colors_util_1.clc.magentaBright;
            case 'warn':
                return cli_colors_util_1.clc.yellow;
            case 'error':
                return cli_colors_util_1.clc.red;
            case 'verbose':
                return cli_colors_util_1.clc.cyanBright;
            default:
                return cli_colors_util_1.clc.green;
        }
    }
};
LoggerService = LoggerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Optional)()),
    __param(1, (0, common_1.Optional)()),
    __param(1, (0, common_1.Inject)(logger_constants_1.LOGGER_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [String, Object])
], LoggerService);
exports.LoggerService = LoggerService;
//# sourceMappingURL=logger.service.js.map