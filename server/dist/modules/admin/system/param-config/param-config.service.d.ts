import SysConfig from 'src/entities/admin/sys-config.entity';
import { Repository } from 'typeorm';
import { CreateParamConfigDto, UpdateParamConfigDto } from './param-config.dto';
export declare class SysParamConfigService {
    private configRepository;
    constructor(configRepository: Repository<SysConfig>);
    getConfigListByPage(page: number, count: number): Promise<SysConfig[]>;
    countConfigList(): Promise<number>;
    add(dto: CreateParamConfigDto): Promise<void>;
    update(dto: UpdateParamConfigDto): Promise<void>;
    delete(ids: number[]): Promise<void>;
    findOne(id: number): Promise<SysConfig>;
    isExistKey(key: string): Promise<void | never>;
    findValueByKey(key: string): Promise<string | null>;
}
