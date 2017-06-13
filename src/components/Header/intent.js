import xs from 'xstream';

export default function intent(sources) {
  return xs.merge(
    sources.DOM.select('input')
    .events('keyup')
    .filter(evt => evt.keycode === 13)
    .map(evt => String(ev.target.value).trim())
    .filter(value => value.length > 0)
    .map(payload => ({ type: 'new', payload }))
  );
};
