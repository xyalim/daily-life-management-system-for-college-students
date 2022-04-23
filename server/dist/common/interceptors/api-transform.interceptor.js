"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiTransformInterceptor = void 0;
const operators_1 = require("rxjs/operators");
const decorator_contants_1 = require("../contants/decorator.contants");
const res_class_1 = require("../class/res.class");
class ApiTransformInterceptor {
    constructor(reflector) {
        this.reflector = reflector;
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => {
            const keep = this.reflector.get(decorator_contants_1.TRANSFORM_KEEP_KEY_METADATA, context.getHandler());
            if (keep) {
                return data;
            }
            else {
                const response = context.switchToHttp().getResponse();
                response.header('Content-Type', 'application/json; charset=utf-8');
                return new res_class_1.ResOp(200, data);
            }
        }));
    }
}
exports.ApiTransformInterceptor = ApiTransformInterceptor;
//# sourceMappingURL=api-transform.interceptor.js.map