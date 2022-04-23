export declare class CreateMenuDto {
    type: number;
    parentId: number;
    name: string;
    orderNum: number;
    router: string;
    readonly isShow: boolean;
    readonly keepalive: boolean;
    icon: string;
    perms: string;
    viewPath: string;
}
export declare class UpdateMenuDto extends CreateMenuDto {
    menuId: number;
}
export declare class DeleteMenuDto {
    menuId: number;
}
export declare class InfoMenuDto {
    menuId: number;
}
