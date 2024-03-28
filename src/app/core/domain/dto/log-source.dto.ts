import { ProjectReleaseDto } from "./project-release.dto";

export interface LogSourceDto {
  logSourceId: string;
  uniqueIdentifier: string;
  os: string;
  osVersion: string;
  environment: string;
  ipAddress: string;
  cpuInfo: {
    model: string;
    seed: number;
    cores: number;
    threads: number;
  };
  macAddress: string;
  release: ProjectReleaseDto;
  maxRam: number;
  architecture: string;
  createdAt: Date;
  updatedAt: Date;
  online: boolean;
}
