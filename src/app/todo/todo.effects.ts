import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { TodoService } from './todo.service';
import * as fromTodoActions from './todo.actions';
import { Todo } from './todo.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoEffects {
  getTodos$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTodoActions.getTodos.type),
      switchMap(() =>
        this.todoService.getAll().pipe(
          map((todos: Todo[]) => fromTodoActions.getTodosSuccess({ todos })),
          catchError((error: string) => of(fromTodoActions.getTodosError({ error }))),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
