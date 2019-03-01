/*!
{
  "copywrite": "",
  "date": "2019-03-01T08:40:44.979Z",
  "describe": "",
  "description": "A high quality UI components Library with Vue.js",
  "file": "components/sider.js",
  "hash": "d9106c68bfeb7e625a48",
  "license": "MIT",
  "version": "3.0.0-alpha.10"
}
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("iview", [], factory);
	else if(typeof exports === 'object')
		exports["iview"] = factory();
	else
		root["iview"] = factory();
})((function () {
  'use strict';

  if (typeof self !== 'undefined') {
    return self;
  }

  if (typeof window !== 'undefined') {
    return window;
  }

  if (typeof global !== 'undefined') {
    return global;
  }

  return Function('return this')();
}()), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 659);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * js-logger - http://github.com/jonnyreeves/js-logger
 * Jonny Reeves, http://jonnyreeves.co.uk/
 * js-logger may be freely distributed under the MIT license.
 */
(function (global) {
	"use strict";

	// Top level module for the global, static logger instance.
	var Logger = { };

	// For those that are at home that are keeping score.
	Logger.VERSION = "1.6.0";

	// Function which handles all incoming log messages.
	var logHandler;

	// Map of ContextualLogger instances by name; used by Logger.get() to return the same named instance.
	var contextualLoggersByNameMap = {};

	// Polyfill for ES5's Function.bind.
	var bind = function(scope, func) {
		return function() {
			return func.apply(scope, arguments);
		};
	};

	// Super exciting object merger-matron 9000 adding another 100 bytes to your download.
	var merge = function () {
		var args = arguments, target = args[0], key, i;
		for (i = 1; i < args.length; i++) {
			for (key in args[i]) {
				if (!(key in target) && args[i].hasOwnProperty(key)) {
					target[key] = args[i][key];
				}
			}
		}
		return target;
	};

	// Helper to define a logging level object; helps with optimisation.
	var defineLogLevel = function(value, name) {
		return { value: value, name: name };
	};

	// Predefined logging levels.
	Logger.TRACE = defineLogLevel(1, 'TRACE');
	Logger.DEBUG = defineLogLevel(2, 'DEBUG');
	Logger.INFO = defineLogLevel(3, 'INFO');
	Logger.TIME = defineLogLevel(4, 'TIME');
	Logger.WARN = defineLogLevel(5, 'WARN');
	Logger.ERROR = defineLogLevel(8, 'ERROR');
	Logger.OFF = defineLogLevel(99, 'OFF');

	// Inner class which performs the bulk of the work; ContextualLogger instances can be configured independently
	// of each other.
	var ContextualLogger = function(defaultContext) {
		this.context = defaultContext;
		this.setLevel(defaultContext.filterLevel);
		this.log = this.info;  // Convenience alias.
	};

	ContextualLogger.prototype = {
		// Changes the current logging level for the logging instance.
		setLevel: function (newLevel) {
			// Ensure the supplied Level object looks valid.
			if (newLevel && "value" in newLevel) {
				this.context.filterLevel = newLevel;
			}
		},
		
		// Gets the current logging level for the logging instance
		getLevel: function () {
			return this.context.filterLevel;
		},

		// Is the logger configured to output messages at the supplied level?
		enabledFor: function (lvl) {
			var filterLevel = this.context.filterLevel;
			return lvl.value >= filterLevel.value;
		},

		trace: function () {
			this.invoke(Logger.TRACE, arguments);
		},

		debug: function () {
			this.invoke(Logger.DEBUG, arguments);
		},

		info: function () {
			this.invoke(Logger.INFO, arguments);
		},

		warn: function () {
			this.invoke(Logger.WARN, arguments);
		},

		error: function () {
			this.invoke(Logger.ERROR, arguments);
		},

		time: function (label) {
			if (typeof label === 'string' && label.length > 0) {
				this.invoke(Logger.TIME, [ label, 'start' ]);
			}
		},

		timeEnd: function (label) {
			if (typeof label === 'string' && label.length > 0) {
				this.invoke(Logger.TIME, [ label, 'end' ]);
			}
		},

		// Invokes the logger callback if it's not being filtered.
		invoke: function (level, msgArgs) {
			if (logHandler && this.enabledFor(level)) {
				logHandler(msgArgs, merge({ level: level }, this.context));
			}
		}
	};

	// Protected instance which all calls to the to level `Logger` module will be routed through.
	var globalLogger = new ContextualLogger({ filterLevel: Logger.OFF });

	// Configure the global Logger instance.
	(function() {
		// Shortcut for optimisers.
		var L = Logger;

		L.enabledFor = bind(globalLogger, globalLogger.enabledFor);
		L.trace = bind(globalLogger, globalLogger.trace);
		L.debug = bind(globalLogger, globalLogger.debug);
		L.time = bind(globalLogger, globalLogger.time);
		L.timeEnd = bind(globalLogger, globalLogger.timeEnd);
		L.info = bind(globalLogger, globalLogger.info);
		L.warn = bind(globalLogger, globalLogger.warn);
		L.error = bind(globalLogger, globalLogger.error);

		// Don't forget the convenience alias!
		L.log = L.info;
	}());

	// Set the global logging handler.  The supplied function should expect two arguments, the first being an arguments
	// object with the supplied log messages and the second being a context object which contains a hash of stateful
	// parameters which the logging function can consume.
	Logger.setHandler = function (func) {
		logHandler = func;
	};

	// Sets the global logging filter level which applies to *all* previously registered, and future Logger instances.
	// (note that named loggers (retrieved via `Logger.get`) can be configured independently if required).
	Logger.setLevel = function(level) {
		// Set the globalLogger's level.
		globalLogger.setLevel(level);

		// Apply this level to all registered contextual loggers.
		for (var key in contextualLoggersByNameMap) {
			if (contextualLoggersByNameMap.hasOwnProperty(key)) {
				contextualLoggersByNameMap[key].setLevel(level);
			}
		}
	};

	// Gets the global logging filter level
	Logger.getLevel = function() {
		return globalLogger.getLevel();
	};

	// Retrieve a ContextualLogger instance.  Note that named loggers automatically inherit the global logger's level,
	// default context and log handler.
	Logger.get = function (name) {
		// All logger instances are cached so they can be configured ahead of use.
		return contextualLoggersByNameMap[name] ||
			(contextualLoggersByNameMap[name] = new ContextualLogger(merge({ name: name }, globalLogger.context)));
	};

	// CreateDefaultHandler returns a handler function which can be passed to `Logger.setHandler()` which will
	// write to the window's console object (if present); the optional options object can be used to customise the
	// formatter used to format each log message.
	Logger.createDefaultHandler = function (options) {
		options = options || {};

		options.formatter = options.formatter || function defaultMessageFormatter(messages, context) {
			// Prepend the logger's name to the log message for easy identification.
			if (context.name) {
				messages.unshift("[" + context.name + "]");
			}
		};

		// Map of timestamps by timer labels used to track `#time` and `#timeEnd()` invocations in environments
		// that don't offer a native console method.
		var timerStartTimeByLabelMap = {};

		// Support for IE8+ (and other, slightly more sane environments)
		var invokeConsoleMethod = function (hdlr, messages) {
			Function.prototype.apply.call(hdlr, console, messages);
		};

		// Check for the presence of a logger.
		if (typeof console === "undefined") {
			return function () { /* no console */ };
		}

		return function(messages, context) {
			// Convert arguments object to Array.
			messages = Array.prototype.slice.call(messages);

			var hdlr = console.log;
			var timerLabel;

			if (context.level === Logger.TIME) {
				timerLabel = (context.name ? '[' + context.name + '] ' : '') + messages[0];

				if (messages[1] === 'start') {
					if (console.time) {
						console.time(timerLabel);
					}
					else {
						timerStartTimeByLabelMap[timerLabel] = new Date().getTime();
					}
				}
				else {
					if (console.timeEnd) {
						console.timeEnd(timerLabel);
					}
					else {
						invokeConsoleMethod(hdlr, [ timerLabel + ': ' +
							(new Date().getTime() - timerStartTimeByLabelMap[timerLabel]) + 'ms' ]);
					}
				}
			}
			else {
				// Delegate through to custom warn/error loggers if present on the console.
				if (context.level === Logger.WARN && console.warn) {
					hdlr = console.warn;
				} else if (context.level === Logger.ERROR && console.error) {
					hdlr = console.error;
				} else if (context.level === Logger.INFO && console.info) {
					hdlr = console.info;
				} else if (context.level === Logger.DEBUG && console.debug) {
					hdlr = console.debug;
				} else if (context.level === Logger.TRACE && console.trace) {
					hdlr = console.trace;
				}

				options.formatter(messages, context);
				invokeConsoleMethod(hdlr, messages);
			}
		};
	};

	// Configure and example a Default implementation which writes to the `window.console` (if present).  The
	// `options` hash can be used to configure the default logLevel and provide a custom message formatter.
	Logger.useDefaults = function(options) {
		Logger.setLevel(options && options.defaultLevel || Logger.DEBUG);
		Logger.setHandler(Logger.createDefaultHandler(options));
	};

	// Export to popular environments boilerplate.
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (Logger),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	else {}
}(this));


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(8);

/**
 * Casts `value` as an array if it's not one.
 *
 * @static
 * @memberOf _
 * @since 4.4.0
 * @category Lang
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast array.
 * @example
 *
 * _.castArray(1);
 * // => [1]
 *
 * _.castArray({ 'a': 1 });
 * // => [{ 'a': 1 }]
 *
 * _.castArray('abc');
 * // => ['abc']
 *
 * _.castArray(null);
 * // => [null]
 *
 * _.castArray(undefined);
 * // => [undefined]
 *
 * _.castArray();
 * // => []
 *
 * var array = [1, 2, 3];
 * console.log(_.castArray(array) === array);
 * // => true
 */
function castArray() {
  if (!arguments.length) {
    return [];
  }
  var value = arguments[0];
  return isArray(value) ? value : [value];
}

module.exports = castArray;


/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_index_js_sider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(165);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_index_js_sider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_index_js_sider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_index_js_sider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_index_js_sider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_index_js_sider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isOneOf = _interopRequireDefault(__webpack_require__(7));

var logger = __webpack_require__(0).get("iview:components:layout:sider.vue");

var prefixCls = 'ivu-layout-sider';
var dimensionMap = {
  lg: '1200px',
  md: '992px',
  sm: '768px',
  xl: '1600px',
  xs: '480px'
};
var _default = {
  name: 'Sider',
  props: {
    breakpoint: {
      default: undefined,
      type: String,
      validator: function validator(val) {
        return (0, _isOneOf.default)(val, ['xs', 'sm', 'md', 'lg', 'xl']);
      }
    },
    collapsedWidth: {
      default: 64,
      type: [Number, String]
    },
    collapsible: {
      default: false,
      type: Boolean
    },
    defaultCollapsed: {
      default: false,
      type: Boolean
    },
    hideTrigger: {
      default: false,
      type: Boolean
    },
    reverseArrow: {
      default: false,
      type: Boolean
    },
    value: {
      default: false,
      // if it's collpased now
      type: Boolean
    },
    width: {
      default: 200,
      type: [Number, String]
    }
  },
  data: function data() {
    return {
      mediaMatched: false,
      prefixCls: prefixCls
    };
  },
  computed: {
    childClasses: function childClasses() {
      return "".concat(this.prefixCls, "-children");
    },
    showBottomTrigger: function showBottomTrigger() {
      return this.collapsible ? !this.mediaMatched && !this.hideTrigger : false;
    },
    showZeroTrigger: function showZeroTrigger() {
      return this.collapsible ? this.mediaMatched && !this.hideTrigger || parseInt(this.collapsedWidth, 10) === 0 && this.value && !this.hideTrigger : false;
    },
    siderWidth: function siderWidth() {
      if (this.collapsible) {
        if (this.value) {
          return this.mediaMatched ? 0 : parseInt(this.collapsedWidth, 10);
        }

        return parseInt(this.width, 10);
      }

      return this.width;
    },
    triggerClasses: function triggerClasses() {
      return ["".concat(prefixCls, "-trigger"), this.value ? "".concat(prefixCls, "-trigger-collapsed") : ''];
    },
    triggerIconClasses: function triggerIconClasses() {
      return ['ivu-icon', "ivu-icon-chevron-".concat(this.reverseArrow ? 'right' : 'left'), "".concat(prefixCls, "-trigger-icon")];
    },
    wrapClasses: function wrapClasses() {
      return ["".concat(prefixCls), this.siderWidth ? '' : "".concat(prefixCls, "-zero-width"), this.value ? "".concat(prefixCls, "-collapsed") : ''];
    },
    wrapStyles: function wrapStyles() {
      return {
        flex: "0 0 ".concat(this.siderWidth, "px"),
        maxWidth: "".concat(this.siderWidth, "px"),
        minWidth: "".concat(this.siderWidth, "px"),
        width: "".concat(this.siderWidth, "px")
      };
    },
    zeroWidthTriggerClasses: function zeroWidthTriggerClasses() {
      return ["".concat(prefixCls, "-zero-width-trigger"), this.reverseArrow ? "".concat(prefixCls, "-zero-width-trigger-left") : ''];
    }
  },
  watch: {
    value: function value(stat) {
      this.$emit('on-collapse', stat);
    }
  },
  mounted: function mounted() {
    if (this.defaultCollapsed) {
      this.$emit('input', this.defaultCollapsed);
    }

    if (this.breakpoint !== undefined) {
      window.addEventListener('resize', this.onWindowResize);
      this.matchMedia();
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.breakpoint !== undefined) {
      window.removeEventListener('resize', this.onWindowResize);
    }
  },
  methods: {
    matchMedia: function matchMedia() {
      var _window = window,
          matchMedia = _window.matchMedia;
      var mediaMatched = this.mediaMatched;
      this.mediaMatched = matchMedia("(max-width: ".concat(dimensionMap[this.breakpoint], ")")).matches;

      if (this.mediaMatched !== mediaMatched) {
        this.$emit('input', this.mediaMatched);
      }
    },
    onWindowResize: function onWindowResize() {
      this.matchMedia();
    },
    toggleCollapse: function toggleCollapse() {
      var value = this.collapsible ? !this.value : false;
      this.$emit('input', value);
    }
  }
};
exports.default = _default;

/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = oneOf;

var _castArray = _interopRequireDefault(__webpack_require__(15));

var logger = __webpack_require__(0).get("iview:Assets:oneOf");

/**
 * Tests if a comparate exists in a list of comparates an then returns the comparate if there
 * is a match; otherwise returns the fallback value.
 *
 * @param {*} comparate - The value to compare against the supplied list of comparates.
 * @param {Array|*} [comparates=[]] - An array of values or a single value for comparison.
 * @param {*} [fallback=undefined] - The returned value if no match exists.
 * @returns {*} - The comparate upon a match; otherwise the fallback value.
 */
function oneOf(comparate, comparates, fallback) {
  return (0, _castArray.default)(comparates).includes(comparate) ? comparate : fallback;
}

/***/ }),

/***/ 2:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 250:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/layout/sider.vue?vue&type=template&id=88023d76&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.wrapClasses,style:(_vm.wrapStyles)},[_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.showZeroTrigger),expression:"showZeroTrigger"}],class:_vm.zeroWidthTriggerClasses,on:{"click":_vm.toggleCollapse}},[_c('i',{staticClass:"ivu-icon ivu-icon-navicon-round"})]),_vm._v(" "),_c('div',{class:_vm.childClasses},[_vm._t("default")],2),_vm._v(" "),_vm._t("trigger",[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showBottomTrigger),expression:"showBottomTrigger"}],class:_vm.triggerClasses,style:({width: _vm.siderWidth + 'px'}),on:{"click":_vm.toggleCollapse}},[_c('i',{class:_vm.triggerIconClasses})])])],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/layout/sider.vue?vue&type=template&id=88023d76&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),

/***/ 487:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sider_vue_vue_type_template_id_88023d76___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(250);
/* harmony import */ var _sider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(164);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _sider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _sider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _sider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _sider_vue_vue_type_template_id_88023d76___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _sider_vue_vue_type_template_id_88023d76___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 659:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1);

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _sider.default;
  }
});

var _sider = _interopRequireDefault(__webpack_require__(487));

var logger = __webpack_require__(0).get("iview:components:sider:index");

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isOneOf;

var _oneOf = _interopRequireDefault(__webpack_require__(17));

var logger = __webpack_require__(0).get("iview:Assets:isOneOf");

function isOneOf(comparate, comparates) {
  return Boolean((0, _oneOf.default)(comparate, comparates));
}

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ })

/******/ });
});
//# sourceMappingURL=sider.js.map