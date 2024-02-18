import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { filter, take } from 'rxjs';
import { InvitationDto } from '../../../core/domain/dto/invitation.dto';
import { StateStatus } from '../../../core/domain/models/enums/state-status.enum';
import { Role, User } from '../../../core/domain/models/user.entity';
import { AppState } from '../../../core/state/app.state';
import {
  inviteMember,
  removeMember,
} from '../../../core/state/members/members.actions';
import {
  isLoadingRemoveMembers,
  isLoadingSendInvitation,
  selectInvitationSendStatus,
  selectRemoveMemberStatus,
} from '../../../core/state/members/members.selectors';
import { loadRoles } from '../../../core/state/role/role.actions';
import { selectRoles } from '../../../core/state/role/role.selectors';

@Component({
  selector: 'app-members-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TranslateModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    AvatarModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './members-table.component.html',
  styleUrl: './members-table.component.scss',
})
export class MembersTableComponent {
  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private translateService: TranslateService,
  ) {}

  @ViewChild('dt') dt: Table | undefined;
  @Input()
  data?: User[] | InvitationDto[] = undefined;

  @Input()
  isLoading: boolean = true;

  @Input()
  enableFiltering: boolean = true;

  @Input()
  enableSorting: boolean = true;

  @Input()
  enableGlobalSearch: boolean = true;

  @Input()
  enablePagination: boolean = true;

  @Input()
  enableInviteAction: boolean = false;

  @Input()
  enableRemoveAction: boolean = false;

  roles = this.store.select(selectRoles);
  inviteNewUserForm = this.formBuilder.group({
    role: [undefined as Role | undefined, [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });
  isInviteDialogVisible: boolean = false;

  isLoadingSendInvitation = this.store.select(isLoadingSendInvitation);
  isLoadingRemoveMembers = this.store.select(isLoadingRemoveMembers);

  applyFilterGlobal($event: Event, stringVal: string) {
    this.dt?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  showInviteDialog() {
    this.resetInviteForm();
    this.store.dispatch(loadRoles());
    this.isInviteDialogVisible = true;
  }

  sendInvite() {
    this.store
      .select(selectInvitationSendStatus)
      .pipe(
        filter(
          (status) =>
            status == StateStatus.ERROR || status == StateStatus.SUCCESS,
        ),
        take(1), // unsubscribe after one emitted value
      )
      .subscribe((status) => {
        if (status && status == StateStatus.ERROR) {
          this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant('members-table.error'),
            detail: this.translateService.instant(
              'members-table.failed_to_send_invite',
            ),
          });
        } else if (status && status == StateStatus.SUCCESS) {
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('members-table.success'),
            detail: this.translateService.instant('members-table.invite_sent'),
          });
          this.isInviteDialogVisible = !this.isInviteDialogVisible;
        }
      });

    const dto = {
      email: this.inviteNewUserForm.get('email')?.value ?? '',
      roleId: this.inviteNewUserForm.get('role')?.value?.roleId ?? '',
    };
    this.store.dispatch(inviteMember(dto));
  }

  private resetInviteForm() {
    this.inviteNewUserForm = this.formBuilder.group({
      role: [undefined as Role | undefined, [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  showRemoveMemberConfirmation(member: any, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.translateService.instant('members-table.delete_confirmation_message'),
      header: this.translateService.instant('members-table.delete_confirmation'),
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.removeMember(member);
      },
      reject: () => {},
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  removeMember(member: any) {
    this.store
      .select(selectRemoveMemberStatus)
      .pipe(
        filter(
          (status) =>
            status == StateStatus.ERROR || status == StateStatus.SUCCESS,
        ),
        take(1), // unsubscribe after one emitted value
      )
      .subscribe((status) => {
        if (status && status == StateStatus.ERROR) {
          this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant('members-table.error'),
            detail: this.translateService.instant(
              'members-table.failed_to_remove_member',
            ),
          });
        } else if (status && status == StateStatus.SUCCESS) {
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('members-table.success'),
            detail: this.translateService.instant(
              'members-table.removed_memeber',
            ),
          });
        }
      });

    let memberId = '';
    if (member.userId) {
      memberId = member.userId;
    } else if (member.invitationId) {
      memberId = member.invitationId;
    }
    this.store.dispatch(removeMember({ memberId: memberId }));
  }
}
