import { FastifyRequest } from 'fastify';
export declare class UtilService {
    getReqIP(req: FastifyRequest): string;
    aesEncrypt(msg: string, secret: string): string;
    aesDecrypt(encrypted: string, secret: string): string;
    md5(msg: string): string;
    generateUUID(): string;
    generateRandomValue(length: number, placeholder?: string): string;
}
