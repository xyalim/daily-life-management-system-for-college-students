import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { LoginService } from 'src/modules/admin/login/login.service';
export declare class AuthGuard implements CanActivate {
    private reflector;
    private jwtService;
    private loginService;
    constructor(reflector: Reflector, jwtService: JwtService, loginService: LoginService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
