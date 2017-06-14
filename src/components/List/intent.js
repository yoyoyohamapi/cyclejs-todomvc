import xs from 'xstream';

export default function intent(sources) {
  return xs.merge(
    sources.action$
      .filter(action => action.type === 'delete')
      .map(action => ({type: 'delete', payload: action.payload})),

    sources.action$
      .filter(action => action.type === 'new')
      .map(action => ({type: 'new', payload: action.payload})),

    sources.action$
      .filter(action => action.type === 'clear')
      .mapTo({type: 'clear'})
  );
}
