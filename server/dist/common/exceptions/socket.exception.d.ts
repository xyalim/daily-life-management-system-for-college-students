import { WsException } from '@nestjs/websockets';
export declare class SocketException extends WsException {
    private errorCode;
    constructor(errorCode: number);
    getErrorCode(): number;
}
