import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos = [new Todo('Learn Java'), new Todo('Learn Angular')];
  todosChanged$ = new BehaviorSubject(this.todos);

  constructor() {}

  add(todo: Todo): void {
    this.todos.push(todo);
    this.todosChanged$.next(this.todos.slice());
  }

  delete(id: number): void {
    this.todos = this.todos.filter((todo: Todo) => todo.id !== id);
    this.todosChanged$.next(this.todos.slice());
  }

  update(todo: Todo): void {
    const index = this.todos.findIndex((t: Todo) => t.id === todo.id);
    this.todos[index] = todo;
    this.todosChanged$.next(this.todos.slice());
  }

  deleteAll(): void {
    this.todos = [];
    this.todosChanged$.next(this.todos.slice());
  }
}
