import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { Project } from '../../../../core/domain/models/project.entity';
import { ProjectService } from '../../../../core/services/api/project.api.service';
import { ProjectStatDto } from '../../../../core/domain/dto/project-stat.dto';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-single-project-card',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    ButtonModule,
    ChartModule,
    RippleModule,
    CardModule,
    AvatarModule,
    SkeletonModule,
    RouterModule,
  ],
  providers: [DatePipe],
  templateUrl: './single-project-card.component.html',
  styleUrl: './single-project-card.component.scss',
})
export class SingleProjectCardComponent implements AfterViewInit {
  @Input()
  project?: Project;

  projectStat?: ProjectStatDto;

  chartData?: unknown;
  chartOptions = {
    scales: {
      x: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  isLoading: boolean = true;

  constructor(
    private projectService: ProjectService,
    private datePipe: DatePipe,
    private router: Router,
  ) {}

  ngAfterViewInit(): void {
    this.projectService
      .getProjectStats(this.project?.projectId ?? '')
      .subscribe({
        next: (result) => {
          this.isLoading = false;
          this.projectStat = result;
          this.setupChartData(result);
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }

  private setupChartData(result: ProjectStatDto) {
    this.chartData = {
      labels: result.hourByHour.map((hourlyStat) =>
        this.getChartLabel(hourlyStat.startInterval, hourlyStat.endInterval),
      ),
      datasets: [
        {
          type: 'bar',
          label: 'Transactions',
          data: result.hourByHour.map((hourlyStat) => hourlyStat.transactions),
        },
        {
          type: 'bar',
          label: 'Errors',
          data: result.hourByHour.map((hourlyStat) => hourlyStat.errors),
        },
        {
          type: 'bar',
          label: 'Crash Free Sessions',
          data: result.hourByHour.map(
            (hourlyStat) => hourlyStat.numberOfCrashFreeSessions,
          ),
        },
        {
          type: 'bar',
          label: 'Sessions',
          data: result.hourByHour.map(
            (hourlyStat) => hourlyStat.numberOfSessions,
          ),
        },
      ],
    };
  }

  private getChartLabel(startDate: Date, endDate: Date): string {
    let result = '';
    result += this.datePipe.transform(startDate, 'MMM d h:mm a');
    result += ' - ';
    result += this.datePipe.transform(endDate, 'h:mm a');
    result += ' (UTC)';
    return result;
  }

  navigateToProjectSettings() {
    this.router.navigate(['/home/settings/projects/' + this.project?.projectId])
  }
}
