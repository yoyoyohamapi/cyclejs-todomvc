import xs from 'xstream';

export default function intent(sources) {
  return xs.merge(
    // 筛选 todo
    sources.DOM.select('.filters > li > a')
      .events('click')
      .map(evt => evt.target.textContent)
      .map(payload => ({type: 'filter', payload})),

    // 清除已完成的 todo
    sources.DOM.select('.clear-completed')
      .events('click')
      .mapTo({type: 'clear'})
  );
}
