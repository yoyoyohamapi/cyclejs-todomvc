import xs from 'xstream';
import dropRepeats from 'xstream/extra/dropRepeats';

export default function intent(sources) {
  return xs.merge(
    sources.History
    .startWith({ hash: '#/all' })
    .map(location => location.hash)
    .compose(dropRepeats())
    .map(hash => ({ type: 'filter', filter: hash.replace('#/', '') })),

    sources.action$
    .filter(action => action.type === 'destroy')
    .map(({ id }) => ({ type: 'destroy', id })),

    sources.action$
    .filter(action => action.type === 'new')
    .map(action => ({ type: 'new', title: action.title })),

    sources.action$
    .filter(action => action.type === 'clear')
    .mapTo({ type: 'clear' }),

    sources.action$
    .filter(action => action.type === 'toggle')
    .map(({ id }) => ({ type: 'toggle', id })),

    sources.DOM
    .select('.toggle-all + label')
    .events('click')
    .mapTo({ type: 'toggleAll' }),

    sources.action$
    .filter(action => action.type === 'doneEdit')
    .map(({ id, title }) => ({ type: 'doneEdit', id, title }))
  );
}
