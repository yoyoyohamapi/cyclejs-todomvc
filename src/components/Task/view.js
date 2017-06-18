import { label, button, div, li, input } from '@cycle/dom';

export default function view(state$) {
  return state$.map(({ id, editing, completed, hidden, title }) => {
    return li('.todoRoot', {
      class: {
        editing,
        completed
      },
      style: {
        display: hidden ? 'none' : 'block'
      }
    }, [
      div('.view', [
        input('.toggle', {
          props: { type: 'checkbox', checked: completed }
        }),
        label(title),
        button('.destroy')
      ]),
      input('.edit', {
        props: { type: 'text' },
        hook: {
          update: (oldVNode, { elm }) => {
            elm.value = title;
            if (editing) {
              elm.focus();
              elm.selectionStart = elm.value.length;
            }
          }
        }
      })
    ])
  });
}
