import { BaseEntity } from '../base.entity';
export default class SysUserRole extends BaseEntity {
    id: number;
    userId: number;
    roleId: number;
}
