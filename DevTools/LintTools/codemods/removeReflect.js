/*
USAGE:
 - run: node dev-tools/LintTools/codemods/removeReflect.js
 - run: ./node_modules/.bin/eslint --ext .js,.vue . --fix
*/

const fs = require('fs');
const nodePath = require('path');

const j = require('jscodeshift');
const getFiles = require('../../Utils/getFiles');

const APP_ROOT = nodePath.join(__dirname, '../../../');
const scriptContent = /<script>[\s\S]+<\/script>/;

const ignoredFiles = require('./ignoredFiles');

const transformers = {
  construct(callExpression) {
    const [construct, ArrayExpression] = callExpression.value.arguments;

    return j.newExpression(construct, ArrayExpression.elements);
  },
  deleteProperty(callExpression) {
    const [obj, key] = callExpression.value.arguments;

    return j.unaryExpression('delete', j.memberExpression(obj, key));
    /* OR:
        const code = `
          return Object.keys(${obj.name}).reduce((obj, key) => {
            if (key === '${key.value}') return obj;
            else return {
              ...obj,
              ['${key.value}']: ${obj.name}['${key.value}'],
            };
          }, {})`;
          return code;
    */
  },
  get(callExpression) {
    const [obj, key] = callExpression.value.arguments;

    return j.memberExpression(obj, key);
  },
  has(callExpression) {
    const [obj, key] = callExpression.value.arguments;

    return j.binaryExpression('in', key, obj);
  },
  set(callExpression) {
    const [obj, key, value] = callExpression.value.arguments;

    return j.assignmentExpression('=', j.memberExpression(obj, key), value);
  },
};

const transform = (file) =>
  j(file.source)
    .find(j.Identifier, {name: 'Reflect'})
    .forEach((reflectIndetifier) => {
      const callExpression = reflectIndetifier.parentPath.parentPath;
      const expressionStatement = callExpression.parentPath;

      const ReflectAction = callExpression.value.callee.property.name;
      const transformer = transformers[ReflectAction];
      const transformed = transformer(callExpression);
      console.log('\nFROM:', j(callExpression).toSource(), '\nTO:', j(transformed).toSource());

      if (expressionStatement.name === 'arguments') {
        // case inside another function call
        expressionStatement.parentPath.value.arguments = [transformed];
      } else if (expressionStatement.value.type === 'ReturnStatement') {
        expressionStatement.value.argument = transformed;
      } else if (expressionStatement.value.type === 'IfStatement') {
        expressionStatement.value.test = transformed;
      } else {
        expressionStatement.value.expression = transformed;
      }
    })
    .toSource();

function processFile(file) {
  const shouldIgnore = ignoredFiles.find((ignoredPath) => file.includes(ignoredPath));

  if (shouldIgnore) {
    return;
  }

  console.log('Processing:', file);
  const isVueFile = Boolean(file.match(/.vue$/));

  const fileContent = fs.readFileSync(file, 'utf8');
  let source = fileContent;

  if (isVueFile) {
    const match = fileContent.match(scriptContent);

    if (!match) {
      return;
    }

    source = match[0].slice('<script>'.length, -'</script>'.length);
  }

  // console.log('::: SOURCE :::');
  // console.log(source);

  const transformed = transform({source});

  // console.log('::: JSCODESHIFT :::');
  // console.log(transformed);

  const newContent = isVueFile ? fileContent.replace(scriptContent, `<script>${transformed}</script>`) : transformed;

  // For testing use:
  // fs.writeFileSync(`${__dirname}/test.vue`, newContent);
  fs.writeFileSync(file, newContent);
}

['.js', '.vue'].forEach((type) => {
  getFiles(APP_ROOT, type)
    .then((files) => {
      // if needed for debug:
      // files = files.filter((p) => p.includes('Modules/Calendar/Store/store.js'));
      const sourceFiles = files.filter((filePath) => !filePath.includes('node_modules') && !filePath.includes('sandbox'));
      console.log('Found', sourceFiles.length, 'files of type:', type);
      sourceFiles.forEach(processFile);

      return sourceFiles;
    })
    .catch((err) => console.log(err));
});
