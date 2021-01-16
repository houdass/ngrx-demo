import { Todo } from './todo.model';
import { TodoActions, TodoActionsTypes } from './todo.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

export interface State extends EntityState<Todo> {
  lastUpdate: string;
}

export const todoAdapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

const defaultTodos = {
  ids: [0, 1],
  entities: {
    0: new Todo('Learn Angular', 0),
    1: new Todo('Learn NgRx', 1),
  },
  lastUpdate: new Date().toString()
}

const initialState: State = todoAdapter.getInitialState(defaultTodos);

export function todoReducer(state = initialState, action: TodoActions): State {
  switch (action.type) {
    case TodoActionsTypes.ADD_TODO:
      return todoAdapter.addOne(action.payload, { ...state, lastUpdate: new Date().toString() });
    case TodoActionsTypes.DELETE_TODO:
      return todoAdapter.removeOne(action.payload, { ...state, lastUpdate: new Date().toString() });
    case TodoActionsTypes.UPDATE_TODO:
      return todoAdapter.updateOne(action.payload, { ...state, lastUpdate: new Date().toString() });
    case TodoActionsTypes.DELETE_ALL_TODOS:
      return todoAdapter.removeAll({ ...state, lastUpdate: new Date().toString() });
    default:
      return state;
  }
}
