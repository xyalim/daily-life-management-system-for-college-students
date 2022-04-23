import { BaseEntity } from '../base.entity';
export default class SysRoleDepartment extends BaseEntity {
    id: number;
    roleId: number;
    departmentId: number;
}
