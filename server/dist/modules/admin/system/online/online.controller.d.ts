import { IAdminUser } from '../../admin.interface';
import { OnlineUserInfo } from './online.class';
import { KickDto } from './online.dto';
import { SysOnlineService } from './online.service';
export declare class SysOnlineController {
    private onlineService;
    constructor(onlineService: SysOnlineService);
    list(user: IAdminUser): Promise<OnlineUserInfo[]>;
    kick(dto: KickDto, user: IAdminUser): Promise<void>;
}
