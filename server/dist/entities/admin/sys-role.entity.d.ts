import { BaseEntity } from '../base.entity';
export default class SysRole extends BaseEntity {
    id: number;
    userId: string;
    name: string;
    label: string;
    remark: string;
}
