import intent from './intent';
import model from './model';
import view from './view';

export default function Footer(sources) {
  const action$ = intent(sources);
  const state$ = model(action$);
  const vtree$ = view(state$);

  return {
    DOM: vtree$,
    action$,
    state$
  };
}
