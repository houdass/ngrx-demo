import { Actions, Effect, ofType } from '@ngrx/effects';
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
  @Effect()
  getTodos$: Observable<Action> = this.actions$.pipe(
    ofType(fromTodoActions.TodoActionsTypes.GET_TODOS),
    switchMap(() =>
      this.todoService.getAll().pipe(
        map((todos: Todo[]) => new fromTodoActions.GetTodosSuccess(todos)),
        catchError((err: string) => of(new fromTodoActions.GetTodosError(err))),
      ),
    ),
  );

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
