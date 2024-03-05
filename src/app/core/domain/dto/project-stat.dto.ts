import { PlatformDto } from './platform.dto';
import { ProjectHourByHourStatDto } from './project-hour-by-hour-stat.dto';
import { ProjectReleaseDto } from './project-release.dto';

export interface ProjectStatDto {
  projectId: string;
  name: string;
  platform: PlatformDto;
  releases: ProjectReleaseDto[];
  hourByHour: ProjectHourByHourStatDto[];
  totalSessions: number;
  totalCrashFreeSessions: number;
  crashFreePercentage: number;
  crashFreePercentageGain: number;
  totalErrors: number;
  totalTransactions: number;
}
