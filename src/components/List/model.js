import xs from 'xstream';

export default function model(action$) {
  const newReducer$ = action$
    .filter(action => action.type === 'new')
    .map(action => function newReducer(state) {
      const lastTodo = todos[todos.length - 1];
      const newId = lastTodo ? 0 : lastTodo.id + 1;
      const newTodo = {
        id: newId,
        title: action.payload,
        completed: false,
        editing: false,
        hidden: false
      };
      return {
        ...state,
        todos: todos.map(todo => todo).concat(newTodo)
      };
    });

  const clearReducer$ = action$
    .filter(action => action.type === 'clearComplete')
    .map(function clearReducer(state) {
      return {
        ...state,
        todos: todos.filter(todo => !todo.completed)
      }
    });

  const deleteReducer$ = action$
    .filter(action => action.type === 'delete')
    .map(action => function deleteReducer(state) {
      return {
        ...state,
        todos: todos.filter(todo => todo.id !== action.payload)
      };
    });

  const filterReducer$ = action$
    .filter(action => action.type === 'filter')
    .map(action => function filterReducer(state) {
      switch (action.payload) {
        case 'All':
          return {
            todos: todos.map(todo => todo)
          };
        case 'Active':
          return {
            todos: todos.map(todo => todo.completed ? { ...todo, hidden: true } : { ...todo, hidden: false })
          };
        case 'Completed':
          return {
            todos: todos.map(todo => todo.completed ? { ...todo, hidden: false } : { ...todo, hidden: true })
          };
      }
    })

  return xs.merge(
    newReducer$,
    clearReducer$,
    filterReducer$
  ).fold((state, reducer) => reducer(state), {
    todos: []
  });
}
