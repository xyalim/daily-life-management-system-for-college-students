import SysUser from 'src/entities/admin/sys-user.entity';
export declare class AccountInfo {
    name: string;
    nickName: string;
    email: string;
    phone: string;
    remark: string;
    headImg: string;
}
export declare class PageSearchUserInfo {
    createdAt: string;
    departmentId: number;
    email: string;
    headImg: string;
    id: number;
    name: string;
    nickName: string;
    phone: string;
    remark: string;
    status: number;
    updatedAt: string;
    username: string;
    departmentName: string;
    roleNames: string[];
}
export declare class UserDetailInfo extends SysUser {
    roles: number[];
    departmentName: string;
}
