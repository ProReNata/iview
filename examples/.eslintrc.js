module.exports = {
  overrides: [
    {
      files: ['*.{js,vue}'],
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
