import { PageResult } from 'src/common/class/res.class';
import { PageOptionsDto } from 'src/common/dto/page.dto';
import { LoginLogInfo, TaskLogInfo } from './log.class';
import { SysLogService } from './log.service';
export declare class SysLogController {
    private logService;
    constructor(logService: SysLogService);
    loginLogPage(dto: PageOptionsDto): Promise<PageResult<LoginLogInfo>>;
    taskPage(dto: PageOptionsDto): Promise<PageResult<TaskLogInfo>>;
}
