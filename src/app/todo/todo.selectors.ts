import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from './todo.reducers';
import { Todo } from './todo.model';

export const getTodoState = createFeatureSelector<State>('todo');

export const selectAll = createSelector(getTodoState, (state: State): Todo[] => state.todos);

export const selectTotal = createSelector(getTodoState, (state: State): number => state.todos.length);

export const selectLastUpdate = createSelector(getTodoState, (state: State): string => state.lastUpdate);
