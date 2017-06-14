import { section, div } from '@cycle/dom';

export default function view(state$) {
  return state$.map(({header, tasks, footer}) => {
    return section('.todoapp', [
      div([
        header,
        section('.main', tasks),
        footer
      ])
    ]);
  });
};
