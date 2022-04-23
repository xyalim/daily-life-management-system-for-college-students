import { IQiniuConfig } from '../../admin.interface';
import { UtilService } from 'src/shared/services/util.service';
import { SFileInfoDetail, SFileList } from './manage.class';
import { SysUserService } from '../../system/user/user.service';
import { FileOpItem } from './manage.dto';
export declare class NetDiskManageService {
    private qiniuConfig;
    private userService;
    private util;
    private config;
    private mac;
    private bucketManager;
    constructor(qiniuConfig: IQiniuConfig, userService: SysUserService, util: UtilService);
    getFileList(prefix?: string, marker?: string, skey?: string): Promise<SFileList>;
    getFileInfo(name: string, path: string): Promise<SFileInfoDetail>;
    changeFileHeaders(name: string, path: string, headers: {
        [k: string]: string;
    }): Promise<void>;
    createDir(dirName: string): Promise<void>;
    checkFileExist(filePath: string): Promise<boolean>;
    createUploadToken(endUser: string): string;
    renameFile(dir: string, name: string, toName: string): Promise<void>;
    moveFile(dir: string, toDir: string, name: string): Promise<void>;
    copyFile(dir: string, toDir: string, name: string): Promise<void>;
    renameDir(path: string, name: string, toName: string): Promise<void>;
    getDownloadLink(key: string): string;
    deleteFile(dir: string, name: string): Promise<void>;
    deleteMultiFileOrDir(fileList: FileOpItem[], dir: string): Promise<void>;
    copyMultiFileOrDir(fileList: FileOpItem[], dir: string, toDir: string): Promise<void>;
    moveMultiFileOrDir(fileList: FileOpItem[], dir: string, toDir: string): Promise<void>;
}
