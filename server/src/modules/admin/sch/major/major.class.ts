import { ApiProperty } from '@nestjs/swagger';
import SchMajor from 'src/entities/sch/sch-major.entity';

export class MajorInfo {
  @ApiProperty({
    type: SchMajor,
  })
  majorInfo: SchMajor;
}

export class CreatedMajor {
  majorId: string;
  majorName: string;
  departmentId: string;
}
