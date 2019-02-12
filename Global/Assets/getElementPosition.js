import isNil from 'lodash/isNil';
import getSecondsInDay from 'Global/Assets/getSecondsInDay';
import toCssDimention from 'Global/Assets/toCssDimension';
import {MS_IN_SECOND} from 'Global/Assets/time';

const MarginPx = 4;

export default function getElementPosition(instance, td, props, noMargin) {
  const propsObj = isNil(props) ? {} : {...props};
  const tableBCR = instance.table.getBoundingClientRect();
  const length = 100 / instance.settings.dayLength;
  const tdBCR = td.getBoundingClientRect();
  const diff = getSecondsInDay(propsObj.start) - instance.settings.dayStart;
  // this is not easy to set in CSS, needs "calc(x% - ypx)" so I keep it here so far
  const margin = noMargin ? -MarginPx : MarginPx;
  const left = tdBCR.left - tableBCR.left + margin;
  const width = tdBCR.width - (margin + MarginPx);
  const position = {
    left: toCssDimention((left * 100) / instance.table.clientWidth, '%'),
    top: toCssDimention(diff * length, '%'),
    width: toCssDimention((width * 100) / tableBCR.width, '%'),
  };

  if (propsObj.end) {
    const duration = (propsObj.end - propsObj.start) / MS_IN_SECOND;
    position.height = toCssDimention(duration * length, '%');
  }

  return position;
}
