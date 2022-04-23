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
var SysTaskService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SysTaskService = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const unknown_element_exception_1 = require("@nestjs/core/errors/exceptions/unknown-element.exception");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const decorator_contants_1 = require("../../../../common/contants/decorator.contants");
const api_exception_1 = require("../../../../common/exceptions/api.exception");
const sys_task_entity_1 = require("../../../../entities/admin/sys-task.entity");
const logger_service_1 = require("../../../../shared/logger/logger.service");
const redis_service_1 = require("../../../../shared/services/redis.service");
const typeorm_2 = require("typeorm");
const admin_constants_1 = require("../../admin.constants");
let SysTaskService = SysTaskService_1 = class SysTaskService {
    constructor(taskRepository, taskQueue, moduleRef, reflector, redisService, logger) {
        this.taskRepository = taskRepository;
        this.taskQueue = taskQueue;
        this.moduleRef = moduleRef;
        this.reflector = reflector;
        this.redisService = redisService;
        this.logger = logger;
    }
    async onModuleInit() {
        await this.initTask();
    }
    async initTask() {
        const initKey = `${admin_constants_1.SYS_TASK_QUEUE_PREFIX}:init`;
        const result = await this.redisService
            .getRedis()
            .multi()
            .setnx(initKey, new Date().getTime())
            .expire(initKey, 60 * 30)
            .exec();
        if (result[0][1] === 0) {
            this.logger.log('Init task is lock', SysTaskService_1.name);
            return;
        }
        const jobs = await this.taskQueue.getJobs([
            'active',
            'delayed',
            'failed',
            'paused',
            'waiting',
            'completed',
        ]);
        for (let i = 0; i < jobs.length; i++) {
            await jobs[i].remove();
        }
        const tasks = await this.taskRepository.find({ status: 1 });
        if (tasks && tasks.length > 0) {
            for (const t of tasks) {
                await this.start(t);
            }
        }
        await this.redisService.getRedis().del(initKey);
    }
    async page(page, count) {
        const result = await this.taskRepository.find({
            order: {
                id: 'ASC',
            },
            take: count,
            skip: page * count,
        });
        return result;
    }
    async count() {
        return await this.taskRepository.count();
    }
    async info(id) {
        return await this.taskRepository.findOne({ id });
    }
    async delete(task) {
        if (!task) {
            throw new Error('Task is Empty');
        }
        await this.stop(task);
        await this.taskRepository.delete(task.id);
    }
    async once(task) {
        if (task) {
            await this.taskQueue.add({ id: task.id, service: task.service, args: task.data }, { jobId: task.id, removeOnComplete: true, removeOnFail: true });
        }
        else {
            throw new Error('Task is Empty');
        }
    }
    async addOrUpdate(param) {
        const result = await this.taskRepository.save(param);
        const task = await this.info(result.id);
        if (result.status === 0) {
            await this.stop(task);
        }
        else if (result.status === 1) {
            await this.start(task);
        }
    }
    async start(task) {
        if (!task) {
            throw new Error('Task is Empty');
        }
        await this.stop(task);
        let repeat;
        if (task.type === 1) {
            repeat = {
                every: task.every,
            };
        }
        else {
            repeat = {
                cron: task.cron,
            };
            if (task.startTime) {
                repeat.startDate = task.startTime;
            }
            if (task.endTime) {
                repeat.endDate = task.endTime;
            }
        }
        if (task.limit > 0) {
            repeat.limit = task.limit;
        }
        const job = await this.taskQueue.add({ id: task.id, service: task.service, args: task.data }, { jobId: task.id, removeOnComplete: true, removeOnFail: true, repeat });
        if (job && job.opts) {
            await this.taskRepository.update(task.id, {
                jobOpts: JSON.stringify(job.opts.repeat),
                status: 1,
            });
        }
        else {
            job && (await job.remove());
            await this.taskRepository.update(task.id, { status: 0 });
            throw new Error('Task Start failed');
        }
    }
    async stop(task) {
        if (!task) {
            throw new Error('Task is Empty');
        }
        const exist = await this.existJob(task.id.toString());
        if (!exist) {
            await this.taskRepository.update(task.id, { status: 0 });
            return;
        }
        const jobs = await this.taskQueue.getJobs([
            'active',
            'delayed',
            'failed',
            'paused',
            'waiting',
            'completed',
        ]);
        for (let i = 0; i < jobs.length; i++) {
            if (jobs[i].data.id === task.id) {
                await jobs[i].remove();
            }
        }
        await this.taskRepository.update(task.id, { status: 0 });
    }
    async existJob(jobId) {
        const jobs = await this.taskQueue.getRepeatableJobs();
        const ids = jobs.map((e) => {
            return e.id;
        });
        return ids.includes(jobId);
    }
    async updateTaskCompleteStatus(tid) {
        const jobs = await this.taskQueue.getRepeatableJobs();
        const task = await this.taskRepository.findOne({ id: tid });
        for (const job of jobs) {
            const currentTime = new Date().getTime();
            if (job.id === tid.toString() && job.next < currentTime) {
                await this.stop(task);
                break;
            }
        }
    }
    async checkHasMissionMeta(nameOrInstance, exec) {
        try {
            let service;
            if (typeof nameOrInstance === 'string') {
                service = await this.moduleRef.get(nameOrInstance, { strict: false });
            }
            else {
                service = nameOrInstance;
            }
            if (!service || !(exec in service)) {
                throw new api_exception_1.ApiException(10102);
            }
            const hasMission = this.reflector.get(decorator_contants_1.MISSION_KEY_METADATA, service.constructor);
            if (!hasMission) {
                throw new api_exception_1.ApiException(10101);
            }
        }
        catch (e) {
            if (e instanceof unknown_element_exception_1.UnknownElementException) {
                throw new api_exception_1.ApiException(10102);
            }
            else {
                throw e;
            }
        }
    }
    async callService(serviceName, args) {
        if (serviceName) {
            const arr = serviceName.split('.');
            if (arr.length < 1) {
                throw new Error('serviceName define error');
            }
            const methodName = arr[1];
            const service = await this.moduleRef.get(arr[0], { strict: false });
            await this.checkHasMissionMeta(service, methodName);
            if ((0, lodash_1.isEmpty)(args)) {
                await service[methodName]();
            }
            else {
                const parseArgs = this.safeParse(args);
                if (Array.isArray(parseArgs)) {
                    await service[methodName](...parseArgs);
                }
                else {
                    await service[methodName](parseArgs);
                }
            }
        }
    }
    safeParse(args) {
        try {
            return JSON.parse(args);
        }
        catch (e) {
            return args;
        }
    }
};
SysTaskService = SysTaskService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sys_task_entity_1.default)),
    __param(1, (0, bull_1.InjectQueue)(admin_constants_1.SYS_TASK_QUEUE_NAME)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object, core_1.ModuleRef,
        core_1.Reflector,
        redis_service_1.RedisService,
        logger_service_1.LoggerService])
], SysTaskService);
exports.SysTaskService = SysTaskService;
//# sourceMappingURL=task.service.js.map