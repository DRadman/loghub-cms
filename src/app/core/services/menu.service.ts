import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuChangeEvent } from '../domain/models/menu-change-event.model';

/** The MenuService class provides functionality for emitting and subscribing to custom events related
to menu state changes. */
@Injectable({
  providedIn: 'root',
})
export class MenuService {
  /** `private menuSource = new Subject<MenuChangeEvent>();` is creating a new instance of the
    `Subject` class and assigning it to the `menuSource` variable. This `Subject` will be used to
    emit `MenuChangeEvent` objects when the `onMenuStateChange()` function is called in the
    `MenuService`. Other components or services can subscribe to the `menuSource$` observable to
    receive notifications when the `onMenuStateChange()` function is called. */
  private menuSource = new Subject<MenuChangeEvent>();
  /** `private resetSource = new Subject();` is creating a new instance of the `Subject` class and
    assigning it to the `resetSource` variable. This `Subject` will be used to emit a boolean value
    of `true` when the `reset()` function is called in the `MenuService`. Other components or
    services can subscribe to the `resetSource$` observable to receive notifications when the
    `reset()` function is called. */
  private resetSource = new Subject();

  /** `menuSource$` is creating an observable from the `menuSource` subject. This allows other
    components or services to subscribe to the `menuSource$` observable and receive notifications
    when the `onMenuStateChange()` function is called in the `MenuService`. */
  menuSource$ = this.menuSource.asObservable();
  /** `resetSource$` is creating an observable from the `resetSource` subject. This allows other
    components or services to subscribe to the `resetSource$` observable and receive notifications
    when the `reset()` function is called in the `MenuService`. */
  resetSource$ = this.resetSource.asObservable();

  /**
   * The function onMenuStateChange sends a MenuChangeEvent to the menuSource.
   * @param {MenuChangeEvent} event - MenuChangeEvent is a custom event type that is triggered when
   * the state of a menu changes. It contains information about the menu that triggered the event,
   * such as its current state (open or closed) and any additional data that may be relevant to the
   * event. In this code snippet, the event is being
   */
  onMenuStateChange(event: MenuChangeEvent) {
    this.menuSource.next(event);
  }

  /**
   * The function "reset()" sends a boolean value of "true" through a subject called "resetSource".
   */
  reset() {
    this.resetSource.next(true);
  }
}
