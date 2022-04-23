import { Body, Controller, Headers, Post, Req } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Authorize } from '../core/decorators/authorize.decorator';
import { ImageCaptchaDto, RegisterInfoDto } from './register.dto';
import { ImageCaptcha, LoginToken } from './login.class';
import { RegisterService } from './register.service';
import { LogDisabled } from '../core/decorators/log-disabled.decorator';
import { UtilService } from 'src/shared/services/util.service';

@ApiTags('注册模块')
@Controller()
export class RegisterController {
  constructor(
    private RegisterService: RegisterService,
    private utils: UtilService,
  ) {}

  @ApiOperation({
    summary: '注册',
  })
  @ApiOkResponse({ type: LoginToken })
  @Post('register')
  @LogDisabled()
  @Authorize()
  async register(
    @Body() dto: RegisterInfoDto,
    @Req() req: FastifyRequest,
    @Headers('user-agent') ua: string,
  ): Promise<LoginToken> {
    await this.RegisterService.checkImgCaptcha(dto.captchaId, dto.verifyCode);
    const token = await this.RegisterService.getLoginSign(
      dto.username,
      dto.password,
      this.utils.getReqIP(req),
      ua,
    );
    return { token };
  }
}
