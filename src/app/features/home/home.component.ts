import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../core/state/app.state';
import { loadCurrentUser, signOut } from '../../core/state/auth/auth.actions';
import { selectCurrentUser } from '../../core/state/auth/auth.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private store: Store<AppState>, private router: Router) {}

  private currentUserErrorSubscription?: Subscription;

  ngOnInit() {
    this.store.dispatch(loadCurrentUser());
  }

  ngOnDestroy() {
    this.currentUserErrorSubscription?.unsubscribe();
  }

  currentUser = this.store.select(selectCurrentUser);
}
