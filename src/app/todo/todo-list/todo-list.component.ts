import { Component } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';
import * as fromTodoReducers from '../todo.reducers';

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
    this.store.dispatch({ type: 'ADD_TODO', payload: todo });
    this.name = '';
  }

  updateTodo(todo: Todo): void {
    this.isEdit = true;
    this.name = todo.name;
    this.selectedTodo = todo;
  }

  confirmTodo(name: string): void {
    this.selectedTodo = { ...this.selectedTodo, name };
    this.store.dispatch({ type: 'UPDATE_TODO', payload: this.selectedTodo });
    this.isEdit = false;
    this.name = '';
  }

  deleteTodo(todo: Todo): void {
    this.store.dispatch({ type: 'DELETE_TODO', payload: todo.id });
  }
}
