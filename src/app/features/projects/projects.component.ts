import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { FilterService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectChangeEvent, MultiSelectModule } from 'primeng/multiselect';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { map } from 'rxjs';
import { Team } from '../../core/domain/models/team.entity';
import { AppState } from '../../core/state/app.state';
import { loadMyProjects } from '../../core/state/project/project.actions';
import {
  isLoadingMyProjects,
  selectMyProjects,
} from '../../core/state/project/project.selectors';
import { loadMyTeams } from '../../core/state/team/team.actions';
import {
  isLoadingMyTeams,
  selectMyTeams,
} from '../../core/state/team/team.selectors';
import { SingleProjectCardComponent } from './components/single-project-card/single-project-card.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MultiSelectModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    ButtonModule,
    RippleModule,
    SingleProjectCardComponent,
  ],
  providers: [FilterService],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private filterService: FilterService,
  ) {}

  myTeams = this.store
    .select(selectMyTeams)
    .pipe(map((value) => [...(value ?? [])]));
  isLoadingMyTeams = this.store.select(isLoadingMyTeams);

  filterValue: string = '';

  myProjects = this.store
    .select(selectMyProjects)
    .pipe(map((value) => [...(value ?? [])]));

  filteredProjects = this.myProjects.pipe(
    map((value) =>
      value.filter((project) =>
        this.filterValue == '' ? true : project.name.includes(this.filterValue),
      ),
    ),
  );

  isLoadingMyProjects = this.store.select(isLoadingMyProjects);

  ngOnInit(): void {
    this.store.dispatch(loadMyTeams());
    this.store.dispatch(loadMyProjects({}));
  }

  filterMyTeams($event: MultiSelectChangeEvent) {
    let teams: Team[] | undefined = $event.value ?? undefined;
    if (teams?.length === 0) {
      teams = undefined;
    }

    if (teams) {
      this.store.dispatch(
        loadMyProjects({ teamIds: teams.map((team) => team.teamId) }),
      );
    } else {
      this.store.dispatch(loadMyTeams());
    }
  }

  filterProjects() {
    this.filteredProjects = this.myProjects.pipe(
      map((value) =>
        value.filter((project) =>
          this.filterValue == '' ? true : project.name.includes(this.filterValue),
        ),
      ),
    );
  }
}
