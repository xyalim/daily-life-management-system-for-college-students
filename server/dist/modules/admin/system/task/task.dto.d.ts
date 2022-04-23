import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class IsCronExpression implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments): boolean;
    defaultMessage(_args: ValidationArguments): string;
}
export declare class CreateTaskDto {
    name: string;
    service: string;
    type: number;
    status: number;
    startTime: string;
    endTime: string;
    readonly limit: number;
    cron: string;
    every: number;
    data: string;
    remark: string;
}
export declare class UpdateTaskDto extends CreateTaskDto {
    id: number;
}
export declare class CheckIdTaskDto {
    id: number;
}
