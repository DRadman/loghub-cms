import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import {
  FileUpload,
  FileUploadHandlerEvent,
  FileUploadModule
} from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  take,
} from 'rxjs';
import { Permission } from '../../../core/domain/models/enums/permission.enum';
import { ResourceType } from '../../../core/domain/models/enums/resource-type.enum';
import { StateStatus } from '../../../core/domain/models/enums/state-status.enum';
import { Organization } from '../../../core/domain/models/organization.entity';
import { OrganizationService } from '../../../core/services/api/organization.api.service';
import { AppState } from '../../../core/state/app.state';
import { selectHasPermission } from '../../../core/state/auth/auth.selectors';
import { updateOrganizationPicture } from '../../../core/state/organization/organization.actions';
import {
  isUpdateOrganizationPictureLoading,
  selectCurrentOrganization,
  selectUpdateOrganizationPictureStatus,
} from '../../../core/state/organization/organization.selectors';

@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [
    CommonModule,
    PanelModule,
    TranslateModule,
    DividerModule,
    BadgeModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    InputNumberModule,
    FormsModule,
    AvatarModule,
    FileUploadModule,
    ToastModule,
    ProgressSpinnerModule,
  ],
  providers: [MessageService],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.scss',
})
export class OrganizationComponent implements OnDestroy, AfterViewInit {
  @ViewChild('slug') slugInput!: ElementRef;
  @ViewChild('fileUpload') primeFileUpload!: FileUpload;

  constructor(
    private store: Store<AppState>,
    private organizationService: OrganizationService,
    private messageService: MessageService,
    private translateService: TranslateService,
  ) {}

  organization = this.store.select(selectCurrentOrganization);
  hasUpdatePermission = this.store.select(
    selectHasPermission(ResourceType.ORGANIZATION, Permission.UPDATE),
  );
  hasDeletePermission = this.store.select(
    selectHasPermission(ResourceType.ORGANIZATION, Permission.DELETE),
  );
  isSlugTaken: boolean | null = null;
  archivePeriod: number = 30;
  cleanupPeriod: number = 90;
  isUploadInProgress = this.store.select(isUpdateOrganizationPictureLoading);

  private slugCheckSubscription?: Subscription;

  ngAfterViewInit() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fromEvent<any>(this.slugInput.nativeElement, 'input')
      .pipe(
        map((event: Event) => (event.target as HTMLInputElement).value),
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe((data) => this.checkSlug(data));
  }

  ngOnDestroy(): void {
    this.slugCheckSubscription?.unsubscribe();
  }

  deleteOrganization() {
    throw new Error('Method not implemented.');
  }

  toSlugValue(slug: string): string {
    const result = slug.toLowerCase().replaceAll(' ', '-');
    return result;
  }

  getOrganizationInitials(organization: Organization | null): string {
    if (organization == null) {
      return 'NA';
    } else {
      let result = '';
      organization.slug.split('-').forEach((value) => {
        result += value.charAt(0);
      });
      return result;
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

  uploadNewAvatar($event: FileUploadHandlerEvent) {
    if ($event.files.length > 0) {
      const file = $event.files[0];
      this.primeFileUpload.uploading = true;
      this.primeFileUpload.progress = 0;
      this.store.dispatch(updateOrganizationPicture({ file: file }));
      this.store
        .select(selectUpdateOrganizationPictureStatus)
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
              summary: this.translateService.instant('organization.error'),
              detail: this.translateService.instant(
                'organization.failed_to_upload_picture',
              ),
            });
          } else {
            this.primeFileUpload.clear();
          }
          this.primeFileUpload.uploading = false;
          this.primeFileUpload.progress = 100;
        });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateOrganizationNameAndSlug(name: string, slug: string) {
    throw new Error('Method not implemented.');
  }

  private checkSlug(slug: string) {
    this.slugCheckSubscription?.unsubscribe();
    this.slugCheckSubscription = this.organizationService
      .isSlugTaken(slug)
      .subscribe({
        next: (result) => {
          this.isSlugTaken = result;
        },
        error: () => {
          this.isSlugTaken = null;
        },
      });
  }
}
