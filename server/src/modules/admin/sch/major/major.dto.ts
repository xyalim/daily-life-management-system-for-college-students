import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { isEmpty } from 'lodash';

export class InfoMajorDto {
  @ApiProperty({
    description: '专业id',
  })
  @IsString()
  majorId: string;

  @ApiProperty({
    description: '专业名',
  })
  @IsString()
  majorName: string;

  @ApiProperty({
    description: '院系id',
  })
  @IsNumber()
  departmentId: number;
}
