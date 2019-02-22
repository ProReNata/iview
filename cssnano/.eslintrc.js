module.exports = {
  overrides: [
    {
      files: ['cssnano.config.js'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
          },
        ],
        'no-console': 'off',
      },
    },
  ],
};
