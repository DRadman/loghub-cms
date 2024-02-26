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
import { User } from '../../../core/domain/models/user.entity';
import { AppState } from '../../../core/state/app.state';
import { loadActiveMembers } from '../../../core/state/members/members.actions';
import {
  isLoadingActiveMembers,
  selectActiveMembers,
} from '../../../core/state/members/members.selectors';

@Component({
  selector: 'app-member-picker',
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
  templateUrl: './member-picker.component.html',
  styleUrl: './member-picker.component.scss',
})
export class MemberPickerComponent {
  constructor(private store: Store<AppState>) {}
  isLoadingMembers = this.store.select(isLoadingActiveMembers);
  availableMembers: User[] = [];
  isPickerDialogVisible = false;

  @Input()
  selectedMembers: User[] = [];

  @Input()
  onMembersPicked?: (member: User[]) => void;

  @Input()
  onMembersRemoved?: (member: User[]) => void;

  getUserInitials(member: User): string | undefined {
    if (member.lastName || member.firstName) {
      return member.firstName?.charAt(0) + member.lastName?.charAt(0);
    } else {
      return member.email.charAt(0);
    }
  }

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
    this.store.dispatch(loadActiveMembers());
    this.store
      .select(selectActiveMembers)
      .pipe(
        filter((members) => members !== undefined && members !== null),
        take(1) // unsubscribe after one emitted value
      )
      .subscribe((members) => {
        // Filter out members that are also present in selectedMembers
        this.availableMembers = members?.filter(
          (member) => !this.selectedMembers.some((selected) => selected.userId === member.userId)
        ) ?? [];

        this.isPickerDialogVisible = true;
      });
  }

  onMoveToSource(event: PickListMoveToSourceEvent) {
    if (this.onMembersRemoved) {
      this.onMembersRemoved(event.items);
    }
  }

  onMoveToTarget(event: PickListMoveToTargetEvent) {
    if (this.onMembersPicked) {
      this.onMembersPicked(event.items);
    }
  }

  onMoveAllToSource(event: PickListMoveAllToSourceEvent) {
    if (this.onMembersRemoved) {
      this.onMembersRemoved(event.items);
    }
  }

  onMoveAllToTarget(event: PickListMoveAllToTargetEvent) {
    if (this.onMembersPicked) {
      this.onMembersPicked(event.items);
    }
  }
}
