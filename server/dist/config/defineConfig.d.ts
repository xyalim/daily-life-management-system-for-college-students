import { conf } from 'qiniu';
import { LoggerModuleOptions as LoggerConfigOptions } from 'src/shared/logger/logger.interface';
import { LoggerOptions } from 'typeorm';
export declare function defineConfig(config: IConfig): IConfig;
export interface IConfig {
    rootRoleId?: number;
    jwt?: JwtConfigOptions;
    database?: DataBaseConfigOptions;
    redis?: RedisConfigOptions;
    qiniu?: QiniuConfigOptions;
    logger?: LoggerConfigOptions;
    swagger?: SwaggerConfigOptions;
}
export interface JwtConfigOptions {
    secret: string;
}
export interface QiniuConfigOptions {
    accessKey?: string;
    secretKey?: string;
    bucket?: string;
    zone?: conf.Zone;
    domain?: string;
    access?: string;
}
export interface RedisConfigOptions {
    host?: string;
    port?: number | string;
    password?: string;
    db?: number;
}
export interface DataBaseConfigOptions {
    type?: string;
    host?: string;
    port?: number | string;
    username?: string;
    password?: string;
    database?: string;
    synchronize?: boolean;
    logging?: LoggerOptions;
}
export interface SwaggerConfigOptions {
    enable?: boolean;
    path?: string;
    title?: string;
    desc?: string;
    version?: string;
}
