import { run } from '@cycle/run'
import { makeDOMDriver } from '@cycle/dom'
import { makeHistoryDriver } from '@cycle/history';
import { App } from './app'
import createHistory from 'history/createHashHistory';

const main = App

const drivers = {
  DOM: makeDOMDriver('#app'),
  History: makeHistoryDriver(createHistory(), { capture: true })
};

run(main, drivers)
