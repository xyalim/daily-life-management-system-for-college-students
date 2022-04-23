import { JwtService } from '@nestjs/jwt';
import { AdminWSGateway } from 'src/modules/ws/admin-ws.gateway';
import { EntityManager } from 'typeorm';
import { SysUserService } from '../user/user.service';
import { OnlineUserInfo } from './online.class';
import { RemoteSocket } from 'socket.io';
export declare class SysOnlineService {
    private entityManager;
    private userService;
    private adminWsGateWay;
    private jwtService;
    constructor(entityManager: EntityManager, userService: SysUserService, adminWsGateWay: AdminWSGateway, jwtService: JwtService);
    listOnlineUser(currentUid: number): Promise<OnlineUserInfo[]>;
    kickUser(uid: number, currentUid: number): Promise<void>;
    findSocketIdByUid(uid: number): Promise<RemoteSocket<any, any>>;
    findLastLoginInfoList(ids: number[], currentUid: number): Promise<OnlineUserInfo[]>;
}
