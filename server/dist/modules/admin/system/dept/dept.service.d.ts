import SysDepartment from 'src/entities/admin/sys-department.entity';
import SysUser from 'src/entities/admin/sys-user.entity';
import { EntityManager, Repository } from 'typeorm';
import { SysRoleService } from '../role/role.service';
import { DeptDetailInfo } from './dept.class';
import { MoveDept, UpdateDeptDto } from './dept.dto';
export declare class SysDeptService {
    private userRepositoty;
    private deptRepositoty;
    private roleDeptRepositoty;
    private entityManager;
    private rootRoleId;
    private roleService;
    constructor(userRepositoty: Repository<SysUser>, deptRepositoty: Repository<SysDepartment>, roleDeptRepositoty: Repository<SysUser>, entityManager: EntityManager, rootRoleId: number, roleService: SysRoleService);
    list(): Promise<SysDepartment[]>;
    info(id: number): Promise<DeptDetailInfo>;
    update(param: UpdateDeptDto): Promise<void>;
    transfer(userIds: number[], deptId: number): Promise<void>;
    add(deptName: string, parentDeptId: number): Promise<void>;
    move(depts: MoveDept[]): Promise<void>;
    delete(departmentId: number): Promise<void>;
    countUserByDeptId(id: number): Promise<number>;
    countRoleByDeptId(id: number): Promise<number>;
    countChildDept(id: number): Promise<number>;
    getDepts(uid: number): Promise<SysDepartment[]>;
}
