import { section, } from '@cycle/dom';
import Header from './Header';
import Task from './Task';
import Footer from './Footer';
import isolate from '@cycle/isolate';

const todos = [];

export default function List(sources) {
  const headerSinks = Header(sources);
  const taskSinks = todos.map(todo => isolate(Task, todo.id)(sources));
  const footerSinks = Footer(sources);

  return xs.combine(
    headerSinks.DOM,
    taskSinks.DOM,
    footerSinks.DOM
  ).map(([header, task, footer]) => {
    return section('.todoapp', [
      div([
        header,
        section('.main', todos.map()),
        footer
      ])
    ])
  });
};
