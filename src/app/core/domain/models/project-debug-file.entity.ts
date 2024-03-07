import { DebugFileType } from "./enums/debug-file-type.enum";

export interface ProjectDebugFile {
  debugFileId: string;
  type: DebugFileType;
  fileUrl: string;
  file: string;
  createdAt: Date;
}
