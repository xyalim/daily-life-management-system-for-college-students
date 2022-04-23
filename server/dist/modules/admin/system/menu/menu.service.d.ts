import SysMenu from 'src/entities/admin/sys-menu.entity';
import { Repository } from 'typeorm';
import { SysRoleService } from '../role/role.service';
import { MenuItemAndParentInfoResult } from './menu.class';
import { CreateMenuDto } from './menu.dto';
import { RedisService } from 'src/shared/services/redis.service';
export declare class SysMenuService {
    private menuRepository;
    private redisService;
    private rootRoleId;
    private roleService;
    constructor(menuRepository: Repository<SysMenu>, redisService: RedisService, rootRoleId: number, roleService: SysRoleService);
    list(): Promise<SysMenu[]>;
    save(menu: CreateMenuDto & {
        id?: number;
    }): Promise<void>;
    getMenus(uid: number): Promise<SysMenu[]>;
    check(dto: CreateMenuDto): Promise<void | never>;
    findChildMenus(mid: number): Promise<any>;
    getMenuItemInfo(mid: number): Promise<SysMenu>;
    getMenuItemAndParentInfo(mid: number): Promise<MenuItemAndParentInfoResult>;
    findRouterExist(router: string): Promise<boolean>;
    getPerms(uid: number): Promise<string[]>;
    deleteMenuItem(mids: number[]): Promise<void>;
    refreshPerms(uid: number): Promise<void>;
    refreshOnlineUserPerms(): Promise<void>;
}
