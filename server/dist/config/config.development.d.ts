import * as qiniu from 'qiniu';
declare const _default: {
    rootRoleId: number;
    jwt: {
        secret: string;
    };
    database: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        synchronize: boolean;
        logging: boolean;
    };
    redis: {
        host: string;
        port: number;
        db: number;
    };
    qiniu: {
        accessKey: string;
        secretKey: string;
        domain: string;
        bucket: string;
        zone: qiniu.conf.Zone;
        access: string;
    };
};
export default _default;
