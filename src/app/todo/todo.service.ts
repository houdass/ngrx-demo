import { Injectable } from '@angular/core';

import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos = [new Todo('Learn Java'), new Todo('Learn Angular')];

  constructor() {}
}
