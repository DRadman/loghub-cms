import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { Permission } from '../../../core/domain/models/enums/permission.enum';
import { ResourceType } from '../../../core/domain/models/enums/resource-type.enum';
import { AppState } from '../../../core/state/app.state';
import { selectHasPermission } from '../../../core/state/auth/auth.selectors';
import { loadOrganizationMembers } from '../../../core/state/members/members.actions';
import {
  isLoadingMembers,
  selectActiveMembers,
  selectInvitedMembers,
  selectOwnerAsArray,
} from '../../../core/state/members/members.selectors';
import { AccessDeniedComponent } from '../../../shared/components/access-denied/access-denied.component';
import { MembersTableComponent } from '../../../shared/components/members-table/members-table.component';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [
    CommonModule,
    ToastModule,
    MembersTableComponent,
    AccessDeniedComponent,
    TranslateModule,
    PanelModule,
  ],
  providers: [MessageService],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss',
})
export class MembersComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  hasReadPermission = this.store.select(
    selectHasPermission(ResourceType.USER, Permission.READ),
  );
  hasDeletePermission = this.store.select(
    selectHasPermission(ResourceType.USER, Permission.DELETE),
  );
  hasCreatePermission = this.store.select(
    selectHasPermission(ResourceType.USER, Permission.CREATE),
  );
  isLoadingMembers = this.store.select(isLoadingMembers);
  activeMembers = this.store.select(selectActiveMembers);
  invitedMembers = this.store.select(selectInvitedMembers);
  owner = this.store.select(selectOwnerAsArray);

  ngOnInit() {
    this.store.dispatch(loadOrganizationMembers());
  }
}
