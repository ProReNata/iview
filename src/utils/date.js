import noop from 'lodash/noop';

// 把 YYYY-MM-DD 改成了 yyyy-MM-dd

/**
 * Parse or format dates
 * @class fecha
 */
const fecha = {};
const token = /d{1,4}|M{1,4}|yy(?:yy)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;
const twoDigits = /\d\d?/;
const threeDigits = /\d{3}/;
const fourDigits = /\d{4}/;
const word = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF/]+(\s*?[\u0600-\u06FF]+){1,2}/i;

function shorten(arr, sLen) {
  const newArr = [];
  for (let i = 0, len = arr.length; i < len; i += 1) {
    newArr.push(arr[i].substr(0, sLen));
  }

  return newArr;
}

function monthUpdate(arrName) {
  return function _monthUpdate(d, v, i18n) {
    const index = i18n[arrName].indexOf(v.charAt(0).toUpperCase() + v.substr(1).toLowerCase());

    if (index !== -1) {
      d.month = index;
    }
  };
}

function pad(value, length) {
  let val = String(value);
  const len = length || 2;
  while (val.length < len) {
    val = `0${val}`;
  }

  return val;
}

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const monthNamesShort = shorten(monthNames, 3);
const dayNamesShort = shorten(dayNames, 3);
fecha.i18n = {
  amPm: ['am', 'pm'],
  dayNames,
  dayNamesShort,
  DoFn: function DoFn(D) {
    return D + ['th', 'st', 'nd', 'rd'][D % 10 > 3 ? 0 : ((D - (D % 10) !== 10) * D) % 10];
  },
  monthNames,
  monthNamesShort,
};

const formatFlags = {
  a(dateObj, i18n) {
    return dateObj.getHours() < 12 ? i18n.amPm[0] : i18n.amPm[1];
  },
  A(dateObj, i18n) {
    return dateObj.getHours() < 12 ? i18n.amPm[0].toUpperCase() : i18n.amPm[1].toUpperCase();
  },
  d(dateObj) {
    return dateObj.getDate();
  },
  D(dateObj) {
    return dateObj.getDay();
  },
  dd(dateObj) {
    return pad(dateObj.getDate());
  },
  DD(dateObj) {
    return pad(dateObj.getDay());
  },
  ddd(dateObj, i18n) {
    return i18n.dayNamesShort[dateObj.getDay()];
  },
  dddd(dateObj, i18n) {
    return i18n.dayNames[dateObj.getDay()];
  },
  Do(dateObj, i18n) {
    /* eslint-disable-next-line babel/new-cap */
    return i18n.DoFn(dateObj.getDate());
  },
  h(dateObj) {
    return dateObj.getHours() % 12 || 12;
  },
  H(dateObj) {
    return dateObj.getHours();
  },
  hh(dateObj) {
    return pad(dateObj.getHours() % 12 || 12);
  },
  HH(dateObj) {
    return pad(dateObj.getHours());
  },
  m(dateObj) {
    return dateObj.getMinutes();
  },
  M(dateObj) {
    return dateObj.getMonth() + 1;
  },
  mm(dateObj) {
    return pad(dateObj.getMinutes());
  },
  MM(dateObj) {
    return pad(dateObj.getMonth() + 1);
  },
  MMM(dateObj, i18n) {
    return i18n.monthNamesShort[dateObj.getMonth()];
  },
  MMMM(dateObj, i18n) {
    return i18n.monthNames[dateObj.getMonth()];
  },
  s(dateObj) {
    return dateObj.getSeconds();
  },
  S(dateObj) {
    return Math.round(dateObj.getMilliseconds() / 100);
  },
  ss(dateObj) {
    return pad(dateObj.getSeconds());
  },
  SS(dateObj) {
    return pad(Math.round(dateObj.getMilliseconds() / 10), 2);
  },
  SSS(dateObj) {
    return pad(dateObj.getMilliseconds(), 3);
  },
  yy(dateObj) {
    return String(dateObj.getFullYear()).substr(2);
  },

  yyyy(dateObj) {
    return dateObj.getFullYear();
  },
  ZZ(dateObj) {
    const o = dateObj.getTimezoneOffset();

    return (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + (Math.abs(o) % 60), 4);
  },
};

const parseFlags = {
  a: [
    word,
    function _a(d, v, i18n) {
      const val = v.toLowerCase();

      if (val === i18n.amPm[0]) {
        d.isPm = false;
      } else if (val === i18n.amPm[1]) {
        d.isPm = true;
      }
    },
  ],
  d: [
    twoDigits,
    function _d(d, v) {
      d.day = v;
    },
  ],
  D: [twoDigits, noop],
  ddd: [word, noop],
  h: [
    twoDigits,
    function _h(d, v) {
      d.hour = v;
    },
  ],
  m: [
    twoDigits,
    function _m(d, v) {
      d.minute = v;
    },
  ],
  M: [
    twoDigits,
    function _M(d, v) {
      d.month = v - 1;
    },
  ],
  MMM: [word, monthUpdate('monthNamesShort')],
  MMMM: [word, monthUpdate('monthNames')],
  s: [
    twoDigits,
    function _s(d, v) {
      d.second = v;
    },
  ],
  S: [
    /\d/,
    function _S(d, v) {
      d.millisecond = v * 100;
    },
  ],
  SS: [
    /\d{2}/,
    function _SS(d, v) {
      d.millisecond = v * 10;
    },
  ],
  SSS: [
    threeDigits,
    function _SSS(d, v) {
      d.millisecond = v;
    },
  ],
  yy: [
    twoDigits,
    function _yy(d, v) {
      const da = new Date();

      const cent = +`${da.getFullYear()}`.substr(0, 2);
      d.year = `${v > 68 ? cent - 1 : cent}${v}`;
    },
  ],
  yyyy: [
    fourDigits,
    function _yyyy(d, v) {
      d.year = v;
    },
  ],
  ZZ: [
    /[+-]\d\d:?\d\d/,
    function _ZZ(d, v) {
      const parts = `${v}`.match(/([+-]|\d\d)/gi);

      let minutes;

      if (parts) {
        minutes = +(parts[1] * 60) + parseInt(parts[2], 10);
        d.timezoneOffset = parts[0] === '+' ? minutes : -minutes;
      }
    },
  ],
};
// parseFlags.DD = parseFlags.DD;
parseFlags.dddd = parseFlags.ddd;
parseFlags.Do = parseFlags.d;
parseFlags.dd = parseFlags.d;
parseFlags.mm = parseFlags.m;
parseFlags.hh = parseFlags.h;
parseFlags.H = parseFlags.h;
parseFlags.HH = parseFlags.h;
parseFlags.MM = parseFlags.M;
parseFlags.ss = parseFlags.s;
parseFlags.A = parseFlags.a;

// Some common format strings
fecha.masks = {
  default: 'ddd MMM dd yyyy HH:mm:ss',
  fullDate: 'dddd, MMMM d, yyyy',
  longDate: 'MMMM d, yyyy',
  longTime: 'HH:mm:ss.SSS',
  mediumDate: 'MMM d, yyyy',
  mediumTime: 'HH:mm:ss',
  shortDate: 'M/D/yy',
  shortTime: 'HH:mm',
};

/**
 * Format a date.
 *
 * @function format
 * @param {Date|number} dateObject - A date object or number to be parsed.
 * @param {string} maskString - Format of the date, i.e. 'mm-dd-yy' or 'shortDate'.
 * @param {Object} i18nSettings - Locale settings.
 */
fecha.format = function _format(dateObject, maskString, i18nSettings) {
  let dateObj = dateObject;
  const i18n = i18nSettings || fecha.i18n;

  if (typeof dateObj === 'number') {
    dateObj = new Date(dateObj);
  }

  if (Object.prototype.toString.call(dateObj) !== '[object Date]' || Number.isNaN(dateObj.getTime())) {
    throw new Error('Invalid Date in fecha.format');
  }

  const mask = fecha.masks[maskString] || maskString || fecha.masks.default;

  return mask.replace(token, ($0) => ($0 in formatFlags ? formatFlags[$0](dateObj, i18n) : $0.slice(1, $0.length - 1)));
};

/**
 * Parse a date string into an object, changes - into /.
 *
 * @function parse
 * @param {string} dateString - Date string.
 * @param {string} formatString - Date parse format.
 * @param {Object} i18nSettings - Locale settings.
 * @returns {Date|boolean} Date or a boolean.
 */
fecha.parse = function _parse(dateString, formatString, i18nSettings) {
  let dateStr = dateString;
  let format = formatString;
  const i18n = i18nSettings || fecha.i18n;

  if (typeof format !== 'string') {
    throw new Error('Invalid format in fecha.parse');
  }

  format = fecha.masks[format] || format;

  // Avoid regular expression denial of service, fail early for really long strings
  // https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS
  if (dateStr.length > 1000) {
    return false;
  }

  let isValid = true;
  const dateInfo = {};
  format.replace(token, ($0) => {
    if (parseFlags[$0]) {
      const info = parseFlags[$0];
      const index = dateStr.search(info[0]);

      if (index === -1) {
        isValid = false;
      } else {
        dateStr.replace(info[0], (result) => {
          info[1](dateInfo, result, i18n);
          dateStr = dateStr.substr(index + result.length);

          return result;
        });
      }
    }

    return parseFlags[$0] ? '' : $0.slice(1, $0.length - 1);
  });

  if (!isValid) {
    return false;
  }

  const today = new Date();

  if (dateInfo.isPm === true && dateInfo.hour != null && +dateInfo.hour !== 12) {
    dateInfo.hour = +dateInfo.hour + 12;
  } else if (dateInfo.isPm === false && +dateInfo.hour === 12) {
    dateInfo.hour = 0;
  }

  let date;

  if (dateInfo.timezoneOffset != null) {
    dateInfo.minute = +(dateInfo.minute || 0) - +dateInfo.timezoneOffset;
    date = new Date(
      Date.UTC(
        dateInfo.year || today.getFullYear(),
        dateInfo.month || 0,
        dateInfo.day || 1,
        dateInfo.hour || 0,
        dateInfo.minute || 0,
        dateInfo.second || 0,
        dateInfo.millisecond || 0,
      ),
    );
  } else {
    date = new Date(
      dateInfo.year || today.getFullYear(),
      dateInfo.month || 0,
      dateInfo.day || 1,
      dateInfo.hour || 0,
      dateInfo.minute || 0,
      dateInfo.second || 0,
      dateInfo.millisecond || 0,
    );
  }

  return date;
};

export default fecha;
