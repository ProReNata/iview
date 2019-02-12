import parseTimeString from 'Global/Assets/parseTimeString';
import {MINUTES_IN_HOUR} from 'Global/Assets/time';

export default function minutesFromHHMM(hhmm) {
  const [h, m] = parseTimeString(hhmm);

  return h * MINUTES_IN_HOUR + m;
}
