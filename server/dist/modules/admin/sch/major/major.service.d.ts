import SchMajor from 'src/entities/sch/sch-major.entity';
import { EntityManager, Repository } from 'typeorm';
import { MajorInfo } from './major.class';
export declare class MajorService {
    private majorRepository;
    private entityManager;
    constructor(majorRepository: Repository<SchMajor>, entityManager: EntityManager);
    info(majorId: string): Promise<MajorInfo>;
}
