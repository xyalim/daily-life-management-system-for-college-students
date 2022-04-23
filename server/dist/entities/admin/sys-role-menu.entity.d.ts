import { BaseEntity } from '../base.entity';
export default class SysRoleMenu extends BaseEntity {
    id: number;
    roleId: number;
    menuId: number;
}
