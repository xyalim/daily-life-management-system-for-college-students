"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var RedisModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisModule = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
const lodash_1 = require("lodash");
const redis_constants_1 = require("./redis.constants");
let RedisModule = RedisModule_1 = class RedisModule {
    static register(options) {
        const clientProvider = this.createAysncProvider();
        return {
            module: RedisModule_1,
            providers: [
                clientProvider,
                {
                    provide: redis_constants_1.REDIS_MODULE_OPTIONS,
                    useValue: options,
                },
            ],
            exports: [clientProvider],
        };
    }
    static registerAsync(options) {
        var _a;
        const clientProvider = this.createAysncProvider();
        return {
            module: RedisModule_1,
            imports: (_a = options.imports) !== null && _a !== void 0 ? _a : [],
            providers: [clientProvider, this.createAsyncClientOptions(options)],
            exports: [clientProvider],
        };
    }
    static createAysncProvider() {
        return {
            provide: redis_constants_1.REDIS_CLIENT,
            useFactory: (options) => {
                const clients = new Map();
                if (Array.isArray(options)) {
                    options.forEach((op) => {
                        var _a;
                        const name = (_a = op.name) !== null && _a !== void 0 ? _a : redis_constants_1.REDIS_DEFAULT_CLIENT_KEY;
                        if (clients.has(name)) {
                            throw new Error('Redis Init Error: name must unique');
                        }
                        clients.set(name, this.createClient(op));
                    });
                }
                else {
                    clients.set(redis_constants_1.REDIS_DEFAULT_CLIENT_KEY, this.createClient(options));
                }
                return clients;
            },
            inject: [redis_constants_1.REDIS_MODULE_OPTIONS],
        };
    }
    static createClient(options) {
        const { onClientReady, url, cluster, clusterOptions, nodes } = options, opts = __rest(options, ["onClientReady", "url", "cluster", "clusterOptions", "nodes"]);
        let client = null;
        if (!(0, lodash_1.isEmpty)(url)) {
            client = new ioredis_1.default(url);
        }
        else if (cluster) {
            client = new ioredis_1.default.Cluster(nodes, clusterOptions);
        }
        else {
            client = new ioredis_1.default(opts);
        }
        if (onClientReady) {
            onClientReady(client);
        }
        return client;
    }
    static createAsyncClientOptions(options) {
        return {
            provide: redis_constants_1.REDIS_MODULE_OPTIONS,
            useFactory: options.useFactory,
            inject: options.inject,
        };
    }
    onModuleDestroy() {
    }
};
RedisModule = RedisModule_1 = __decorate([
    (0, common_1.Module)({})
], RedisModule);
exports.RedisModule = RedisModule;
//# sourceMappingURL=redis.module.js.map