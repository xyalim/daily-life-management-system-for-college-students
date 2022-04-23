import { PageResult } from 'src/common/class/res.class';
import { IAdminUser } from '../../admin.interface';
import { CreateUserDto, DeleteUserDto, InfoUserDto, PageSearchUserDto, PasswordUserDto, UpdateUserDto } from './user.dto';
import { PageSearchUserInfo, UserDetailInfo } from './user.class';
import { SysUserService } from './user.service';
import { SysMenuService } from '../menu/menu.service';
export declare class SysUserController {
    private userService;
    private menuService;
    constructor(userService: SysUserService, menuService: SysMenuService);
    add(dto: CreateUserDto): Promise<void>;
    info(dto: InfoUserDto): Promise<UserDetailInfo>;
    delete(dto: DeleteUserDto): Promise<void>;
    page(dto: PageSearchUserDto, user: IAdminUser): Promise<PageResult<PageSearchUserInfo>>;
    update(dto: UpdateUserDto): Promise<void>;
    password(dto: PasswordUserDto): Promise<void>;
}
