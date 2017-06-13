export default function model(action$) {
  const newReducer$ = action$
    .filter(action => action.type === 'new')
    .map(action => function newReducer(state) {
      return {
        newTodo: action.payload
        ...state
      };
    });

  return newReducer$;
};
