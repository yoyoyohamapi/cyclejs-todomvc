import xs from 'xstream';

export default function model(action$, props$) {
  const propsReducer$ = props$.map(props => {
    return {
      ...props
    };
  });

  const editReducer$ = action$
    .filter(action => action.type === 'toggleEdit')
    .mapTo(function editReducer(state) {
      return {
        ...state,
        editing: !state.editing,
      };
    });

  const compeleteReducer$ = action$
    .filter(action => action.type === 'toggle')
    .mapTo(function completeReducer(state) {
      return {
        ...state,
        editing: !state.completed
      }
    });

  return xs.merge(
    propsReducer$,
    editReducer$,
    compeleteReducer$
  ).fold((state, reducer) => reducer(state), {
    id: null,
    title: '',
    completed: false,
    editing: false,
    hidden: false
  });
}
