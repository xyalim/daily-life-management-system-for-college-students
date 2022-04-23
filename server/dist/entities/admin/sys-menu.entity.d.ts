import { BaseEntity } from '../base.entity';
export default class SysMenu extends BaseEntity {
    id: number;
    parentId: number;
    name: string;
    router: string;
    perms: string;
    type: number;
    icon: string;
    orderNum: number;
    viewPath: string;
    keepalive: boolean;
    isShow: boolean;
}
