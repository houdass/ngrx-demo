import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntitySelectors, EntityState } from '@ngrx/entity/src/models';

import { State, todoAdapter } from './todo.reducers';
import { Todo } from './todo.model';

export const getTodoState = createFeatureSelector<State>('todo');

export const {
  selectAll: selectAllTodos,
  selectTotal: count,
}: EntitySelectors<Todo, EntityState<Todo>> = todoAdapter.getSelectors();

export const selectAll = createSelector(getTodoState, selectAllTodos);
export const selectTotal = createSelector(getTodoState, count);
export const selectLastUpdate = createSelector(getTodoState, (state: State): string => state.lastUpdate);
export const selectLoading = createSelector(getTodoState, (state: State): boolean => state.loading);
export const selectError = createSelector(getTodoState, (state: State): string => state.error);
