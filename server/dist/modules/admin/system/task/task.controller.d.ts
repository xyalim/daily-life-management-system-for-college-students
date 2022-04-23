import { PageResult } from 'src/common/class/res.class';
import { PageOptionsDto } from 'src/common/dto/page.dto';
import SysTask from 'src/entities/admin/sys-task.entity';
import { CheckIdTaskDto, CreateTaskDto, UpdateTaskDto } from './task.dto';
import { SysTaskService } from './task.service';
export declare class SysTaskController {
    private taskService;
    constructor(taskService: SysTaskService);
    page(dto: PageOptionsDto): Promise<PageResult<SysTask>>;
    add(dto: CreateTaskDto): Promise<void>;
    update(dto: UpdateTaskDto): Promise<void>;
    info(dto: CheckIdTaskDto): Promise<SysTask>;
    once(dto: CheckIdTaskDto): Promise<void>;
    stop(dto: CheckIdTaskDto): Promise<void>;
    start(dto: CheckIdTaskDto): Promise<void>;
    delete(dto: CheckIdTaskDto): Promise<void>;
}
