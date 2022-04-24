import { Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { difference, filter, includes, isEmpty, map } from 'lodash';
import SchMajor from 'src/entities/sch/sch-major.entity';
import { EntityManager, In, Not, Repository } from 'typeorm';
import { InfoMajorDto } from './major.dto';
import { MajorInfo, CreatedMajor } from './major.class';

@Injectable()
export class MajorService {
  constructor(
    @InjectRepository(SchMajor) private majorRepository: Repository<SchMajor>,
    @InjectEntityManager() private entityManager: EntityManager,
  ) {}

  /**
   * 根据角色获取角色信息
   */
  async info(majorId: string): Promise<MajorInfo> {
    // debugger;
    const majorInfo = await this.majorRepository.findOne({ majorId: majorId });

    return { majorInfo };
  }
}
