"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
Date.prototype.toJSON = function () {
    return (0, date_fns_1.format)(this, 'yyyy-MM-dd HH:mm:ss');
};
//# sourceMappingURL=polyfill.js.map