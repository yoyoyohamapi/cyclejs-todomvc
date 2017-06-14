import { footer, ul, span, strong, a, li, button } from '@cycle/dom';

const filters = ['All', 'Active', 'Completed'];

export default function view(state$) {
  return state$.map(({ leftCount, filter }) => {
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
