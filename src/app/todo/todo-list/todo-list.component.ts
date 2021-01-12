import { Component } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';
import * as fromTodoReducers from '../todo.reducers';
import * as fromTodoActions from '../todo.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  todoState$: Observable<fromTodoReducers.State>;
  isEdit = false;
  name: string;
  selectedTodo: Todo;

  constructor(private todoService: TodoService, private store: Store<fromTodoReducers.State>) {
    this.todoState$ = store.pipe(select('todo'));
  }

  addTodo(name: string): void {
    const todo: Todo = new Todo(name);
    this.store.dispatch(new fromTodoActions.AddTodo(todo));
    this.name = '';
  }

  updateTodo(todo: Todo): void {
    this.isEdit = true;
    this.name = todo.name;
    this.selectedTodo = todo;
  }

  confirmTodo(name: string): void {
    this.selectedTodo = { ...this.selectedTodo, name };
    this.store.dispatch(new fromTodoActions.UpdateTodo(this.selectedTodo));
    this.isEdit = false;
    this.name = '';
  }

  deleteTodo(todo: Todo): void {
    this.store.dispatch(new fromTodoActions.DeleteTodo(todo.id));
  }
}
