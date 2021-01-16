import { Component } from '@angular/core';
import {Store} from '@ngrx/store';

import * as fromTodoReducers from './todo/todo.reducers';
import * as fromTodoActions from './todo/todo.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 constructor(private store: Store<fromTodoReducers.State>) {
   this.store.dispatch(new fromTodoActions.GetTodos());
 }
}
