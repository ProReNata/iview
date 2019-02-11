/*

USAGE:
 - run: node dev-tools/LintTools/maxAttributesPerLine.js
 - run: ./node_modules/.bin/eslint --ext .js,.vue . --fix

*/

const fs = require('fs');
const path = require('path');
const css2less = require('css2less');
const getFiles = require('../Utils/getFiles');

const APP_ROOT = path.join(__dirname, '../../');
const styleContent = /<style[^>]*>([\s\S]+)<\/style>/;
const css2lessOptions = {
  indentSize: 2,
  indentSymbol: ' ',
};

function processFile(file) {
  console.log('Processing:', file);

  const fileContent = fs.readFileSync(file, 'utf8');
  const styleString = fileContent.match(styleContent);

  if (!styleString) {
    return;
  }

  const css = styleString[1];
  const styleBlock = styleString[0];

  const less = `<style lang="less">\n${css2less(css, css2lessOptions)}</style>`;
  const newContent = `${fileContent.replace(styleBlock, less)}\n`;

  fs.writeFileSync(file, newContent);
  // fs.writeFileSync(__dirname + '/test.vue', newContent);
}

getFiles(APP_ROOT, '.vue')
  .then((files) => {
    const sourceFiles = files.filter((filePath) => !filePath.includes('node_modules') && !filePath.includes('sandbox'));
    console.log('Found', sourceFiles.length);
    sourceFiles.forEach(processFile);

    return sourceFiles;
  })
  .catch((err) => console.log(err));
