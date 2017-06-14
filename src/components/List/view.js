import { section, div } from '@cycle/dom';

export default function view(state$) {
  const vtree$ = state$.map(({header, tasks, footer}) => {
    return section('.todoapp', [
      div([
        header,
        section('.main', tasks),
        footer
      ])
    ]);
  });

  return {
    DOM: vtree$
  };
};
