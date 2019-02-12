export default function collidesWith(a, b) {
  return a.end > b.start && a.start < b.end;
}
