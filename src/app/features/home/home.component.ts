import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../core/state/app.state';
import { loadCurrentUser } from '../../core/state/auth/auth.actions';
import {
  selectCurrentUser,
  selectCurrentUserError,
} from '../../core/state/auth/auth.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {}

  private currentUserErrorSubscription?: Subscription;

  ngOnInit() {
    this.store.dispatch(loadCurrentUser());

    this.currentUserErrorSubscription = this.store
      .select(selectCurrentUserError)
      .subscribe((error) => {
        if (error && error != null) {
          this.router.navigate(['/auth']);
        }
      });
  }

  ngOnDestroy() {
    this.currentUserErrorSubscription?.unsubscribe();
  }

  currentUser = this.store.select(selectCurrentUser);
}
