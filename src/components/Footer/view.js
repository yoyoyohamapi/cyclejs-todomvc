import { footer, ul, span, strong, a, li, button } from '@cycle/dom';

const filters = ['All', 'Active', 'Completed'];

export default function view(state$) {
  const leftCount = todos.filter(todo => !todo.completed).length
  return state$.map({ todos, filter } => {
    return footer('.footer', [
      span('.todo-count', [
        strong(leftCount),
        ' items left'
      ]),
      ul('.filters',
        filters.map(f => li({
          class: {selected: f === filter},
          href: `#/${filter.toLowerCase()}`
        }))
      ),
      button('.clear-completed', `Clear completed (${leftCount})`)
    ]);
  });
}
