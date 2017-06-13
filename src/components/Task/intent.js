import xs from 'xstream';

export default function intent(sources) {
  return xs.merge(
    // 完成/取消完成 todo
    sources.DOM.select('.toggle')
      .events('change')
      .map(evt => evt.target.checked)
      .map(payload => ({type: 'toggle', payload})),

    // 进入/退出编辑态
    sources.DOM.select('label')
      .events('click')
      .mapTo({type: 'toggleEdit'}),

    // 删除 Todo
    sources.DOM.select('.destroy')
      .events('click')
      .mapTo({type: 'delete'})
  );
}
