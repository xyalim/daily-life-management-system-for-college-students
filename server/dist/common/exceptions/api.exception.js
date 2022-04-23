"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiException = void 0;
const common_1 = require("@nestjs/common");
const error_code_contants_1 = require("../contants/error-code.contants");
class ApiException extends common_1.HttpException {
    constructor(errorCode) {
        super(error_code_contants_1.ErrorCodeMap[errorCode], 200);
        this.errorCode = errorCode;
    }
    getErrorCode() {
        return this.errorCode;
    }
}
exports.ApiException = ApiException;
//# sourceMappingURL=api.exception.js.map