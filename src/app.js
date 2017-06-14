import {div} from '@cycle/dom'
import xs from 'xstream'
import List from './components/List';

export function App (sources) {
  return List(sources);
}
