import SysDepartment from 'src/entities/admin/sys-department.entity';
import SysUserRole from 'src/entities/admin/sys-user-role.entity';
import SysUser from 'src/entities/admin/sys-user.entity';
import { UtilService } from 'src/shared/services/util.service';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto, UpdatePasswordDto, UpdateUserDto, UpdateUserInfoDto } from './user.dto';
import { AccountInfo, PageSearchUserInfo } from './user.class';
import { RedisService } from 'src/shared/services/redis.service';
import { SysParamConfigService } from '../param-config/param-config.service';
export declare class SysUserService {
    private userRepository;
    private departmentRepository;
    private userRoleRepository;
    private redisService;
    private paramConfigService;
    private entityManager;
    private rootRoleId;
    private util;
    constructor(userRepository: Repository<SysUser>, departmentRepository: Repository<SysDepartment>, userRoleRepository: Repository<SysUserRole>, redisService: RedisService, paramConfigService: SysParamConfigService, entityManager: EntityManager, rootRoleId: number, util: UtilService);
    findUserByUserName(username: string): Promise<SysUser | undefined>;
    getAccountInfo(uid: number): Promise<AccountInfo>;
    updatePersonInfo(uid: number, info: UpdateUserInfoDto): Promise<void>;
    updatePassword(uid: number, dto: UpdatePasswordDto): Promise<void>;
    forceUpdatePassword(uid: number, password: string): Promise<void>;
    add(param: CreateUserDto): Promise<void>;
    update(param: UpdateUserDto): Promise<void>;
    info(id: number): Promise<SysUser & {
        roles: number[];
        departmentName: string;
    }>;
    infoList(ids: number[]): Promise<SysUser[]>;
    delete(userIds: number[]): Promise<void | never>;
    count(uid: number, deptIds: number[]): Promise<number>;
    findRootUserId(): Promise<number>;
    page(uid: number, deptIds: number[], page: number, count: number): Promise<PageSearchUserInfo[]>;
    forbidden(uid: number): Promise<void>;
    multiForbidden(uids: number[]): Promise<void>;
    upgradePasswordV(id: number): Promise<void>;
}
