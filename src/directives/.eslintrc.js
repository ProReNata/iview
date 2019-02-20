module.exports = {
  overrides: [
    {
      files: ['transfer-dom.js'],
      rules: {
        'no-underscore-dangle': ['error', {allow: ['__transferDomData']}],
      },
    },
  ],
};
