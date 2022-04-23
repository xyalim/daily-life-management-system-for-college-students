import { Job } from 'bull';
import { SysLogService } from '../log/log.service';
import { SysTaskService } from './task.service';
export interface ExecuteData {
    id: number;
    args?: string | null;
    service: string;
}
export declare class SysTaskConsumer {
    private taskService;
    private taskLogService;
    constructor(taskService: SysTaskService, taskLogService: SysLogService);
    handle(job: Job<ExecuteData>): Promise<void>;
    onCompleted(job: Job<ExecuteData>): void;
}
