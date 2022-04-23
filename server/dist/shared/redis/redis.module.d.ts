import { DynamicModule, OnModuleDestroy } from '@nestjs/common';
import { RedisModuleAsyncOptions, RedisModuleOptions } from './redis.interface';
export declare class RedisModule implements OnModuleDestroy {
    static register(options: RedisModuleOptions | RedisModuleOptions[]): DynamicModule;
    static registerAsync(options: RedisModuleAsyncOptions): DynamicModule;
    private static createAysncProvider;
    private static createClient;
    private static createAsyncClientOptions;
    onModuleDestroy(): void;
}
