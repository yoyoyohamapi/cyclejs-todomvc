import xs from 'xstream';

export default function intent(sources) {
  return xs.merge(
    sources.DOM.select('.toggle')
    .events('change')
    .map(evt => evt.target.checked)
    .mapTo({ type: 'toggle' }),

    sources.DOM.select('label')
    .events('dblclick')
    .mapTo({ type: 'startEdit' }),

    sources.DOM.select('.edit')
    .events('keyup')
    .filter(evt => evt.keyCode === 13)
    .map(evt => ({ type: 'doneEdit', title: evt.target.value })),

    sources.DOM.select('.destroy')
    .events('click')
    .mapTo({ type: 'destroy' })
  );
}
