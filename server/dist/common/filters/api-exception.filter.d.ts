import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { LoggerService } from 'src/shared/logger/logger.service';
export declare class ApiExceptionFilter implements ExceptionFilter {
    private logger;
    constructor(logger: LoggerService);
    catch(exception: unknown, host: ArgumentsHost): void;
}
