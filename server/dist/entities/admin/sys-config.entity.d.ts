import { BaseEntity } from '../base.entity';
export default class SysConfig extends BaseEntity {
    id: number;
    key: string;
    name: string;
    value: string;
    remark: string;
}
