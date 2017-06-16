import xs from 'xstream';

export default function intent(sources) {
  return xs.merge(
    // 完成/取消完成 todo
    sources.DOM.select('.toggle')
    .events('change')
    .map(evt => evt.target.checked)
    .mapTo({ type: 'toggle' }),

    // 进入/退出编辑态
    sources.DOM.select('label')
    .events('dblclick')
    .mapTo({ type: 'startEdit' }),

    sources.DOM.select('.edit')
    .events('keyup')
    .filter(evt => evt.keyCode === 13)
    .map(evt => ({ type: 'doneEdit', title: evt.target.value })),

    // 删除 Todo
    sources.DOM.select('.destroy')
    .events('click')
    .mapTo({ type: 'destroy' })
  );
}
