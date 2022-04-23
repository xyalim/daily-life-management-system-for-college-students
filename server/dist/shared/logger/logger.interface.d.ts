import { ModuleMetadata } from '@nestjs/common';
import { LoggerOptions } from 'typeorm';
export declare type WinstonLogLevel = 'info' | 'error' | 'warn' | 'debug' | 'verbose';
export interface TypeORMLoggerOptions {
    options?: LoggerOptions;
}
export interface LoggerModuleOptions {
    level?: WinstonLogLevel | 'none';
    consoleLevel?: WinstonLogLevel | 'none';
    timestamp?: boolean;
    disableConsoleAtProd?: boolean;
    maxFileSize?: string;
    maxFiles?: string;
    dir?: string;
    errorLogName?: string;
    appLogName?: string;
}
export interface LoggerModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory?: (...args: any[]) => LoggerModuleOptions;
    inject?: any[];
}
