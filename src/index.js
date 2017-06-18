import { run } from '@cycle/run'
import { makeDOMDriver } from '@cycle/dom'
import { makeHistoryDriver } from '@cycle/history';
import { App } from './app'
import createHistory from 'history/createBrowserHistory';
import storageDriver from '@cycle/storage';

const main = App

const drivers = {
  DOM: makeDOMDriver('#app'),
  History: makeHistoryDriver(createHistory(), { capture: true }),
  storage: storageDriver
};

run(main, drivers)
