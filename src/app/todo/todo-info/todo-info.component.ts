import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { TodoService } from '../todo.service';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-todo-info',
  templateUrl: './todo-info.component.html',
})
export class TodoInfoComponent implements OnInit {
  todos$: Observable<Todo[]>;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todos$ = this.todoService.todosChanged$;
  }

  deleteAllTodos(): void {
    this.todoService.deleteAll();
  }
}
