import SysMenu from 'src/entities/admin/sys-menu.entity';
export declare class ImageCaptcha {
    img: string;
    id: string;
}
export declare class LoginToken {
    token: string;
}
export declare class PermMenuInfo {
    menus: SysMenu[];
    perms: string[];
}
