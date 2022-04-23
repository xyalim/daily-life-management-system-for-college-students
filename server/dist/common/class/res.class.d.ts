export declare class ResOp {
    readonly data: any;
    readonly code: number;
    readonly message: string;
    constructor(code: number, data?: any, message?: string);
    static success(data?: any): ResOp;
}
export declare class Pagination {
    total: number;
    page: number;
    size: number;
}
export declare class PageResult<T> {
    list?: Array<T>;
    pagination: Pagination;
}
