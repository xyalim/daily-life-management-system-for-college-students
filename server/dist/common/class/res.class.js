"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageResult = exports.Pagination = exports.ResOp = void 0;
class ResOp {
    constructor(code, data, message = 'success') {
        this.code = code;
        this.data = data;
        this.message = message;
    }
    static success(data) {
        return new ResOp(200, data);
    }
}
exports.ResOp = ResOp;
class Pagination {
}
exports.Pagination = Pagination;
class PageResult {
}
exports.PageResult = PageResult;
//# sourceMappingURL=res.class.js.map