export declare type FileType = 'file' | 'dir';
export declare class SFileInfo {
    id: string;
    type: FileType;
    name: string;
    putTime?: Date;
    fsize?: string;
    mimeType?: string;
    belongTo?: string;
}
export declare class SFileList {
    list: SFileInfo[];
    marker?: string;
}
export declare class UploadToken {
    token: string;
}
export declare class SFileInfoDetail {
    fsize: number;
    hash: string;
    mimeType: string;
    type: number;
    putTime: Date;
    md5: string;
    uploader: string;
    mark?: string;
}
