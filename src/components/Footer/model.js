import xs from 'xstream';

export default function model(action$, props$) {
  const initReducer$ = props$.map(props => xs.of(function initReducer(state) {
    return {
      todos: props.todos,
      filter: 'All'
    };
  }));

  const clearReducer$ = action$
    .filter(action => action.type === 'clearCompleted')
    .mapTo(function clearReducer(state) {
      return {
        todos: todos.filter(todo => !todo.completed),
        ...state
      };
    });

  const filterReducer$ = action$
    .filter(action => action.type === 'filter')
    .map(action => function filterReducer(state) {
      return {
        filter: action.payload
        ...state
      };
    });

  return xs.merge(initReducer$, clearReducer$);
}
