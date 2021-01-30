import { Component } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Todo } from '../todo.model';
import * as fromTodoReducers from '../todo.reducers';
import * as fromTodoActions from '../todo.actions';
import * as fromTodoSelectors from '../todo.selectors';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  todos$: Observable<Todo[]>;
  count$: Observable<number>;
  loading$: Observable<boolean>;

  isEdit = false;
  name: string;
  selectedTodo: Todo;

  constructor(private store: Store<fromTodoReducers.State>) {
    this.todos$ = store.pipe(select(fromTodoSelectors.selectAll));
    this.count$ = store.pipe(select(fromTodoSelectors.selectTotal));
    this.loading$ = store.pipe(select(fromTodoSelectors.selectLoading));
  }

  addTodo(name: string): void {
    const todo: Todo = new Todo(name);
    this.store.dispatch(fromTodoActions.addTodo({ todo }));
    this.name = '';
  }

  updateTodo(todo: Todo): void {
    this.isEdit = true;
    this.name = todo.name;
    this.selectedTodo = todo;
  }

  confirmTodo(name: string): void {
    this.selectedTodo = { ...this.selectedTodo, name };
    this.store.dispatch(fromTodoActions.updateTodo({ todo: { id: this.selectedTodo.id, changes: this.selectedTodo } }));
    this.isEdit = false;
    this.name = '';
  }

  deleteTodo(todo: Todo): void {
    this.store.dispatch(fromTodoActions.deleteTodo({ id: todo.id }));
  }
}
