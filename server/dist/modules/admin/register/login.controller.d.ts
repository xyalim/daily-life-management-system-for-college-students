import { FastifyRequest } from 'fastify';
import { ImageCaptchaDto, LoginInfoDto } from './login.dto';
import { ImageCaptcha, LoginToken } from './login.class';
import { LoginService } from './login.service';
import { UtilService } from 'src/shared/services/util.service';
export declare class LoginController {
    private loginService;
    private utils;
    constructor(loginService: LoginService, utils: UtilService);
    captchaByImg(dto: ImageCaptchaDto): Promise<ImageCaptcha>;
    login(dto: LoginInfoDto, req: FastifyRequest, ua: string): Promise<LoginToken>;
}
