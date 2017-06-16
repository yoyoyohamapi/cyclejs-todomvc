import xs from 'xstream';

export default function model(action$, props$) {
  return props$
    .startWith({ todos: [], filter: 'All', filters: [] })
    .map(props => props).remember();
}
