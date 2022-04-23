import { BaseEntity } from '../base.entity';
export default class SysUser extends BaseEntity {
    id: number;
    departmentId: number;
    name: string;
    username: string;
    password: string;
    psalt: string;
    nickName: string;
    headImg: string;
    email: string;
    phone: string;
    remark: string;
    status: number;
}
