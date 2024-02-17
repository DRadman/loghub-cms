import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
} from 'rxjs';
import { CreateOrganizationRequestDto } from '../../core/domain/dto/requests/create-organization-request.dto';
import { OrganizationService } from '../../core/services/api/organization.api.service';
import { AppState } from '../../core/state/app.state';
import {
  createOrganization,
  loadCurrentOrganization,
} from '../../core/state/organization/organization.actions';
import {
  isLoadingOrganization,
  selectCurrentOrganization,
  selectOrganizationError,
} from '../../core/state/organization/organization.selectors';

@Component({
  selector: 'app-create-organization',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  providers: [MessageService],
  templateUrl: './create-organization.component.html',
  styleUrl: './create-organization.component.scss',
})
export class CreateOrganizationComponent
  implements AfterViewInit, OnInit, OnDestroy
{
  @ViewChild('slug') slugInput!: ElementRef;
  @ViewChild('name') nameInput!: ElementRef;

  constructor(
    private organizationService: OrganizationService,
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private translateService: TranslateService,
  ) {}

  createOrganizationForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    slug: ['', [Validators.required]],
  });

  isSlugTaken: boolean | null = null;
  isLoading = this.store.select(isLoadingOrganization);

  private slugCheckSubscription?: Subscription;
  private organizationSubscription?: Subscription;
  private errorSubscription?: Subscription;

  ngAfterViewInit(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fromEvent<any>(this.slugInput.nativeElement, 'input')
      .pipe(
        map((event: Event) => (event.target as HTMLInputElement).value),
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe((data) => this.checkSlug(data));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fromEvent<any>(this.nameInput.nativeElement, 'input')
      .pipe(
        map((event: Event) => (event.target as HTMLInputElement).value),
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe((data) => this.changeSlugAndCheckValidity(data));
  }

  ngOnInit() {
    this.store.dispatch(loadCurrentOrganization());

    this.organizationSubscription = this.store
      .select(selectCurrentOrganization)
      .subscribe((organization) => {
        if (organization != null) {
          console.log('Organization: '+ JSON.stringify(organization))
          this.router.navigate(['/home']);
        }
      });

    this.errorSubscription = this.store
      .select(selectOrganizationError)
      .subscribe((error) => {
        if (error != null && error.status !== 0 && error.status !== 404) {
          console.log(error)
          this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant(
              'create-organization.error',
            ),
            detail: this.translateService.instant(
              'create-organization.error_description',
            ),
          });
        }
      });
  }

  ngOnDestroy() {
    this.slugCheckSubscription?.unsubscribe();
    this.organizationSubscription?.unsubscribe();
    this.errorSubscription?.unsubscribe();
  }

  createOrganization() {
    const dto: CreateOrganizationRequestDto = {
      name: this.createOrganizationForm.get('name')?.value ?? '',
      slug: this.createOrganizationForm.get('slug')?.value ?? '',
    };
    this.store.dispatch(createOrganization(dto));
  }

  toSlugValue(slug: string): string {
    const result = slug.toLowerCase().replaceAll(' ', '-');
    return result;
  }

  private changeSlugAndCheckValidity(organizationName: string) {
    const slug = this.toSlugValue(organizationName);
    this.createOrganizationForm.get('slug')?.setValue(slug);
    this.checkSlug(slug);
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
