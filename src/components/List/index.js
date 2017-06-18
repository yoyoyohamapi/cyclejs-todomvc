import xs from 'xstream';

import intent from './intent';
import model from './model';
import view from './view';

import isolate from '@cycle/isolate';
import Header from '../Header';
import Task from '../Task';
import Footer from '../Footer';
const filters = ['All', 'Active', 'Completed'];

let _id = 0;

const id = function () {
  return _id++;
}

const TaskWrapper = function (sources) {
  return function TaskComponent(id, todo) {
    const task = isolate(Task)({
      DOM: sources.DOM,
      props$: xs.of(todo)
    });
    return {
      ...task,
      action$: task.action$.map(action => ({ ...action, id }))
    };
  }
};

export default function List(sources) {
  const headerSinks = Header(sources);
  const headerAction$ = headerSinks.action$;

  const actionProxy$ = xs.create();

  const action$ = intent({
    DOM: sources.DOM,
    History: sources.History,
    action$: actionProxy$
  });

  const state$ = model(action$, TaskWrapper(sources));

  const footerSinks$ = state$.map(({ todos, filter }) => Footer({
    DOM: sources.DOM,
    props$: xs.of({ todos: todos.map(todo => todo), filter, filters })
  }));

  const footerAction$ = footerSinks$.map(sinks => sinks.action$).flatten();
  const footerVtree$ = footerSinks$.map(sinks => sinks.DOM).flatten();

  const taskAction$ = state$
    .map(({ todos }) => xs.merge(...todos.map(todo => todo.action$)))
    .flatten();

  actionProxy$.imitate(xs.merge(
    headerAction$,
    footerAction$,
    taskAction$
  ));

  const tasksVtree$ = state$
    .map(({ todos }) => xs.combine(...todos.map(todo => todo.DOM)))
    .flatten();

  const combinedState$ = xs.combine(
    state$,
    headerSinks.DOM,
    tasksVtree$,
    footerVtree$
  ).map(([state, header, tasks, footer]) => {
    return {
      state,
      header,
      footer,
      tasks
    };
  });

  const vtree$ = view(combinedState$);

  return {
    DOM: vtree$
  };
}
