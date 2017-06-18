import { footer, ul, span, strong, a, li, button } from '@cycle/dom';

export default function view(state$) {
  return state$.map(({ todos, filter, filters }) => {
    const leftCount = todos.filter(todo => !todo.completed).length;
    const completedCount = (todos.length || 0) - leftCount;
    return footer('.footer', [
      span('.todo-count', [
        strong(leftCount),
        ' items left'
      ]),
      ul(
        '.filters',
        filters.map(f => li([
          a({
            props: { href: `#/${f.toLowerCase()}` },
            class: { selected: f.toUpperCase() == filter.toUpperCase() }
          }, f)
        ]))
      ),
      button('.clear-completed', `Clear completed (${completedCount})`)
    ]);
  });
}
