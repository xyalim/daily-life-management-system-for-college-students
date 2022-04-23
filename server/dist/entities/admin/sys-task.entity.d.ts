import { BaseEntity } from '../base.entity';
export default class SysTask extends BaseEntity {
    id: number;
    name: string;
    service: string;
    type: number;
    status: number;
    startTime: Date;
    endTime: Date;
    limit: number;
    cron: string;
    every: number;
    data: string;
    jobOpts: string;
    remark: string;
}
