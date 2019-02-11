const fs = require('fs');
const path = require('path');

const currentRootPath = path.resolve(__dirname, '../../');
const xmlFilePath = path.resolve(__dirname, '../watchers.xml');
const byxelkrokConfig = fs.readFileSync(xmlFilePath, 'utf8');
const adaptedConfig = byxelkrokConfig.replace(/__ProjectRoot__/g, currentRootPath);

fs.writeFileSync(xmlFilePath, adaptedConfig, 'utf8');
