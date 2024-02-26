import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import {
  PickListModule,
  PickListMoveAllToSourceEvent,
  PickListMoveAllToTargetEvent,
  PickListMoveToSourceEvent,
  PickListMoveToTargetEvent,
} from 'primeng/picklist';
import { RippleModule } from 'primeng/ripple';
import { filter, take } from 'rxjs';
import { Project } from '../../../core/domain/models/project.entity';
import { AppState } from '../../../core/state/app.state';
import { loadAllProjects } from '../../../core/state/project/project.actions';
import {
  isLoadingAllProjects,
  selectAllProjects,
} from '../../../core/state/project/project.selectors';

@Component({
  selector: 'app-project-picker',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    TranslateModule,
    DialogModule,
    PickListModule,
    AvatarModule,
  ],
  templateUrl: './project-picker.component.html',
  styleUrl: './project-picker.component.scss',
})
export class ProjectPickerComponent {
  constructor(private store: Store<AppState>) {}
  isLoadingProjects = this.store.select(isLoadingAllProjects);
  availableProjects: Project[] = [];
  isPickerDialogVisible = false;

  @Input()
  selectedProjects: Project[] = [];

  @Input()
  onProjectsPicked?: (projects: Project[]) => void;

  @Input()
  onProjectsRemoved?: (projects: Project[]) => void;

  stringToColour(str: string): string {
    let hash = 0;
    str.split('').forEach((char) => {
      hash = char.charCodeAt(0) + ((hash << 5) - hash);
    });
    let colour = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      colour += value.toString(16).padStart(2, '0');
    }
    return colour;
  }

  showPickerDialog() {
    this.store.dispatch(loadAllProjects());
    this.store
      .select(selectAllProjects)
      .pipe(
        filter((projects) => projects !== undefined && projects !== null),
        take(1), // unsubscribe after one emitted value
      )
      .subscribe((projects) => {
        // Filter out members that are also present in selectedProjects
        this.availableProjects =
          projects?.filter(
            (project) =>
              !this.selectedProjects.some(
                (selected) => selected.projectId === project.projectId,
              ),
          ) ?? [];

        this.isPickerDialogVisible = true;
      });
  }

  onMoveToSource(event: PickListMoveToSourceEvent) {
    if (this.onProjectsRemoved) {
      this.onProjectsRemoved(event.items);
    }
  }

  onMoveToTarget(event: PickListMoveToTargetEvent) {
    if (this.onProjectsPicked) {
      this.onProjectsPicked(event.items);
    }
  }

  onMoveAllToSource(event: PickListMoveAllToSourceEvent) {
    if (this.onProjectsRemoved) {
      this.onProjectsRemoved(event.items);
    }
  }

  onMoveAllToTarget(event: PickListMoveAllToTargetEvent) {
    if (this.onProjectsPicked) {
      this.onProjectsPicked(event.items);
    }
  }
}
