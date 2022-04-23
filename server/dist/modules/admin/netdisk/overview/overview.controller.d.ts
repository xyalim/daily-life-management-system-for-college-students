import { OverviewSpaceInfo } from './overview.class';
import { NetDiskOverviewService } from './overview.service';
export declare class NetDiskOverviewController {
    private overviewService;
    constructor(overviewService: NetDiskOverviewService);
    space(): Promise<OverviewSpaceInfo>;
}
