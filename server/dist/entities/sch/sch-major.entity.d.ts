import { BaseEntity } from '../base.entity';
export default class SchMajor extends BaseEntity {
    id: number;
    majorId: string;
    majorName: string;
    departmentId: string;
}
