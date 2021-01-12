# npm packages

npm i @fortawesome/fontawesome-free bootstrap

```
@import '~@fortawesome/fontawesome-free/css/all.css';
@import '~bootstrap/dist/css/bootstrap.min.css';
```

# todo.model.ts

```
export class Todo {
  constructor(public name: string, public id?: number) {
    if (id === undefined) {
      this.id = Math.floor(Date.now() * Math.random());
    }
  }
}
```

# todo.service.ts

```
import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
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
```

# todo-info.component.html

```
<h3>TODO Info</h3>
<h5>Total des todos: {{ (todos$ | async).length }}</h5>
<!-- <h5>Dernière mise à jour: {{ lastUpdate$ | async | date:'mediumTime' }}</h5> -->

<button class="btn btn-danger btn-sm" (click)="deleteAllTodos()">
  Tout supprimer
  <span class="fa fa-trash"></span>
</button>
```

# todo-info.component.ts

```
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
```

# todo-list.component.html
### Add FormsModule to AppModule

```
<h3>TODO List</h3>
<div class="input-group">
  <input class="form-control" (keyup.enter)="isEdit ? confirmTodo(name) : addTodo(name)" [(ngModel)]="name">
  <button class="btn btn-success" (click)="addTodo(name)" *ngIf="!isEdit" [disabled]="!name">
    Ajouter
  </button>
  <button class="btn btn-info" (click)="confirmTodo(name)" *ngIf="isEdit" [disabled]="!name">
    Modifier
  </button>
</div>

<ng-container *ngIf="todos$ | async as todos">
  <div *ngFor="let todo of todos" class="mt-3">
    {{ todo.name }}
    <div class="btn-group btn-group-sm float-right">
      <button class="btn btn-info" (click)="updateTodo(todo)">
        <span class="fa fa-edit"></span>
      </button>
      <button class="btn btn-danger" (click)="deleteTodo(todo)">
        <span class="fa fa-trash"></span>
      </button>
    </div>
  </div>
  <h3 *ngIf="todos.length === 0" class="mt-3">
    Aucun TODO trouvé, veuillez en rajouter.
  </h3>
</ng-container>
```

# todo-list.component.ts

```
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]>;
  isEdit = false;
  name: string;
  selectedTodo: Todo;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todos$ = this.todoService.todosChanged$;
  }

  addTodo(name: string): void {
    const todo: Todo = new Todo(name);
    this.todoService.add(todo);
    this.name = '';
  }

  updateTodo(todo: Todo): void {
    this.isEdit = true;
    this.name = todo.name;
    this.selectedTodo = todo;
  }

  confirmTodo(name: string): void {
    this.selectedTodo = { ...this.selectedTodo, name };
    this.todoService.update(this.selectedTodo);
    this.isEdit = false;
    this.name = '';
  }

  deleteTodo(todo: Todo): void {
    this.todoService.delete(todo.id);
  }
}
```

# app.component.html

```
<div class="container mt-5">
  <div class="row">
    <div class="col-6">
      <app-todo-list></app-todo-list>
    </div>
    <div class="col-6">
      <app-todo-info></app-todo-info>
    </div>
  </div>
</div>
```

# prettier

npm i prettier pretty-quick -D

```
"format:fix": "pretty-quick --bail --staged --pattern 'src/**/*.{json,scss,ts}'"
```

```
{
  "arrowParens": "always",
  "bracketSpacing": true,
  "proseWrap": "always",
  "printWidth": 120,
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "endOfLine": "lf",
  "trailingComma": "all"
}
```
