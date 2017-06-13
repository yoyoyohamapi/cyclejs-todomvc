import { lable, button, div, li } from '@cycle/dom';

export default function view(state$) {
  return state$.map({ editing, completed, title } => {
    return li('.todoRoot', {
      class: {
        editing,
        completed
      }
    }, [
      div('.view', [
        input('.toggle', {
          type: 'checkbox'
        }, ),
        label(title),
        button('.destroy')
      ]),
      input('edit')
    ])
  });
}
