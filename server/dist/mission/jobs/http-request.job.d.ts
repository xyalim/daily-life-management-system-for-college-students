import { HttpService } from '@nestjs/axios';
import { LoggerService } from 'src/shared/logger/logger.service';
export declare class HttpRequestJob {
    private readonly httpService;
    private readonly logger;
    constructor(httpService: HttpService, logger: LoggerService);
    handle(config: unknown): Promise<void>;
}
