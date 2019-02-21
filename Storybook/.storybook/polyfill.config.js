import '@babel/polyfill';
import {EventSource} from 'event-source-polyfill';

if (typeof window.EventSource !== 'function') {
  window.EventSource = EventSource;
}
