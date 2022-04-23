export declare class CreateDeptDto {
    name: string;
    parentId: number;
    orderNum: number;
}
export declare class UpdateDeptDto extends CreateDeptDto {
    id: number;
}
export declare class DeleteDeptDto {
    departmentId: number;
}
export declare class InfoDeptDto {
    departmentId: number;
}
export declare class TransferDeptDto {
    userIds: number[];
    departmentId: number;
}
export declare class MoveDept {
    id: number;
    parentId: number;
}
export declare class MoveDeptDto {
    depts: MoveDept[];
}
