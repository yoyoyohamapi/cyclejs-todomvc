import { section, div, ul } from '@cycle/dom';

export default function view(state$) {
  return state$.map(({ header, tasks, footer }) => {
    return section('.todoapp', [
      div([
        header,
        section('.main', ul('.todo-list', tasks)),
        footer
      ])
    ]);
  });
};
