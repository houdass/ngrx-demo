import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';

export interface State {
  router: fromRouter.RouterReducerState;
}

export const selectRouter = createFeatureSelector<State, fromRouter.RouterReducerState>('router');

export const { selectUrl } = fromRouter.getSelectors(selectRouter);
