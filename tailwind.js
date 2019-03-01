const lessVariables = require('./src/styles/less/colors.js');

let colors = lessVariables.color;

module.exports = {

  colors: colors,

  screens: {
    'sm': '576px',
    'md': '768px',
    'lg': '992px',
    'xl': '1200px',
  },

  fonts: {},

  textSizes: {
    'xs': '.75rem',     // 12px
    'sm': '.875rem',    // 14px
    'base': '1rem',     // 16px
    'lg': '1.125rem',   // 18px
    'xl': '1.25rem',    // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
  },

  fontWeights: {
    'hairline': 100,
    'thin': 200,
    'light': 300,
    'normal': 400,
    'medium': 500,
    'semibold': 600,
    'bold': 700,
    'extrabold': 800,
    'black': 900,
  },

  leading: {
    'none': 1,
    'tight': 1.25,
    'normal': 1.5,
    'loose': 2,
  },

  tracking: {
    'tight': '-0.05em',
    'normal': '0',
    'wide': '0.05em',
  },

  textColors: colors,

  backgroundColors: colors,

  backgroundSize: {},

  borderWidths: {
    default: '1px',
    '0': '0',
    '2': '2px',
    '4': '4px',
    '8': '8px',
  },

  borderColors: global.Object.assign({ default: colors['s200'] }, colors),

  borderRadius: {
    'none': '0',
    'sm': '.125rem',
    default: '.25rem',
    'lg': '.5rem',
    'full': '9999px',
  },

  width: {
    'auto': 'auto',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '8': '2rem',
    '10': '2.5rem',
    '12': '3rem',
    '16': '4rem',
    '24': '6rem',
    '32': '8rem',
    '48': '12rem',
    '64': '16rem',
    'full': '100%',
    'screen': '100vw',
  },

  height: {
    'auto': 'auto',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '8': '2rem',
    '10': '2.5rem',
    '12': '3rem',
    '16': '4rem',
    '24': '6rem',
    '32': '8rem',
    '48': '12rem',
    '64': '16rem',
    'full': '100%',
    'screen': '100vh',
  },

  minWidth: {
    '0': '0',
    'full': '100%',
  },

  minHeight: {
    '0': '0',
    'full': '100%',
    'screen': '100vh',
  },

  maxWidth: {
    'full': '100%',
  },

  maxHeight: {
    'full': '100%',
    'screen': '100vh',
  },

  padding: {
    'px': '1px',
    '0': '0',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '8': '2rem',
    '10': '2.5rem',
    '12': '3rem',
    '16': '4rem',
    '20': '5rem',
    '24': '6rem',
    '32': '8rem',
  },

  margin: {
    'auto': 'auto',
    '0': '0',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '8': '2rem',
    '10': '2.5rem',
    '12': '3rem',
    '16': '4rem',
    '20': '5rem',
    '24': '6rem',
    '32': '8rem',
  },

  negativeMargin: {
    'px': '1px',
    '0': '0',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '8': '2rem',
    '10': '2.5rem',
    '12': '3rem',
    '16': '4rem',
    '20': '5rem',
    '24': '6rem',
    '32': '8rem',
  },

  shadows: {
    default: '0 2px 12px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.06)',
    'none': 'none',
  },

  zIndex: {
    'auto': 'auto',
    '0': 0,
    '10': 10,
    '20': 20,
    '30': 30,
    '40': 40,
    '50': 50,
  },

  opacity: {
    '0': '0',
    '25': '.25',
    '50': '.5',
    '75': '.75',
    '100': '1',
  },

  svgFill: {
    'current': 'currentColor',
  },

  svgStroke: {
    'current': 'currentColor',
  },

  modules: {
    appearance: false,
    backgroundAttachment: false,
    backgroundColors: [],
    backgroundPosition: false,
    backgroundRepeat: false,
    backgroundSize: false,
    borderCollapse: false,
    borderColors: [],
    borderRadius: [],
    borderStyle: [],
    borderWidths: [],
    cursor: ['responsive', 'hover', 'focus'],
    display: false,
    flexbox: ['responsive'],
    float: false,
    fonts: false,
    fontWeights: [],
    height: [],
    leading: [],
    lists: false,
    margin: [],
    maxHeight: [],
    maxWidth: [],
    minHeight: [],
    minWidth: [],
    negativeMargin: [],
    objectFit: false,
    objectPosition: false,
    opacity: false,
    outline: false,
    overflow: [],
    padding: [],
    pointerEvents: false,
    position: false,
    resize: false,
    shadows: ['responsive', 'hover', 'focus'],
    svgFill: [],
    svgStroke: [],
    tableLayout: false,
    textAlign: [],
    textColors: [],
    textSizes: [],
    textStyle: [],
    tracking: [],
    userSelect: [],
    verticalAlign: false,
    visibility: false,
    whitespace: false,
    width: [],
    zIndex: [],
  },

  plugins: [],

  options: {
    prefix: '',
    important: false,
    separator: ':',
  },

};
