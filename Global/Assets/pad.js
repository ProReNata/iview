export default function pad(nr) {
  return nr < 10 ? `0${nr}` : `${nr}`;
}
