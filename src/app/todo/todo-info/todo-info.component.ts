import { Component } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { TodoService } from '../todo.service';
import * as fromTodoReducers from '../todo.reducers';
import * as fromTodoActions from '../todo.actions';
import * as fromTodoSelectors from '../todo.selectors';

@Component({
  selector: 'app-todo-info',
  templateUrl: './todo-info.component.html',
})
export class TodoInfoComponent {
  count$: Observable<number>;
  lastUpdate$: Observable<string>;

  constructor(private todoService: TodoService, private store: Store<fromTodoReducers.State>) {
    this.count$ = store.pipe(select(fromTodoSelectors.selectTotal));
    this.lastUpdate$ = store.pipe(select(fromTodoSelectors.selectLastUpdate));
  }

  deleteAllTodos(): void {
    this.store.dispatch(new fromTodoActions.DeleteAllTodos());
  }
}
