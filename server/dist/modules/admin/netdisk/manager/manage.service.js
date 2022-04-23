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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetDiskManageService = void 0;
const common_1 = require("@nestjs/common");
const admin_constants_1 = require("../../admin.constants");
const qiniu = require("qiniu");
const util_service_1 = require("../../../../shared/services/util.service");
const lodash_1 = require("lodash");
const user_service_1 = require("../../system/user/user.service");
const path_1 = require("path");
let NetDiskManageService = class NetDiskManageService {
    constructor(qiniuConfig, userService, util) {
        this.qiniuConfig = qiniuConfig;
        this.userService = userService;
        this.util = util;
        this.mac = new qiniu.auth.digest.Mac(this.qiniuConfig.accessKey, this.qiniuConfig.secretKey);
        this.config = new qiniu.conf.Config({
            zone: this.qiniuConfig.zone,
        });
        this.bucketManager = new qiniu.rs.BucketManager(this.mac, this.config);
    }
    async getFileList(prefix = '', marker = '', skey = '') {
        const searching = !(0, lodash_1.isEmpty)(skey);
        return new Promise((resolve, reject) => {
            this.bucketManager.listPrefix(this.qiniuConfig.bucket, {
                prefix: searching ? '' : prefix,
                limit: admin_constants_1.NETDISK_LIMIT,
                delimiter: searching ? '' : admin_constants_1.NETDISK_DELIMITER,
                marker,
            }, (err, respBody, respInfo) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (respInfo.statusCode === 200) {
                    const fileList = [];
                    if (!searching && !(0, lodash_1.isEmpty)(respBody.commonPrefixes)) {
                        for (const dirPath of respBody.commonPrefixes) {
                            const name = dirPath
                                .substr(0, dirPath.length - 1)
                                .replace(prefix, '');
                            if ((0, lodash_1.isEmpty)(skey) || name.includes(skey)) {
                                fileList.push({
                                    name: dirPath
                                        .substr(0, dirPath.length - 1)
                                        .replace(prefix, ''),
                                    type: 'dir',
                                    id: this.util.generateRandomValue(10),
                                });
                            }
                        }
                    }
                    if (!(0, lodash_1.isEmpty)(respBody.items)) {
                        for (const item of respBody.items) {
                            if (searching) {
                                const pathList = item.key.split(admin_constants_1.NETDISK_DELIMITER);
                                const name = pathList.pop();
                                if (item.key.endsWith(admin_constants_1.NETDISK_DELIMITER) &&
                                    pathList[pathList.length - 1].includes(skey)) {
                                    const ditName = pathList.pop();
                                    fileList.push({
                                        id: this.util.generateRandomValue(10),
                                        name: ditName,
                                        type: 'dir',
                                        belongTo: pathList.join(admin_constants_1.NETDISK_DELIMITER),
                                    });
                                }
                                else if (name.includes(skey)) {
                                    fileList.push({
                                        id: this.util.generateRandomValue(10),
                                        name,
                                        type: 'file',
                                        fsize: item.fsize,
                                        mimeType: item.mimeType,
                                        putTime: new Date(parseInt(item.putTime) / 10000),
                                        belongTo: pathList.join(admin_constants_1.NETDISK_DELIMITER),
                                    });
                                }
                            }
                            else {
                                const fileKey = item.key.replace(prefix, '');
                                if (!(0, lodash_1.isEmpty)(fileKey)) {
                                    fileList.push({
                                        id: this.util.generateRandomValue(10),
                                        name: fileKey,
                                        type: 'file',
                                        fsize: item.fsize,
                                        mimeType: item.mimeType,
                                        putTime: new Date(parseInt(item.putTime) / 10000),
                                    });
                                }
                            }
                        }
                    }
                    resolve({
                        list: fileList,
                        marker: respBody.marker || null,
                    });
                }
                else {
                    reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                }
            });
        });
    }
    async getFileInfo(name, path) {
        return new Promise((resolve, reject) => {
            this.bucketManager.stat(this.qiniuConfig.bucket, `${path}${name}`, (err, respBody, respInfo) => {
                var _a, _b;
                if (err) {
                    reject(err);
                    return;
                }
                if (respInfo.statusCode == 200) {
                    const detailInfo = {
                        fsize: respBody.fsize,
                        hash: respBody.hash,
                        md5: respBody.md5,
                        mimeType: respBody.mimeType.split('/x-qn-meta')[0],
                        putTime: new Date(parseInt(respBody.putTime) / 10000),
                        type: respBody.type,
                        uploader: '',
                        mark: (_b = (_a = respBody === null || respBody === void 0 ? void 0 : respBody['x-qn-meta']) === null || _a === void 0 ? void 0 : _a['!mark']) !== null && _b !== void 0 ? _b : '',
                    };
                    if (!respBody.endUser) {
                        resolve(detailInfo);
                    }
                    else {
                        this.userService
                            .getAccountInfo(parseInt(respBody.endUser))
                            .then((user) => {
                            if ((0, lodash_1.isEmpty)(user)) {
                                resolve(detailInfo);
                            }
                            else {
                                detailInfo.uploader = user.name;
                                resolve(detailInfo);
                            }
                        });
                    }
                }
                else {
                    reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                }
            });
        });
    }
    async changeFileHeaders(name, path, headers) {
        return new Promise((resolve, reject) => {
            this.bucketManager.changeHeaders(this.qiniuConfig.bucket, `${path}${name}`, headers, (err, _, respInfo) => {
                if (err) {
                    reject();
                    return;
                }
                if (respInfo.statusCode == 200) {
                    resolve();
                }
                else {
                    reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                }
            });
        });
    }
    async createDir(dirName) {
        const safeDirName = dirName.endsWith('/') ? dirName : `${dirName}/`;
        return new Promise((resolve, reject) => {
            const formUploader = new qiniu.form_up.FormUploader(this.config);
            const putExtra = new qiniu.form_up.PutExtra();
            formUploader.put(this.createUploadToken(''), safeDirName, ' ', putExtra, (respErr, respBody, respInfo) => {
                if (respErr) {
                    reject(respErr);
                    return;
                }
                if (respInfo.statusCode === 200) {
                    resolve();
                }
                else {
                    reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                }
            });
        });
    }
    async checkFileExist(filePath) {
        return new Promise((resolve, reject) => {
            this.bucketManager.stat(this.qiniuConfig.bucket, filePath, (respErr, respBody, respInfo) => {
                if (respErr) {
                    reject(respErr);
                    return;
                }
                if (respInfo.statusCode === 200) {
                    resolve(true);
                }
                else if (respInfo.statusCode === 612) {
                    resolve(false);
                }
                else {
                    reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                }
            });
        });
    }
    createUploadToken(endUser) {
        const policy = new qiniu.rs.PutPolicy({
            scope: this.qiniuConfig.bucket,
            insertOnly: 1,
            endUser,
        });
        const uploadToken = policy.uploadToken(this.mac);
        return uploadToken;
    }
    async renameFile(dir, name, toName) {
        const fileName = `${dir}${name}`;
        const toFileName = `${dir}${toName}`;
        const op = {
            force: true,
        };
        return new Promise((resolve, reject) => {
            this.bucketManager.move(this.qiniuConfig.bucket, fileName, this.qiniuConfig.bucket, toFileName, op, (err, respBody, respInfo) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (respInfo.statusCode === 200) {
                        resolve();
                    }
                    else {
                        reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                    }
                }
            });
        });
    }
    async moveFile(dir, toDir, name) {
        const fileName = `${dir}${name}`;
        const toFileName = `${toDir}${name}`;
        const op = {
            force: true,
        };
        return new Promise((resolve, reject) => {
            this.bucketManager.move(this.qiniuConfig.bucket, fileName, this.qiniuConfig.bucket, toFileName, op, (err, respBody, respInfo) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (respInfo.statusCode === 200) {
                        resolve();
                    }
                    else {
                        reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                    }
                }
            });
        });
    }
    async copyFile(dir, toDir, name) {
        const fileName = `${dir}${name}`;
        const ext = (0, path_1.extname)(name);
        const bn = (0, path_1.basename)(name, ext);
        const toFileName = `${toDir}${bn}${admin_constants_1.NETDISK_COPY_SUFFIX}${ext}`;
        const op = {
            force: true,
        };
        return new Promise((resolve, reject) => {
            this.bucketManager.copy(this.qiniuConfig.bucket, fileName, this.qiniuConfig.bucket, toFileName, op, (err, respBody, respInfo) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (respInfo.statusCode === 200) {
                        resolve();
                    }
                    else {
                        reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                    }
                }
            });
        });
    }
    async renameDir(path, name, toName) {
        const dirName = `${path}${name}`;
        const toDirName = `${path}${toName}`;
        let hasFile = true;
        let marker = '';
        const op = {
            force: true,
        };
        const bucketName = this.qiniuConfig.bucket;
        while (hasFile) {
            await new Promise((resolve, reject) => {
                this.bucketManager.listPrefix(this.qiniuConfig.bucket, {
                    prefix: dirName,
                    limit: admin_constants_1.NETDISK_HANDLE_MAX_ITEM,
                    marker,
                }, (err, respBody, respInfo) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (respInfo.statusCode === 200) {
                        const moveOperations = respBody.items.map((item) => {
                            const { key } = item;
                            const destKey = key.replace(dirName, toDirName);
                            return qiniu.rs.moveOp(bucketName, key, bucketName, destKey, op);
                        });
                        this.bucketManager.batch(moveOperations, (err2, respBody2, respInfo2) => {
                            if (err2) {
                                reject(err2);
                                return;
                            }
                            if (respInfo2.statusCode === 200) {
                                if ((0, lodash_1.isEmpty)(respBody.marker)) {
                                    hasFile = false;
                                }
                                else {
                                    marker = respBody.marker;
                                }
                                resolve();
                            }
                            else {
                                reject(new Error(`Qiniu Error Code: ${respInfo2.statusCode}, Info: ${respInfo2.statusMessage}`));
                            }
                        });
                    }
                    else {
                        reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                    }
                });
            });
        }
    }
    getDownloadLink(key) {
        if (this.qiniuConfig.access === 'public') {
            return this.bucketManager.publicDownloadUrl(this.qiniuConfig.domain, key);
        }
        else if (this.qiniuConfig.access === 'private') {
            return this.bucketManager.privateDownloadUrl(this.qiniuConfig.domain, key, Date.now() / 1000 + 36000);
        }
        throw new Error('qiniu config access type not support');
    }
    async deleteFile(dir, name) {
        return new Promise((resolve, reject) => {
            this.bucketManager.delete(this.qiniuConfig.bucket, `${dir}${name}`, (err, respBody, respInfo) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (respInfo.statusCode === 200) {
                    resolve();
                }
                else {
                    reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                }
            });
        });
    }
    async deleteMultiFileOrDir(fileList, dir) {
        const files = fileList.filter((item) => item.type === 'file');
        if (files.length > 0) {
            const copyOperations = files.map((item) => {
                const fileName = `${dir}${item.name}`;
                return qiniu.rs.deleteOp(this.qiniuConfig.bucket, fileName);
            });
            await new Promise((resolve, reject) => {
                this.bucketManager.batch(copyOperations, (err, respBody, respInfo) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (respInfo.statusCode === 200) {
                        resolve();
                    }
                    else if (respInfo.statusCode === 298) {
                        reject(new Error('操作异常，但部分文件夹删除成功'));
                    }
                    else {
                        reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                    }
                });
            });
        }
        const dirs = fileList.filter((item) => item.type === 'dir');
        if (dirs.length > 0) {
            for (let i = 0; i < dirs.length; i++) {
                const dirName = `${dir}${dirs[i].name}/`;
                let hasFile = true;
                let marker = '';
                while (hasFile) {
                    await new Promise((resolve, reject) => {
                        this.bucketManager.listPrefix(this.qiniuConfig.bucket, {
                            prefix: dirName,
                            limit: admin_constants_1.NETDISK_HANDLE_MAX_ITEM,
                            marker,
                        }, (err, respBody, respInfo) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            if (respInfo.statusCode === 200) {
                                const moveOperations = respBody.items.map((item) => {
                                    const { key } = item;
                                    return qiniu.rs.deleteOp(this.qiniuConfig.bucket, key);
                                });
                                this.bucketManager.batch(moveOperations, (err2, respBody2, respInfo2) => {
                                    if (err2) {
                                        reject(err2);
                                        return;
                                    }
                                    if (respInfo2.statusCode === 200) {
                                        if ((0, lodash_1.isEmpty)(respBody.marker)) {
                                            hasFile = false;
                                        }
                                        else {
                                            marker = respBody.marker;
                                        }
                                        resolve();
                                    }
                                    else {
                                        reject(new Error(`Qiniu Error Code: ${respInfo2.statusCode}, Info: ${respInfo2.statusMessage}`));
                                    }
                                });
                            }
                            else {
                                reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                            }
                        });
                    });
                }
            }
        }
    }
    async copyMultiFileOrDir(fileList, dir, toDir) {
        const files = fileList.filter((item) => item.type === 'file');
        const op = {
            force: true,
        };
        if (files.length > 0) {
            const copyOperations = files.map((item) => {
                const fileName = `${dir}${item.name}`;
                const ext = (0, path_1.extname)(item.name);
                const bn = (0, path_1.basename)(item.name, ext);
                const toFileName = `${toDir}${bn}${admin_constants_1.NETDISK_COPY_SUFFIX}${ext}`;
                return qiniu.rs.copyOp(this.qiniuConfig.bucket, fileName, this.qiniuConfig.bucket, toFileName, op);
            });
            await new Promise((resolve, reject) => {
                this.bucketManager.batch(copyOperations, (err, respBody, respInfo) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (respInfo.statusCode === 200) {
                        resolve();
                    }
                    else if (respInfo.statusCode === 298) {
                        reject(new Error('操作异常，但部分文件夹删除成功'));
                    }
                    else {
                        reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                    }
                });
            });
        }
        const dirs = fileList.filter((item) => item.type === 'dir');
        if (dirs.length > 0) {
            for (let i = 0; i < dirs.length; i++) {
                const dirName = `${dir}${dirs[i].name}/`;
                const copyDirName = `${toDir}${dirs[i].name}${admin_constants_1.NETDISK_COPY_SUFFIX}/`;
                let hasFile = true;
                let marker = '';
                while (hasFile) {
                    await new Promise((resolve, reject) => {
                        this.bucketManager.listPrefix(this.qiniuConfig.bucket, {
                            prefix: dirName,
                            limit: admin_constants_1.NETDISK_HANDLE_MAX_ITEM,
                            marker,
                        }, (err, respBody, respInfo) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            if (respInfo.statusCode === 200) {
                                const moveOperations = respBody.items.map((item) => {
                                    const { key } = item;
                                    const destKey = key.replace(dirName, copyDirName);
                                    return qiniu.rs.copyOp(this.qiniuConfig.bucket, key, this.qiniuConfig.bucket, destKey, op);
                                });
                                this.bucketManager.batch(moveOperations, (err2, respBody2, respInfo2) => {
                                    if (err2) {
                                        reject(err2);
                                        return;
                                    }
                                    if (respInfo2.statusCode === 200) {
                                        if ((0, lodash_1.isEmpty)(respBody.marker)) {
                                            hasFile = false;
                                        }
                                        else {
                                            marker = respBody.marker;
                                        }
                                        resolve();
                                    }
                                    else {
                                        reject(new Error(`Qiniu Error Code: ${respInfo2.statusCode}, Info: ${respInfo2.statusMessage}`));
                                    }
                                });
                            }
                            else {
                                reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                            }
                        });
                    });
                }
            }
        }
    }
    async moveMultiFileOrDir(fileList, dir, toDir) {
        const files = fileList.filter((item) => item.type === 'file');
        const op = {
            force: true,
        };
        if (files.length > 0) {
            const copyOperations = files.map((item) => {
                const fileName = `${dir}${item.name}`;
                const toFileName = `${toDir}${item.name}`;
                return qiniu.rs.moveOp(this.qiniuConfig.bucket, fileName, this.qiniuConfig.bucket, toFileName, op);
            });
            await new Promise((resolve, reject) => {
                this.bucketManager.batch(copyOperations, (err, respBody, respInfo) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (respInfo.statusCode === 200) {
                        resolve();
                    }
                    else if (respInfo.statusCode === 298) {
                        reject(new Error('操作异常，但部分文件夹删除成功'));
                    }
                    else {
                        reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                    }
                });
            });
        }
        const dirs = fileList.filter((item) => item.type === 'dir');
        if (dirs.length > 0) {
            for (let i = 0; i < dirs.length; i++) {
                const dirName = `${dir}${dirs[i].name}/`;
                const toDirName = `${toDir}${dirs[i].name}/`;
                if (toDirName.startsWith(dirName)) {
                    continue;
                }
                let hasFile = true;
                let marker = '';
                while (hasFile) {
                    await new Promise((resolve, reject) => {
                        this.bucketManager.listPrefix(this.qiniuConfig.bucket, {
                            prefix: dirName,
                            limit: admin_constants_1.NETDISK_HANDLE_MAX_ITEM,
                            marker,
                        }, (err, respBody, respInfo) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            if (respInfo.statusCode === 200) {
                                const moveOperations = respBody.items.map((item) => {
                                    const { key } = item;
                                    const destKey = key.replace(dirName, toDirName);
                                    return qiniu.rs.moveOp(this.qiniuConfig.bucket, key, this.qiniuConfig.bucket, destKey, op);
                                });
                                this.bucketManager.batch(moveOperations, (err2, respBody2, respInfo2) => {
                                    if (err2) {
                                        reject(err2);
                                        return;
                                    }
                                    if (respInfo2.statusCode === 200) {
                                        if ((0, lodash_1.isEmpty)(respBody.marker)) {
                                            hasFile = false;
                                        }
                                        else {
                                            marker = respBody.marker;
                                        }
                                        resolve();
                                    }
                                    else {
                                        reject(new Error(`Qiniu Error Code: ${respInfo2.statusCode}, Info: ${respInfo2.statusMessage}`));
                                    }
                                });
                            }
                            else {
                                reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                            }
                        });
                    });
                }
            }
        }
    }
};
NetDiskManageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(admin_constants_1.QINIU_CONFIG)),
    __metadata("design:paramtypes", [Object, user_service_1.SysUserService,
        util_service_1.UtilService])
], NetDiskManageService);
exports.NetDiskManageService = NetDiskManageService;
//# sourceMappingURL=manage.service.js.map