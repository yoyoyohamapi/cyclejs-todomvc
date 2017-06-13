import xs from 'xstream';

export default function model(action$) {
  const initReducer$ = xs.of(function initReducer(state) {
    return {
      title: '',
      completed: false
      editing: false
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

  return xs.merge(initReducer$, editReducer$);
}
