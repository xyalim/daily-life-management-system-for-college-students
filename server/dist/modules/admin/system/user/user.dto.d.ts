import { PageOptionsDto } from '../../../../common/dto/page.dto';
export declare class UpdateUserInfoDto {
    nickName: string;
    email: string;
    phone: string;
    remark: string;
}
export declare class UpdatePasswordDto {
    originPassword: string;
    newPassword: string;
}
export declare class CreateUserDto {
    departmentId: number;
    name: string;
    username: string;
    roles: number[];
    nickName: string;
    email: string;
    phone: string;
    remark: string;
    status: number;
}
export declare class UpdateUserDto extends CreateUserDto {
    id: number;
}
export declare class InfoUserDto {
    userId: number;
}
export declare class DeleteUserDto {
    userIds: number[];
}
export declare class PageSearchUserDto extends PageOptionsDto {
    departmentIds: number[];
}
export declare class PasswordUserDto {
    userId: number;
    password: string;
}
