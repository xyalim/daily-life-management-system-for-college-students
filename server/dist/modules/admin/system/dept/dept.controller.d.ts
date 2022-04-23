import SysDepartment from 'src/entities/admin/sys-department.entity';
import { DeptDetailInfo } from './dept.class';
import { CreateDeptDto, DeleteDeptDto, InfoDeptDto, MoveDeptDto, TransferDeptDto, UpdateDeptDto } from './dept.dto';
import { SysDeptService } from './dept.service';
export declare class SysDeptController {
    private deptService;
    constructor(deptService: SysDeptService);
    list(uid: number): Promise<SysDepartment[]>;
    add(createDeptDto: CreateDeptDto): Promise<void>;
    delete(deleteDeptDto: DeleteDeptDto): Promise<void>;
    info(infoDeptDto: InfoDeptDto): Promise<DeptDetailInfo>;
    update(updateDeptDto: UpdateDeptDto): Promise<void>;
    transfer(transferDeptDto: TransferDeptDto): Promise<void>;
    move(dto: MoveDeptDto): Promise<void>;
}
