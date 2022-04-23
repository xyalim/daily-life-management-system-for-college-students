import { FastifyRequest } from 'fastify';
import { RegisterInfoDto } from './register.dto';
import { LoginToken } from './login.class';
import { RegisterService } from './register.service';
import { UtilService } from 'src/shared/services/util.service';
export declare class RegisterController {
    private RegisterService;
    private utils;
    constructor(RegisterService: RegisterService, utils: UtilService);
    register(dto: RegisterInfoDto, req: FastifyRequest, ua: string): Promise<LoginToken>;
}
