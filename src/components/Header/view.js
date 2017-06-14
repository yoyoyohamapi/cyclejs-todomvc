import { header, h1, input } from '@cycle/dom';

export default function view(state$) {
  return state$.map(state =>
    header('.header', [
      h1('todos'),
      input('.new-todo', {
        placeholder: 'What needs to be done?',
        name: 'newTodo'
      })
    ])
  );
}
