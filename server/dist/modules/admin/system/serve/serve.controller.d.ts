import { ServeStatInfo } from './serve.class';
import { SysServeService } from './serve.service';
export declare class SysServeController {
    private serveService;
    constructor(serveService: SysServeService);
    stat(): Promise<ServeStatInfo>;
}
