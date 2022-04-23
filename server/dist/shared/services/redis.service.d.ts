/// <reference types="node" />
import { Cluster } from 'cluster';
import { Redis } from 'ioredis';
export declare class RedisService {
    private readonly clients;
    constructor(clients: Map<string, Redis | Cluster>);
    getRedis(name?: string): Redis;
}
