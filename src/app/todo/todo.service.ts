import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `http://localhost:3000/todos`;
  }

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl).pipe(delay(5000));
  }
}
