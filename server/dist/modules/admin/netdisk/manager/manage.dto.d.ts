import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class IsLegalNameExpression implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments): boolean;
    defaultMessage(_args: ValidationArguments): string;
}
export declare class FileOpItem {
    type: string;
    name: string;
}
export declare class GetFileListDto {
    marker: string;
    path: string;
    key: string;
}
export declare class MKDirDto {
    dirName: string;
    path: string;
}
export declare class RenameDto {
    type: string;
    toName: string;
    name: string;
    path: string;
}
export declare class FileInfoDto {
    name: string;
    path: string;
}
export declare class DeleteDto {
    files: FileOpItem[];
    path: string;
}
export declare class MarkFileDto {
    name: string;
    path: string;
    mark: string;
}
export declare class FileOpDto {
    files: FileOpItem[];
    originPath: string;
    toPath: string;
}
