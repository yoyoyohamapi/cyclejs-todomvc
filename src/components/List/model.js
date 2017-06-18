import xs from 'xstream';

let _id = 0;

function genId() {
  return _id++;
}

export default function model(action$, initState$, TaskComponent) {
  const newReducer$ = action$
    .filter(action => action.type === 'new')
    .map(({ title }) => function newReducer(state) {
      const id = genId();
      const newTodo = {
        id,
        title,
        completed: false,
        editing: false,
        hidden: state.filter.toUpperCase() === 'COMPLETED'
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
    .map(({ filter }) => function filterReducer(state) {
      switch (filter.toUpperCase()) {
        case 'ACTIVE':
          return {
            filter: filter,
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
        case 'COMPLETED':
          return {
            filter: filter,
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
            filter: filter,
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
              hidden: state.filter.toUpperCase() !== 'ALL'
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
      const filter = state.filter.toUpperCase();
      return {
        ...state,
        todos: state.todos.map(todo => {
          const modified = {
            ...todo,
            completed: !completed,
            hidden: filter === 'ALL' ? false : !completed ? filter === 'ACTIVE' : filter === 'COMPLETED'
          };
          const out = TaskComponent(todo.id, modified);
          return { ...modified, action$: out.action$, DOM: out.DOM };
        })
      }
    });

  const $reducer = xs.merge(
    newReducer$,
    clearReducer$,
    destroyReducer$,
    doneEditReducer$,
    filterReducer$,
    toggleReducer$,
    toggleAllReducer$
  );

  return initState$
    .map(({ todos, filter }) => {
      return $reducer.fold((state, reducer) => reducer(state), {
        todos: todos.map(todo => {
          const id = genId();
          const newTodo = {
            id,
            title: todo.title,
            completed: todo.completed,
            editing: false,
            hidden: filter === 'ALL' ? false : todo.completed ? filter === 'ACTIVE' : filter === 'COMPLETED'
          };
          const out = TaskComponent(id, newTodo);
          return { ...newTodo, DOM: out.DOM, action$: out.action$ };
        }),
        filter
      });
    })
    .flatten()
    .remember();
}
