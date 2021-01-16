import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Todo } from './todo.model';

export enum TodoActionsTypes {
  GET_TODOS = 'GET_TODOS',
  GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS',
  GET_TODOS_ERROR = 'ADD_TODOS_ERROR',
  ADD_TODO = 'ADD_TODO',
  UPDATE_TODO = 'UPDATE_TODO',
  DELETE_TODO = 'DELETE_TODO',
  DELETE_ALL_TODOS = 'DELETE_ALL_TODOS',
}

export class GetTodos implements Action {
  readonly type = TodoActionsTypes.GET_TODOS;
}

export class GetTodosSuccess implements Action {
  readonly type = TodoActionsTypes.GET_TODOS_SUCCESS;

  constructor(public payload: Todo[]) {}
}

export class GetTodosError implements Action {
  readonly type = TodoActionsTypes.GET_TODOS_ERROR;

  constructor(public payload: string) {}
}

export class AddTodo implements Action {
  readonly type = TodoActionsTypes.ADD_TODO;

  constructor(public payload: Todo) {}
}

export class UpdateTodo implements Action {
  readonly type = TodoActionsTypes.UPDATE_TODO;

  constructor(public payload: Update<Todo>) {}
}

export class DeleteTodo implements Action {
  readonly type = TodoActionsTypes.DELETE_TODO;

  constructor(public payload: number) {}
}

export class DeleteAllTodos implements Action {
  readonly type = TodoActionsTypes.DELETE_ALL_TODOS;
}

export type TodoActions =
  | GetTodos
  | GetTodosSuccess
  | GetTodosError
  | AddTodo
  | UpdateTodo
  | DeleteTodo
  | DeleteAllTodos;
