import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from './auth.service';
export declare class AdminWSGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    private authService;
    private wss;
    get socketServer(): Server;
    constructor(authService: AuthService);
    afterInit(): void;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
}
