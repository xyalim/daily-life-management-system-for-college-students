"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppRootPath = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
function getAppRootPath() {
    if (process.env.APP_ROOT_PATH) {
        return (0, path_1.resolve)(process.env.APP_ROOT_PATH);
    }
    let cur = __dirname;
    const root = (0, path_1.parse)(cur).root;
    let appRootPath = '';
    while (true) {
        if ((0, fs_1.existsSync)((0, path_1.join)(cur, 'node_modules')) &&
            (0, fs_1.existsSync)((0, path_1.join)(cur, 'package.json'))) {
            appRootPath = cur;
        }
        if (root === cur) {
            break;
        }
        cur = (0, path_1.resolve)(cur, '..');
    }
    if (appRootPath) {
        process.env.APP_ROOT_PATH = appRootPath;
    }
    return appRootPath;
}
exports.getAppRootPath = getAppRootPath;
//# sourceMappingURL=app-root-path.util.js.map