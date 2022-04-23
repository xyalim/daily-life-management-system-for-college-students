import { PageResult } from 'src/common/class/res.class';
import { PageOptionsDto } from 'src/common/dto/page.dto';
import SysConfig from 'src/entities/admin/sys-config.entity';
import { CreateParamConfigDto, DeleteParamConfigDto, InfoParamConfigDto, UpdateParamConfigDto } from './param-config.dto';
import { SysParamConfigService } from './param-config.service';
export declare class SysParamConfigController {
    private paramConfigService;
    constructor(paramConfigService: SysParamConfigService);
    page(dto: PageOptionsDto): Promise<PageResult<SysConfig>>;
    add(dto: CreateParamConfigDto): Promise<void>;
    info(dto: InfoParamConfigDto): Promise<SysConfig>;
    update(dto: UpdateParamConfigDto): Promise<void>;
    delete(dto: DeleteParamConfigDto): Promise<void>;
}
