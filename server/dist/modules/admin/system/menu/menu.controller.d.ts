import SysMenu from 'src/entities/admin/sys-menu.entity';
import { IAdminUser } from '../../admin.interface';
import { MenuItemAndParentInfoResult } from './menu.class';
import { CreateMenuDto, DeleteMenuDto, InfoMenuDto, UpdateMenuDto } from './menu.dto';
import { SysMenuService } from './menu.service';
export declare class SysMenuController {
    private menuService;
    constructor(menuService: SysMenuService);
    list(user: IAdminUser): Promise<SysMenu[]>;
    add(dto: CreateMenuDto): Promise<void>;
    update(dto: UpdateMenuDto): Promise<void>;
    delete(dto: DeleteMenuDto): Promise<void>;
    info(dto: InfoMenuDto): Promise<MenuItemAndParentInfoResult>;
}
