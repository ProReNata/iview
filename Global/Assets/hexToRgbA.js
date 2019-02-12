export default function hexToRgbA(hex, opacity = 1) {
  const isHexFormat = /^#([a-f\d]{3}){1,2}$/i.test(hex);

  if (isHexFormat) {
    let c = hex.slice(1).split('');

    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }

    c = `0x${c.join('')}`;

    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')},${opacity})`; /* eslint-disable-line no-bitwise */
  }

  return null;
}
