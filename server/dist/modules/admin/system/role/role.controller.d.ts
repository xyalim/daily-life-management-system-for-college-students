import { PageOptionsDto } from 'src/common/dto/page.dto';
import { PageResult } from 'src/common/class/res.class';
import SysRole from 'src/entities/admin/sys-role.entity';
import { SysRoleService } from './role.service';
import { CreateRoleDto, DeleteRoleDto, InfoRoleDto, UpdateRoleDto } from './role.dto';
import { IAdminUser } from '../../admin.interface';
import { RoleInfo } from './role.class';
import { SysMenuService } from '../menu/menu.service';
export declare class SysRoleController {
    private roleService;
    private menuService;
    constructor(roleService: SysRoleService, menuService: SysMenuService);
    list(): Promise<SysRole[]>;
    page(dto: PageOptionsDto): Promise<PageResult<SysRole>>;
    delete(dto: DeleteRoleDto): Promise<void>;
    add(dto: CreateRoleDto, user: IAdminUser): Promise<void>;
    update(dto: UpdateRoleDto): Promise<void>;
    info(dto: InfoRoleDto): Promise<RoleInfo>;
}
