"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketException = void 0;
const websockets_1 = require("@nestjs/websockets");
const error_code_contants_1 = require("../contants/error-code.contants");
class SocketException extends websockets_1.WsException {
    constructor(errorCode) {
        super(error_code_contants_1.ErrorCodeMap[errorCode]);
        this.errorCode = errorCode;
    }
    getErrorCode() {
        return this.errorCode;
    }
}
exports.SocketException = SocketException;
//# sourceMappingURL=socket.exception.js.map