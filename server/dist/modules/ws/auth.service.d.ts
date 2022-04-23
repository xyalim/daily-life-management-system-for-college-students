import { JwtService } from '@nestjs/jwt';
import { IAdminUser } from '../admin/admin.interface';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    checkAdminAuthToken(token: string | string[] | undefined): IAdminUser | never;
}
