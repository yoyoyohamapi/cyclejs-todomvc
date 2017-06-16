import xs from 'xstream';

export default function intent(sources) {
  return xs.merge(
    sources.DOM.select('.new-todo')
    .events('keyup')
    .filter(evt => evt.keyCode === 13)
    .map(evt => String(evt.target.value).trim())
    .filter(value => value.length > 0)
    .map(title => ({ type: 'new', title }))
  );
};
