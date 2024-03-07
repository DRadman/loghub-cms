import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PickListModule, PickListMoveAllToSourceEvent, PickListMoveAllToTargetEvent, PickListMoveToSourceEvent, PickListMoveToTargetEvent } from 'primeng/picklist';
import { RippleModule } from 'primeng/ripple';
import { Team } from '../../../core/domain/models/team.entity';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/state/app.state';
import { isLoadingOrganizationTeams, selectOrganizationTeams } from '../../../core/state/team/team.selectors';
import { loadOrganizationTeams } from '../../../core/state/team/team.actions';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-team-picker',
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
  templateUrl: './team-picker.component.html',
  styleUrl: './team-picker.component.scss'
})
export class TeamPickerComponent {

  constructor(private store: Store<AppState>) {}
  isLoadingTeams = this.store.select(isLoadingOrganizationTeams);
  avaialbleTeams: Team[] = [];
  isPickerDialogVisible = false;

  @Input()
  selectedTeams: Team[] = [];

  @Input()
  onTeamsPicked?: (teams: Team[]) => void;

  @Input()
  onTeamsRemoved?: (teams: Team[]) => void;

  showPickerDialog() {
    this.store.dispatch(loadOrganizationTeams());
    this.store
      .select(selectOrganizationTeams)
      .pipe(
        filter((teams) => teams !== undefined && teams !== null),
        take(1), // unsubscribe after one emitted value
      )
      .subscribe((teams) => {
        // Filter out members that are also present in selectedProjects
        this.avaialbleTeams =
          teams?.filter(
            (team) =>
              !this.selectedTeams.some(
                (selected) => selected.teamId === team.teamId,
              ),
          ) ?? [];

        this.isPickerDialogVisible = true;
      });
  }

  onMoveToSource(event: PickListMoveToSourceEvent) {
    if (this.onTeamsRemoved) {
      this.onTeamsRemoved(event.items);
    }
  }

  onMoveToTarget(event: PickListMoveToTargetEvent) {
    if (this.onTeamsPicked) {
      this.onTeamsPicked(event.items);
    }
  }

  onMoveAllToSource(event: PickListMoveAllToSourceEvent) {
    if (this.onTeamsRemoved) {
      this.onTeamsRemoved(event.items);
    }
  }

  onMoveAllToTarget(event: PickListMoveAllToTargetEvent) {
    if (this.onTeamsPicked) {
      this.onTeamsPicked(event.items);
    }
  }

}
