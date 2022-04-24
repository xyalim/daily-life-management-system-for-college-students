import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { PageOptionsDto } from 'src/common/dto/page.dto';
import { MajorService } from './major.service';
import { InfoMajorDto } from './major.dto';
import { MajorInfo, CreatedMajor } from './major.class';

@ApiTags('角色模块')
@Controller('major')
export class SchMajorController {
  constructor(private majorService: MajorService) {}
  @ApiOperation({ summary: '获取角色信息' })
  @ApiOkResponse({ type: MajorInfo })
  @Get('info')
  async info(@Query() dto: InfoMajorDto): Promise<MajorInfo> {
    // debugger;
    return await this.majorService.info(dto.majorId);
  }
}
