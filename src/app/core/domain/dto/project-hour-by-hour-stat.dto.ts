export interface ProjectHourByHourStatDto {
  id: string;
  name: string;
  projectId: string;
  startInterval: Date;
  endInterval: Date;
  numberOfSessions: number;
  numberOfCrashFreeSessions: number;
  crashFreePercentage: number;
  crashFreeGain: number;
  errors: number;
  transactions: number;
}
