"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHomedir = void 0;
const os = require("os");
function getHomedir() {
    if (process.env.MOCK_HOME_DIR)
        return process.env.MOCK_HOME_DIR;
    if (typeof os.userInfo === 'function') {
        try {
            const homedir = os.userInfo().homedir;
            if (homedir)
                return homedir;
        }
        catch (err) {
            if (err.code !== 'ENOENT')
                throw err;
        }
    }
    if (typeof os.homedir === 'function') {
        return os.homedir();
    }
    return process.env.HOME;
}
exports.getHomedir = getHomedir;
//# sourceMappingURL=home-dir.js.map