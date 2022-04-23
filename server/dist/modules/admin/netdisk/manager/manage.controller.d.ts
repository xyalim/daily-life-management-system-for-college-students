import { NetDiskManageService } from './manage.service';
import { DeleteDto, FileInfoDto, FileOpDto, GetFileListDto, MarkFileDto, MKDirDto, RenameDto } from './manage.dto';
import { SFileInfoDetail, SFileList, UploadToken } from './manage.class';
import { IAdminUser } from '../../admin.interface';
export declare class NetDiskManageController {
    private manageService;
    constructor(manageService: NetDiskManageService);
    list(dto: GetFileListDto): Promise<SFileList>;
    mkdir(dto: MKDirDto): Promise<void>;
    token(user: IAdminUser): Promise<UploadToken>;
    info(dto: FileInfoDto): Promise<SFileInfoDetail>;
    mark(dto: MarkFileDto): Promise<void>;
    download(dto: FileInfoDto): Promise<string>;
    rename(dto: RenameDto): Promise<void>;
    delete(dto: DeleteDto): Promise<void>;
    cut(dto: FileOpDto): Promise<void>;
    copy(dto: FileOpDto): Promise<void>;
}
