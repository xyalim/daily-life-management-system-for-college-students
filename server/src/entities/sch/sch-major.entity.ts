import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'sch_major' })
export default class SchMajor extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ name: 'major_id' })
  @ApiProperty()
  majorId: string;

  @Column({ name: 'major_name' })
  @ApiProperty()
  majorName: string;

  @Column({ name: 'department_id' })
  @ApiProperty()
  departmentId: string;
}
