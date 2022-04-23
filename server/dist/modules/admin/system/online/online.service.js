"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SysOnlineService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const api_exception_1 = require("../../../../common/exceptions/api.exception");
const admin_ws_gateway_1 = require("../../../ws/admin-ws.gateway");
const ws_event_1 = require("../../../ws/ws.event");
const typeorm_2 = require("typeorm");
const ua_parser_js_1 = require("ua-parser-js");
const user_service_1 = require("../user/user.service");
let SysOnlineService = class SysOnlineService {
    constructor(entityManager, userService, adminWsGateWay, jwtService) {
        this.entityManager = entityManager;
        this.userService = userService;
        this.adminWsGateWay = adminWsGateWay;
        this.jwtService = jwtService;
    }
    async listOnlineUser(currentUid) {
        const onlineSockets = await this.adminWsGateWay.socketServer.fetchSockets();
        if (!onlineSockets || onlineSockets.length <= 0) {
            return [];
        }
        const onlineIds = onlineSockets.map((socket) => {
            var _a;
            const token = (_a = socket.handshake.query) === null || _a === void 0 ? void 0 : _a.token;
            return this.jwtService.verify(token).uid;
        });
        return await this.findLastLoginInfoList(onlineIds, currentUid);
    }
    async kickUser(uid, currentUid) {
        const rootUserId = await this.userService.findRootUserId();
        const currentUserInfo = await this.userService.getAccountInfo(currentUid);
        if (uid === rootUserId) {
            throw new api_exception_1.ApiException(10013);
        }
        await this.userService.forbidden(uid);
        const socket = await this.findSocketIdByUid(uid);
        if (socket) {
            this.adminWsGateWay.socketServer
                .to(socket.id)
                .emit(ws_event_1.EVENT_KICK, { operater: currentUserInfo.name });
            socket.disconnect();
        }
    }
    async findSocketIdByUid(uid) {
        const onlineSockets = await this.adminWsGateWay.socketServer.fetchSockets();
        const socket = onlineSockets.find((socket) => {
            var _a;
            const token = (_a = socket.handshake.query) === null || _a === void 0 ? void 0 : _a.token;
            const tokenUid = this.jwtService.verify(token).uid;
            return tokenUid === uid;
        });
        return socket;
    }
    async findLastLoginInfoList(ids, currentUid) {
        const rootUserId = await this.userService.findRootUserId();
        const result = await this.entityManager.query(`
      SELECT sys_login_log.created_at, sys_login_log.ip, sys_login_log.ua, sys_user.id, sys_user.username, sys_user.name
        FROM sys_login_log 
        INNER JOIN sys_user ON sys_login_log.user_id = sys_user.id 
        WHERE sys_login_log.created_at IN (SELECT MAX(created_at) as createdAt FROM sys_login_log GROUP BY user_id)
          AND sys_user.id IN (?)
      `, [ids]);
        if (result) {
            const parser = new ua_parser_js_1.UAParser();
            return result.map((e) => {
                const u = parser.setUA(e.ua).getResult();
                return {
                    id: e.id,
                    ip: e.ip,
                    username: `${e.name}（${e.username}）`,
                    isCurrent: currentUid === e.id,
                    time: e.created_at,
                    os: `${u.os.name} ${u.os.version}`,
                    browser: `${u.browser.name} ${u.browser.version}`,
                    disable: currentUid === e.id || e.id === rootUserId,
                };
            });
        }
        return [];
    }
};
SysOnlineService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectEntityManager)()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager,
        user_service_1.SysUserService,
        admin_ws_gateway_1.AdminWSGateway,
        jwt_1.JwtService])
], SysOnlineService);
exports.SysOnlineService = SysOnlineService;
//# sourceMappingURL=online.service.js.map