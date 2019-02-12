export default function getPointerCoordinates(e) {
  const isMouse = e.type.includes('mouse');

  return {
    x: isMouse ? e.pageX : e.changedTouches[0].pageX,
    y: isMouse ? e.pageY : e.changedTouches[0].pageY,
  };
}
