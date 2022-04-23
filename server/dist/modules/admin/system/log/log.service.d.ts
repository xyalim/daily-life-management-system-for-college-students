import SysLoginLog from 'src/entities/admin/sys-login-log.entity';
import SysTaskLog from 'src/entities/admin/sys-task-log.entity';
import { Repository } from 'typeorm';
import { LoginLogInfo, TaskLogInfo } from './log.class';
export declare class SysLogService {
    private loginLogRepository;
    private taskLogRepository;
    constructor(loginLogRepository: Repository<SysLoginLog>, taskLogRepository: Repository<SysTaskLog>);
    saveLoginLog(uid: number, ip: string, ua: string): Promise<void>;
    countLoginLog(): Promise<number>;
    pageGetLoginLog(page: number, count: number): Promise<LoginLogInfo[]>;
    clearLoginLog(): Promise<void>;
    recordTaskLog(tid: number, status: number, time?: number, err?: string): Promise<number>;
    countTaskLog(): Promise<number>;
    page(page: number, count: number): Promise<TaskLogInfo[]>;
    clearTaskLog(): Promise<void>;
}
