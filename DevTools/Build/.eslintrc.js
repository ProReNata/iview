module.exports = {
  overrides: [
    {
      files: ['ByxelkrokPlugin.js'],
      rules: {
        'promise/no-promise-in-callback': 'off',
        'promise/no-nesting': 'off',
      },
    },
    {
      files: ['CreateProductionSourcemap.js'],
      rules: {
        'no-underscore-dangle': ['error', {allow: ['_value']}],
      },
    },
  ],
};
