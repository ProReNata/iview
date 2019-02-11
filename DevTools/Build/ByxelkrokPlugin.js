/**
 * @file webpack plugin to copy the dist files to Eketorp's folder.
 * @copyright Copyright (c) 2017, ProReNata AB
 * @author Graham Fairweather <graham.fairweather@prorenata.se>
 * @module ByxelkrokPlugin
 * @version 2.0.0
 * @see {@link https://github.com/webpack/docs/wiki/how-to-write-a-plugin} for further information.
 */

const delayPromise = require('delay-promise-x').default;
const utils = require('./utils');

const NAME = 'ByxelkrokPlugin';
const PROMISE_MAIN_DELAY_MS = 0;

const createLintFilterPredicate = function createLintFilterPredicate(search) {
  return function lintFilterPredicate({error}) {
    return utils.getStringOption(error, 'message').includes(search);
  };
};

const lintErrorPredicate = createLintFilterPredicate('eslint error');
const lintWarningPredicate = createLintFilterPredicate('eslint warning');

const getLintFailDetail = function getLintFailDetail(lintErrors, lintWarnings) {
  if (lintErrors.length) {
    return `Errors: ${lintErrors.length}`;
  }

  if (lintWarnings.length) {
    return `Warnings: ${lintWarnings.length}`;
  }

  return utils.EMPTY_STRING;
};

const createAltLintFilterPredicate = function createAltLintFilterPredicate(searchRx) {
  return function altLintFilterPredicate(error) {
    return utils.getStringOption(error, 'message').search(searchRx) !== -1;
  };
};

const ALT_ERRORS_RX = /([1-9]\d*) error/;
const ALT_WARNINGS_RX = /([1-9]\d*) warning/;
const ALT_DEPRECATIONS_RX = /([1-9]\d*) deprecation/;
const lintCSSErrorPredicate = createAltLintFilterPredicate(ALT_ERRORS_RX);
const lintCSSWarningPredicate = createAltLintFilterPredicate(ALT_WARNINGS_RX);
const lintCSSDeprecationPredicate = createAltLintFilterPredicate(ALT_DEPRECATIONS_RX);

const getAltLintFailDetail = function getAltLintFailDetail(altErrors, altWarnings, altDeprecations) {
  if (altErrors.length) {
    return `Errors: ${utils.getStringOption(altErrors[0], 'message').match(ALT_ERRORS_RX)[1]}`;
  }

  if (altWarnings.length) {
    return `Warnings: ${utils.getStringOption(altWarnings[0], 'message').match(ALT_WARNINGS_RX)[1]}`;
  }

  if (altDeprecations.length) {
    return `Deprecations: ${utils.getStringOption(altDeprecations[0], 'message').match(ALT_DEPRECATIONS_RX)[1]}`;
  }

  return utils.EMPTY_STRING;
};

/**
 * The Byxelkrok plugin class.
 *
 * @class
 */
class ByxelkrokPlugin {
  /**
   * Create a plugin object.
   *
   * @param {Object} options - The options.
   * @property {string} options.dist - The dist folder.
   * @property {boolean} options.keepDistFiles - Enable keeping of dist files.
   * @property {boolean} options.lintFail - Enable fail on linting errors.
   */
  constructor(options = {}) {
    Object.defineProperties(
      this,
      /** @lends ByxelkrokPlugin# */ {
        lintFail: {
          value: utils.getBooleanOption(options, 'lintFail'),
        },
        distFolder: {
          value: utils.getStringOption(options, 'dist'),
        },
        targetFolder: {
          value: utils.getStringOption(options, 'target'),
        },
        keepDistFiles: {
          value: utils.getBooleanOption(options, 'keepDistFiles'),
        },
        lastHash: {
          value: null,
          writable: true,
        },
        isChanged: {
          value: false,
          writable: true,
        },
        title: {
          value: utils.getStringOption(options, 'title'),
        },
      },
    );
  }

  async onDone(stats) {
    const {compilation, hash} = stats;
    const {errors} = compilation;
    const isLintFail = this.lintFail && utils.getBooleanOption(errors, 'length');

    this.isChanged = hash !== this.lastHash;
    this.lastHash = hash;

    await delayPromise(PROMISE_MAIN_DELAY_MS)
      .then(async () => {
        utils.stdNewLine();
        await utils.remove(this.targetFolder, {title: this.title});
        await utils.copy(this.distFolder, this.targetFolder, {title: this.title});

        if (!this.keepDistFiles && !utils.IS_PRODUCTION) {
          await utils.remove(this.distFolder, {title: this.title});
        }

        if (isLintFail) {
          const lintErrors = errors.filter(lintErrorPredicate);
          const lintWarnings = lintErrors.length ? [] : errors.filter(lintWarningPredicate);

          const Failed = (() => {
            if (lintErrors.length || lintWarnings.length) {
              const detail = getLintFailDetail(lintErrors, lintWarnings);

              return {
                detail,
                type: lintErrors.length ? utils.ERROR : utils.WARN,
              };
            }

            const altLintErrors = lintWarnings.length ? [] : errors.filter(lintCSSErrorPredicate);
            const altLintWarnings = altLintErrors.length ? [] : errors.filter(lintCSSWarningPredicate);
            const altLintDeprecations = altLintWarnings.length ? [] : errors.filter(lintCSSDeprecationPredicate);
            const detail = getAltLintFailDetail(altLintErrors, altLintWarnings, altLintDeprecations);

            return {
              detail,
              type: altLintErrors.length ? utils.ERROR : utils.WARN,
            };
          })();

          delayPromise(PROMISE_MAIN_DELAY_MS)
            .then(() => {
              const message = `Build failed lint: ${Failed.detail}`;

              utils.stderrNewLine();
              utils.stderr(message);
              utils.notify({
                title: this.title,
                message,
                icon: Failed.type,
              });

              return null;
            })
            .catch((error) => {
              throw error;
            });
        } else {
          const BUILD_COMPLETED_MESSAGE = `Build completed: ${this.isChanged ? 'Changed.' : 'No change.'}`;

          utils.stdout(BUILD_COMPLETED_MESSAGE);
          utils.stdNewLine();
          utils.notify({
            title: this.title,
            message: BUILD_COMPLETED_MESSAGE,
            icon: utils.PASSED,
          });
        }

        return null;
      })
      .catch((error) => {
        throw error;
      });
  }

  async onFailed(error) {
    const FAILED_HARD_MESSAGE = utils.getStringOption(error, 'message', 'Build failed hard');

    await delayPromise(PROMISE_MAIN_DELAY_MS)
      .then(async () => {
        utils.stderrNewLine();
        utils.stderr(FAILED_HARD_MESSAGE);
        await utils.remove(this.distFolder, {title: this.title});
        await utils.remove(this.targetFolder, {title: this.title});
        utils.notify({
          title: this.title,
          message: FAILED_HARD_MESSAGE,
          icon: utils.ERROR,
        });

        return null;
      })
      .catch((err) => {
        throw err;
      });
  }

  async apply(compiler) {
    utils.stdout(`Dist folder: ${utils.quote(this.distFolder)}`);
    utils.stdout(`Target folder: ${utils.quote(this.targetFolder)}`);

    await delayPromise(PROMISE_MAIN_DELAY_MS)
      .then(async () => {
        await utils.remove(this.distFolder, {title: this.title});
        await utils.remove(this.targetFolder, {title: this.title});
        utils.stdNewLine();

        const onDone = async (...args) => {
          await this.onDone(...args);
        };

        const onFailed = async (...args) => {
          await this.onFailed(...args);
        };

        if (compiler.hooks) {
          compiler.hooks.done.tap(NAME, onDone);
          compiler.hooks.failed.tap(NAME, onFailed);
        } else {
          compiler.plugin('done', onDone);
          compiler.plugin('failed', onFailed);
        }

        return null;
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = ByxelkrokPlugin;
