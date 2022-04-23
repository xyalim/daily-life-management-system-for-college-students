"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const config_default_1 = require("./config.default");
exports.default = () => {
    let envConfig = {};
    try {
        envConfig = require(`./config.${process.env.NODE_ENV}`).default;
    }
    catch (e) {
    }
    return (0, lodash_1.merge)(config_default_1.default, envConfig);
};
//# sourceMappingURL=configuration.js.map