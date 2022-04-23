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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminWSGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const auth_service_1 = require("./auth.service");
const ws_event_1 = require("./ws.event");
let AdminWSGateway = class AdminWSGateway {
    constructor(authService) {
        this.authService = authService;
    }
    get socketServer() {
        return this.wss;
    }
    afterInit() {
    }
    async handleConnection(client) {
        var _a, _b;
        try {
            this.authService.checkAdminAuthToken((_b = (_a = client.handshake) === null || _a === void 0 ? void 0 : _a.query) === null || _b === void 0 ? void 0 : _b.token);
        }
        catch (e) {
            client.disconnect();
            return;
        }
        client.broadcast.emit(ws_event_1.EVENT_ONLINE);
    }
    async handleDisconnect(client) {
        client.broadcast.emit(ws_event_1.EVENT_OFFLINE);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AdminWSGateway.prototype, "wss", void 0);
AdminWSGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(parseInt(process.env.WS_PORT || '7002'), {
        path: '/ws',
        namespace: '/admin',
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AdminWSGateway);
exports.AdminWSGateway = AdminWSGateway;
//# sourceMappingURL=admin-ws.gateway.js.map