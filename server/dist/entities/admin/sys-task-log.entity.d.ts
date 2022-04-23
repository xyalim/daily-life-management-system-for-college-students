import { BaseEntity } from '../base.entity';
export default class SysTaskLog extends BaseEntity {
    id: number;
    taskId: number;
    status: number;
    detail: string;
    consumeTime: number;
}
