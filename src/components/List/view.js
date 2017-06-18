import { section, div, ul, input, label } from '@cycle/dom';

export default function view(state$) {
  return state$.map(({ state, header, tasks, footer }) => {
    const allCompleted = state.todos.every(todo => todo.completed);
    return section('.todoapp', [
      div([
        header,
        section('.main', [
          input('.toggle-all', {
            props: {
              type: 'checkbox',
              checked: allCompleted
            }
          }),
          label(''),
          ul('.todo-list', tasks)
        ]),
        footer
      ])
    ]);
  });
};
