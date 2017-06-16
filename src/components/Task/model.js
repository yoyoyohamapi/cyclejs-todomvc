import xs from 'xstream';

export default function model(action$, props$) {
  const startEditReducer$ = action$
    .filter(action => action.type === 'startEdit')
    .mapTo(function startEditReducer(state) {
      return {
        ...state,
        editing: true,
      };
    });

  const doneEditReudcer$ = action$
    .filter(action => action.type === 'doneEdit')
    .mapTo(function doneEditReducer(state) {
      return {
        ...state,
        editing: false
      }
    });

  const reducer$ = xs.merge(
    startEditReducer$,
    doneEditReudcer$
  );

  return props$
    .startWith({
      completed: false,
      editing: false,
      hidden: false
    })
    .map(props => reducer$.fold((state, reducer) => reducer(state), props))
    .flatten().remember();
}
