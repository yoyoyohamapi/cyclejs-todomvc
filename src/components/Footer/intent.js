import xs from 'xstream';

export default function intent(sources) {
  return xs.merge(
    // 清除已完成的 todo
    sources.DOM.select('.clear-completed')
    .events('click')
    .mapTo({ type: 'clear' })
  );
}
