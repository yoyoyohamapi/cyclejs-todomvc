import xs from 'xstream';

import intent from './intent';
import model from './model';
import view from './view';

import isolate from '@cycle/isolate';
import Header from '../Header';
import Task from '../Task';
import Footer from '../Footer';

export default function List( sources ) {
  const headerSinks = Header( sources );

  const actionProxy$ = xs.create();

  const action$ = intent( {
    DOM: sources.DOM,
    action$: actionProxy$
  } );

  const state$ = model( action$ );

  state$.subscribe( x => console.log( x ) );

  const combinedState$ = state$.map( ( { todos } ) => {
    const tasks = todos.map( todo => isolate( Task, todo.id )( {
      DOM: sources.DOM,
      props$: xs.of( todo )
    } ) );
    const footerSinks = Footer( {
      DOM: sources.DOM,
      props$: xs.of( { leftCount: todos.filter( todo => !todo.completed ).length } )
    } );
    actionProxy$.imitate(
      xs.merge(
        headerSinks.action$,
        footerSinks.action$,
        xs.merge(
          tasks.map( sinks => sinks.action$ )
        ).flatten()
      )
    );
    console.log(111);
    return xs.combine(
      headerSinks.DOM,
      tasks.map( sinks => sinks.DOM ),
      footerSinks.DOM
    ).map( ( [ header, tasks, footer ] ) => {
      return {
        header,
        footer,
        tasks
      };
    } );
  } ).flatten();

  const vtree$ = view( combinedState$ );

  return {
    DOM: vtree$
  };
}
