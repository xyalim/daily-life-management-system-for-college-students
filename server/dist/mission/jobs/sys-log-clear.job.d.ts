import { SysLogService } from 'src/modules/admin/system/log/log.service';
export declare class SysLogClearJob {
    private sysLogService;
    constructor(sysLogService: SysLogService);
    clearLoginLog(): Promise<void>;
    clearTaskLog(): Promise<void>;
}
