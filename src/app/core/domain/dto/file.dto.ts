export interface FileDto {
  fileName: string;
  url: string;
  contentType: string;
  fileSize: number;
  createdTime: Date;
  stream: string;
}
