import pad from 'Global/Assets/pad';
import minutesFromHHMM from 'Global/Assets/minutesFromHHMM';
import {SECONDS_IN_MINUTE} from 'Global/Assets/time';

export default function incrementTimeString(hhmm, addMinutes = 0) {
  const minutes = minutesFromHHMM(hhmm) + addMinutes;

  return [Math.floor(minutes / SECONDS_IN_MINUTE), minutes % SECONDS_IN_MINUTE].map(pad).join(':');
}
