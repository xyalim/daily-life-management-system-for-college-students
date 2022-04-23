"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilService = void 0;
const common_1 = require("@nestjs/common");
const nanoid_1 = require("nanoid");
const CryptoJS = require("crypto-js");
let UtilService = class UtilService {
    getReqIP(req) {
        return ((req.headers['x-forwarded-for'] ||
            req.socket.remoteAddress).replace('::ffff:', ''));
    }
    aesEncrypt(msg, secret) {
        return CryptoJS.AES.encrypt(msg, secret).toString();
    }
    aesDecrypt(encrypted, secret) {
        return CryptoJS.AES.decrypt(encrypted, secret).toString(CryptoJS.enc.Utf8);
    }
    md5(msg) {
        return CryptoJS.MD5(msg).toString();
    }
    generateUUID() {
        return (0, nanoid_1.nanoid)();
    }
    generateRandomValue(length, placeholder = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM') {
        const customNanoid = (0, nanoid_1.customAlphabet)(placeholder, length);
        return customNanoid();
    }
};
UtilService = __decorate([
    (0, common_1.Injectable)()
], UtilService);
exports.UtilService = UtilService;
//# sourceMappingURL=util.service.js.map