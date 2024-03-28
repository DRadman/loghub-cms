export interface LogSessionDto {
  sessionId: string;
  startTime: Date;
  endTime: Date;
  networkType: string;
  networkSpeed: string;
  crashFree: boolean;
  projectId: string;
  logSourceId: string;
}
