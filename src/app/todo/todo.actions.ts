import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Todo } from './todo.model';

export const getTodos = createAction('GET_TODOS');
export const getTodosSuccess = createAction('GET_TODOS_SUCCESS', props<{ todos: Todo[] }>());
export const getTodosError = createAction('GET_TODOS_ERROR', props<{ error: string }>());
export const addTodo = createAction('ADD_TODO', props<{ todo: Todo }>());
export const updateTodo = createAction('UPDATE_TODO', props<{ todo: Update<Todo> }>());
export const deleteTodo = createAction('DELETE_TODO', props<{ id: number }>());
export const deleteAllTodos = createAction('DELETE_ALL_TODOS');
