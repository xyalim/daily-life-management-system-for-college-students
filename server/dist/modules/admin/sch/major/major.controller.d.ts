import { MajorService } from './major.service';
import { InfoMajorDto } from './major.dto';
import { MajorInfo } from './major.class';
export declare class SchMajorController {
    private majorService;
    constructor(majorService: MajorService);
    info(dto: InfoMajorDto): Promise<MajorInfo>;
}
