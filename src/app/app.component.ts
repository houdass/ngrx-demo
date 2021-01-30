import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromTodoReducers from './todo/todo.reducers';
import * as fromTodoActions from './todo/todo.actions';
import * as fromRouterSelectors from './todo/router.selectors';
import { RouterReducerState } from '@ngrx/router-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentUrl$: Observable<string>;

  constructor(private store: Store<{ todo: fromTodoReducers.State; router: RouterReducerState }>) {
    this.store.dispatch(fromTodoActions.getTodos());
    this.currentUrl$ = this.store.pipe(select(fromRouterSelectors.selectUrl));
  }
}
