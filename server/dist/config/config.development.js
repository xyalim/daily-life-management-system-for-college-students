"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qiniu = require("qiniu");
exports.default = {
    rootRoleId: 1,
    jwt: {
        secret: process.env.JWT_SECRET || '123456',
    },
    database: {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: '123',
        database: 'my-admin',
        synchronize: false,
        logging: false,
    },
    redis: {
        host: '127.0.0.1',
        port: 6379,
        db: 0,
    },
    qiniu: {
        accessKey: 'xxx',
        secretKey: 'xxx',
        domain: 'xxx',
        bucket: 'xxx',
        zone: qiniu.zone.Zone_z0,
        access: 'public',
    },
};
//# sourceMappingURL=config.development.js.map