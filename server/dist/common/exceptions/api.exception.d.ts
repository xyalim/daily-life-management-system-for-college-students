import { HttpException } from '@nestjs/common';
export declare class ApiException extends HttpException {
    private errorCode;
    constructor(errorCode: number);
    getErrorCode(): number;
}
