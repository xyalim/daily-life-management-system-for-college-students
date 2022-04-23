import { IQiniuConfig } from '../../admin.interface';
import { CountInfo, FlowInfo, HitInfo, SpaceInfo } from './overview.class';
import { HttpService } from '@nestjs/axios';
export declare class NetDiskOverviewService {
    private qiniuConfig;
    private readonly httpService;
    private mac;
    private readonly FORMAT;
    constructor(qiniuConfig: IQiniuConfig, httpService: HttpService);
    getZeroHourToDay(current: Date): Date;
    getZeroHourAnd1Day(current: Date): Date;
    getSpace(start: Date, end?: Date): Promise<SpaceInfo>;
    getCount(start: Date, end?: Date): Promise<CountInfo>;
    getFlow(start: Date, end?: Date): Promise<FlowInfo>;
    getHit(start: Date, end?: Date): Promise<HitInfo>;
}
