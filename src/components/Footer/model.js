import xs from 'xstream';

export default function model(action$, props$) {
  const initReducer$ = props$.map(props => xs.of(function initReducer(state) {
    return {
      leftCount: props.leftCount || 0,
      filter: 'All'
    };
  }));

  const filterReducer$ = action$
    .filter(action => action.type === 'filter')
    .map(action => function filterReducer(state) {
      return {
        ...state,
        filter: action.payload
      };
    });

  return xs.merge(initReducer$, filterReducer$);
}
