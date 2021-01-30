import { Todo } from './todo.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import {
  addTodo,
  deleteAllTodos,
  deleteTodo,
  getTodos,
  getTodosError,
  getTodosSuccess,
  updateTodo,
} from './todo.actions';

export interface State extends EntityState<Todo> {
  lastUpdate: string;
  loading: boolean;
  error: string;
}

export const todoAdapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

const defaultTodos = {
  lastUpdate: new Date().toString(),
  loading: false,
  error: '',
};

const initialState: State = todoAdapter.getInitialState(defaultTodos);

export const reducer = createReducer(
  initialState,
  on(getTodos, (state: State) => ({ ...state, lastUpdate: new Date().toString(), loading: true, error: '' })),
  on(getTodosSuccess, (state: State, { todos }) =>
    todoAdapter.setAll(todos, {
      ...state,
      lastUpdate: new Date().toString(),
      loading: false,
      error: '',
    }),
  ),
  on(getTodosError, (state: State, { error }) => ({
    ...state,
    lastUpdate: new Date().toString(),
    loading: false,
    error,
  })),
  on(addTodo, (state: State, { todo }) =>
    todoAdapter.addOne(todo, {
      ...state,
      lastUpdate: new Date().toString(),
      loading: false,
      error: '',
    }),
  ),
  on(deleteTodo, (state: State, { id }) =>
    todoAdapter.removeOne(id, {
      ...state,
      lastUpdate: new Date().toString(),
      loading: false,
      error: '',
    }),
  ),
  on(updateTodo, (state: State, { todo }) =>
    todoAdapter.updateOne(todo, {
      ...state,
      lastUpdate: new Date().toString(),
      loading: false,
      error: '',
    }),
  ),
  on(deleteAllTodos, (state: State) =>
    todoAdapter.removeAll({ ...state, lastUpdate: new Date().toString(), loading: false, error: '' }),
  ),
);

export function todoReducer(state: State, action: Action): EntityState<Todo> {
  return reducer(state, action);
}
