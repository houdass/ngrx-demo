import { Todo } from './todo.model';

export interface State {
  todos: Todo[];
  lastUpdate: string;
}

const initialState: State = {
  todos: [new Todo('Learn Java', 1), new Todo('Learn Angular', 2), new Todo('Learn NgRx', 3)],
  lastUpdate: new Date().toString(),
};

export function todoReducer(state = initialState, action): State {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        lastUpdate: new Date().toString(),
        todos: [...state.todos, action.payload],
      };
    case 'DELETE_TODO':
      return {
        ...state,
        lastUpdate: new Date().toString(),
        todos: [...state.todos].filter((t: Todo) => t.id !== action.payload),
      };
    case 'UPDATE_TODO':
      const todos = state.todos.map((t: Todo) => {
        if (t.id === action.payload.id) {
          t = { ...t, ...action.payload };
        }
        return t;
      });
      return {
        ...state,
        todos,
        lastUpdate: new Date().toString(),
      };
    case 'DELETE_ALL_TODOS':
      return {
        ...state,
        lastUpdate: new Date().toString(),
        todos: [],
      };
    default:
      return state;
  }
}
