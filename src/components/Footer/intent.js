import xs from 'xstream';

export default function intent(sources) {
  return xs.merge(
    sources.DOM.select('.clear-completed')
    .events('click')
    .mapTo({ type: 'clear' })
  );
}
