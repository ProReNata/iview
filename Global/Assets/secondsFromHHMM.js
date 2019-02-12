import minutesFromHHMM from 'Global/Assets/minutesFromHHMM';
import {SECONDS_IN_MINUTE} from 'Global/Assets/time';

export default function secondsFromHHMM(hhmm) {
  return minutesFromHHMM(hhmm) * SECONDS_IN_MINUTE;
}
