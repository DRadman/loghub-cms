import { DebugFileType } from "../models/enums/debug-file-type.enum";

export interface ProjectDebugFileDto {
    debugFileId: string;
    type: DebugFileType;
    fileUrl: string;
    file: string;
    createdAt: Date;
}