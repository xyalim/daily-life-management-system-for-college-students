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
var HttpRequestJob_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRequestJob = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const logger_service_1 = require("../../shared/logger/logger.service");
const mission_decorator_1 = require("../mission.decorator");
let HttpRequestJob = HttpRequestJob_1 = class HttpRequestJob {
    constructor(httpService, logger) {
        this.httpService = httpService;
        this.logger = logger;
    }
    async handle(config) {
        if (config) {
            const result = await this.httpService.axiosRef.request(config);
            this.logger.log(result, HttpRequestJob_1.name);
        }
        else {
            throw new Error('Http request job param is empty');
        }
    }
};
HttpRequestJob = HttpRequestJob_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, mission_decorator_1.Mission)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        logger_service_1.LoggerService])
], HttpRequestJob);
exports.HttpRequestJob = HttpRequestJob;
//# sourceMappingURL=http-request.job.js.map