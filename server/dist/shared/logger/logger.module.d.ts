import { DynamicModule } from '@nestjs/common';
import { LoggerModuleAsyncOptions, LoggerModuleOptions } from './logger.interface';
export declare class LoggerModule {
    static forRoot(options: LoggerModuleOptions, isGlobal?: boolean): DynamicModule;
    static forRootAsync(options: LoggerModuleAsyncOptions, isGlobal?: boolean): DynamicModule;
}
