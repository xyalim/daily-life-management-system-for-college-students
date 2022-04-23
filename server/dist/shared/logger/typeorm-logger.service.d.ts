import { Logger, LoggerOptions } from 'typeorm';
import { LoggerModuleOptions } from './logger.interface';
export declare class TypeORMLoggerService implements Logger {
    private options;
    private config;
    private logger;
    constructor(options: LoggerOptions, config: LoggerModuleOptions);
    logQuery(query: string, parameters?: any[]): void;
    logQueryError(error: string | Error, query: string, parameters?: any[]): void;
    logQuerySlow(time: number, query: string, parameters?: any[]): void;
    logSchemaBuild(message: string): void;
    logMigration(message: string): void;
    log(level: 'log' | 'info' | 'warn', message: any): void;
    protected stringifyParams(parameters: any[]): string | any[];
}
