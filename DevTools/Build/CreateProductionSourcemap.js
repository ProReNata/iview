/**
 * @file Webpack plugin to build the production sourcemap and add the URL.
 * @copyright Copyright (c) 2017, ProReNata AB
 * @author Graham Fairweather <graham.fairweather@prorenata.se>
 * @module CreateProductionSourcemap
 * @version 2.0.0
 * @see {@link https://github.com/webpack/docs/wiki/how-to-write-a-plugin} for further information.
 */

const {ConcatSource, RawSource} = require('webpack-sources');
const utils = require('./utils');

const PLUGIN_NAME = 'CreateProductionSourcemap';

class CreateProductionSourcemap {
  constructor(options = {}) {
    Object.defineProperties(
      this,
      /** @lends CreateProductionSourcemap# */ {
        sourceMapFilename: {
          value: utils.getStringOption(options, 'sourceMapFilename', '[file].map'),
        },
        sourceMappingURLComment: {
          value: utils.getStringOption(options, 'append', '\n//# sourceMappingURL=[url]'),
        },
      },
    );
  }

  apply(compiler) {
    const {filename, sourceMapFilename} = compiler.options.output;

    const onEmit = (compilation, callback) => {
      const {assets} = compilation;

      const outputFileName = this.sourceMapFilename.replace('[file]', filename);
      const sourceMapComment = this.sourceMappingURLComment.replace('[url]', outputFileName);

      utils.stdout(`Preparing production sourcemap: ${utils.quote(outputFileName)}`, false);
      const assetName = sourceMapFilename.replace('[file]', filename);
      const withoutSource = JSON.parse(assets[assetName]._value);

      delete withoutSource.sourcesContent;
      assets[outputFileName] = new RawSource(JSON.stringify(withoutSource));
      assets[filename] = new ConcatSource(new RawSource(assets[filename].source()), sourceMapComment);
      utils.stdout(utils.DONE_MSG);
      callback();
    };

    if (compiler.hooks) {
      compiler.hooks.emit.tapAsync(PLUGIN_NAME, onEmit);
    } else {
      compiler.plugin('emit', onEmit);
    }
  }
}

module.exports = CreateProductionSourcemap;
