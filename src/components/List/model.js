import xs from 'xstream';

let _id = 0;

function genId() {
  return _id++;
}

export default function model(action$, TaskComponent) {
  const newReducer$ = action$
    .filter(action => action.type === 'new')
    .map(({ title }) => function newReducer(state) {
      const id = genId();
      const newTodo = {
        id,
        title,
        completed: false,
        editing: false,
        hidden: state.filter === 'Completed'
      };
      const out = TaskComponent(id, newTodo);
      return {
        ...state,
        todos: state.todos.concat([{ ...newTodo, DOM: out.DOM, action$: out.action$ }])
      };
    });

  const clearReducer$ = action$
    .filter(action => action.type === 'clear')
    .mapTo(function clearReducer(state) {
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      }
    });

  const destroyReducer$ = action$
    .filter(action => action.type === 'destroy')
    .map(action => function destroyReducer(state) {
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id)
      };
    });

  const doneEditReducer$ = action$
    .filter(action => action.type === 'doneEdit')
    .map(action => function doneEditReducer(state) {
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.id) {
            const modified = {
              ...todo,
              title: action.title
            };
            const out = TaskComponent(todo.id, modified);
            return { ...modified, action$: out.action$, DOM: out.DOM };
          }
          return todo;
        })
      };
    });

  const filterReducer$ = action$
    .filter(action => action.type === 'filter')
    .map(action => function filterReducer(state) {
      switch (action.filter) {
        case 'Active':
          return {
            filter: action.filter,
            todos: state.todos.map(todo => {
              const hidden = todo.completed;
              const modified = {
                ...todo,
                hidden
              };
              const out = TaskComponent(todo.id, modified);
              return { ...modified, action$: out.action$, DOM: out.DOM };
            })
          };
        case 'Completed':
          return {
            filter: action.filter,
            todos: state.todos.map(todo => {
              const hidden = !todo.completed;
              const modified = {
                ...todo,
                hidden
              };
              const out = TaskComponent(todo.id, modified);
              return { ...modified, action$: out.action$, DOM: out.DOM };
            })
          };
        default:
          return {
            filter: action.filter,
            todos: state.todos.map(todo => {
              const modified = {
                ...todo,
                hidden: false
              };
              const out = TaskComponent(todo.id, modified);
              return { ...modified, action$: out.action$, DOM: out.DOM };
            })
          };
      }
    });

  const toggleReducer$ = action$
    .filter(action => action.type === 'toggle')
    .map(action => function toggleReducer(state) {
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.id) {
            const modified = {
              ...todo,
              completed: !todo.completed,
              hidden: state.filter !== 'All'
            };
            const out = TaskComponent(todo.id, modified);
            return { ...modified, action$: out.action$, DOM: out.DOM };
          }
          return todo;
        })
      };
    });

  const toggleAllReducer$ = action$
    .filter(action => action.type === 'toggleAll')
    .map(action => function toggleAllReducer(state) {
      const completed = state.todos.every(todo => todo.completed);
      return {
        ...state,
        todos: state.todos.map(todo => {
          const modified = {
            ...todo,
            completed: !completed,
            hidden: state.filter === 'All' ? false : !completed ? state.filter === 'Active' : state.filter === 'Completed'
          };
          const out = TaskComponent(todo.id, modified);
          return { ...modified, action$: out.action$, DOM: out.DOM };
        })
      }
    });

  return xs.merge(
    newReducer$,
    clearReducer$,
    destroyReducer$,
    doneEditReducer$,
    filterReducer$,
    toggleReducer$,
    toggleAllReducer$
  ).fold((state, reducer) => reducer(state), {
    todos: [],
    filter: 'All'
  }).remember();
}
