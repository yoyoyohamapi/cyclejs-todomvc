import intent from './intent';
import model from './model';
import view from './view';

export default function Task(sources) {
  const action$ = intent(sources);
  const state$ = model(action$, sources.props$);
  const vtree$ = view(state$);

  return {
    DOM: vtree$,
    action$,
    state$
  };
}
