import { Action } from '@ngrx/store';
import { Todo } from './todo.model';

export enum TodoActionsTypes {
  ADD_TODO = 'ADD_TODO',
  UPDATE_TODO = 'UPDATE_TODO',
  DELETE_TODO = 'DELETE_TODO',
  DELETE_ALL_TODOS = 'DELETE_ALL_TODOS',
}

export class AddTodo implements Action {
  readonly type = TodoActionsTypes.ADD_TODO;

  constructor(public payload: Todo) {}
}

export class UpdateTodo implements Action {
  readonly type = TodoActionsTypes.UPDATE_TODO;

  constructor(public payload: Todo) {}
}

export class DeleteTodo implements Action {
  readonly type = TodoActionsTypes.DELETE_TODO;

  constructor(public payload: number) {}
}

export class DeleteAllTodos implements Action {
  readonly type = TodoActionsTypes.DELETE_ALL_TODOS;
}

export type TodoActions = AddTodo | UpdateTodo | DeleteTodo | DeleteAllTodos;
