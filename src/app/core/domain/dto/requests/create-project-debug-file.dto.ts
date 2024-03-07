import { DebugFileType } from "../../models/enums/debug-file-type.enum";

export interface CreateProjectDebugFileDto {
    type: DebugFileType;
    file: File;
}