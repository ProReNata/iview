/*!
{
  "copywrite": "",
  "date": "2019-02-27T04:51:06.220Z",
  "describe": "",
  "description": "A high quality UI components Library with Vue.js",
  "file": "components/upload.js",
  "hash": "f6462d5dd25781dbcb91",
  "license": "MIT",
  "version": "3.0.0-alpha.10"
}
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"), require("@fortawesome/fontawesome-svg-core"), require("@fortawesome/pro-solid-svg-icons"), require("@fortawesome/pro-regular-svg-icons"), require("@fortawesome/pro-light-svg-icons"), require("@fortawesome/vue-fontawesome"));
	else if(typeof define === 'function' && define.amd)
		define("iview", ["vue", "@fortawesome/fontawesome-svg-core", "@fortawesome/pro-solid-svg-icons", "@fortawesome/pro-regular-svg-icons", "@fortawesome/pro-light-svg-icons", "@fortawesome/vue-fontawesome"], factory);
	else if(typeof exports === 'object')
		exports["iview"] = factory(require("vue"), require("@fortawesome/fontawesome-svg-core"), require("@fortawesome/pro-solid-svg-icons"), require("@fortawesome/pro-regular-svg-icons"), require("@fortawesome/pro-light-svg-icons"), require("@fortawesome/vue-fontawesome"));
	else
		root["iview"] = factory(root["vue"], root["@fortawesome/fontawesome-svg-core"], root["@fortawesome/pro-solid-svg-icons"], root["@fortawesome/pro-regular-svg-icons"], root["@fortawesome/pro-light-svg-icons"], root["@fortawesome/vue-fontawesome"]);
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
}()), function(__WEBPACK_EXTERNAL_MODULE__5__, __WEBPACK_EXTERNAL_MODULE__39__, __WEBPACK_EXTERNAL_MODULE__40__, __WEBPACK_EXTERNAL_MODULE__41__, __WEBPACK_EXTERNAL_MODULE__42__, __WEBPACK_EXTERNAL_MODULE__43__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 698);
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

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_index_js_icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_index_js_icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_index_js_icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_index_js_icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_index_js_icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_index_js_icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isOneOfIconWeights = isOneOfIconWeights;
exports.isOneOfIconNames = isOneOfIconNames;
exports.default = exports.getIconAsHTML = void 0;

var _objectSpread2 = _interopRequireDefault(__webpack_require__(14));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(4));

var _vue = _interopRequireDefault(__webpack_require__(5));

var _fontawesomeSvgCore = __webpack_require__(39);

var _proSolidSvgIcons = __webpack_require__(40);

var _proRegularSvgIcons = __webpack_require__(41);

var _proLightSvgIcons = __webpack_require__(42);

var _vueFontawesome = __webpack_require__(43);

var _findKey = _interopRequireDefault(__webpack_require__(44));

var _memoize = _interopRequireDefault(__webpack_require__(50));

var _isOneOf = _interopRequireDefault(__webpack_require__(7));

var _Object$create;

var logger = __webpack_require__(0).get("iview:components:icon:icon.vue");

_fontawesomeSvgCore.library.add(_proSolidSvgIcons.fas);

_fontawesomeSvgCore.library.add(_proRegularSvgIcons.far);

_fontawesomeSvgCore.library.add(_proLightSvgIcons.fal);
/*
  Vue.component('font-awesome-icon', FontAwesomeIcon);
  Vue.component('font-awesome-layers', FontAwesomeLayers);
  Vue.component('font-awesome-layers-text', FontAwesomeLayersText);
*/


var SOLID = 'solid';
var REGULAR = 'regular';
var LIGHT = 'light';
var ICON_WEIGHTS = Object.freeze([SOLID, REGULAR, LIGHT]);

function isOneOfIconWeights(value) {
  return (0, _isOneOf.default)(value, ICON_WEIGHTS);
}

var FAS = 'fas';
var FAR = 'far';
var FAL = 'fal';
var ICON_LIBRARIES = Object.freeze([_proSolidSvgIcons.fas, _proRegularSvgIcons.far, _proLightSvgIcons.fal]);

function isOneOfIconNames(value) {
  var isIconName = function isIconName(_ref) {
    var iconName = _ref.iconName;
    return iconName === value;
  };

  return ICON_LIBRARIES.some(function libraryIteratee(iconLibrary) {
    return Boolean((0, _findKey.default)(iconLibrary, isIconName));
  });
}

var WEIGHT_MAP = Object.create(null, (_Object$create = {}, (0, _defineProperty2.default)(_Object$create, SOLID, {
  enumerable: true,
  value: FAS
}), (0, _defineProperty2.default)(_Object$create, REGULAR, {
  enumerable: true,
  value: FAR
}), (0, _defineProperty2.default)(_Object$create, LIGHT, {
  enumerable: true,
  value: FAL
}), _Object$create));
var vueObject = {
  name: 'Icon',
  props: {
    fw: {
      default: false,
      type: Boolean
    },
    type: {
      required: true,
      type: String,
      validator: isOneOfIconNames
    },
    weight: {
      default: REGULAR,
      type: String,
      validator: isOneOfIconWeights
    }
  },
  components: {
    FontAwesomeIcon: _vueFontawesome.FontAwesomeIcon,
    FontAwesomeLayers: _vueFontawesome.FontAwesomeLayers,
    FontAwesomeLayersText: _vueFontawesome.FontAwesomeLayersText
  },
  computed: {
    icon: function icon() {
      var weightClass = WEIGHT_MAP[this.weight] || WEIGHT_MAP[REGULAR];
      var definition = [weightClass];

      if (this.type) {
        definition.push(this.type);
      }

      return definition;
    }
  }
};
var el = document.createElement('div');
var getIconAsHTML = (0, _memoize.default)(function createHTML() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new _vue.default((0, _objectSpread2.default)({}, vueObject, {
    propsData: (0, _objectSpread2.default)({}, props)
  })).$mount(el).$el.outerHTML;
});
exports.getIconAsHTML = getIconAsHTML;
var _default = vueObject;
exports.default = _default;

/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(18));

var _newArrowCheck2 = _interopRequireDefault(__webpack_require__(3));

var _not = _interopRequireDefault(__webpack_require__(6));

var logger = __webpack_require__(0).get("iview:mixins:emitter");

function _broadcast(componentName, eventName, params) {
  var _this = this;

  /* eslint-disable-next-line babel/no-invalid-this */
  this.$children.forEach(function (child) {
    (0, _newArrowCheck2.default)(this, _this);
    var name = child.$options.name;

    if (name === componentName) {
      child.$emit.apply(child, (0, _toConsumableArray2.default)([eventName].concat(params)));
    } else {
      // Todo If params is an empty array, the received will be undefined
      _broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  }.bind(this));
}

var _default = {
  methods: {
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    },
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var optName = parent.$options.name;

      while (parent && ((0, _not.default)(optName) || optName !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          optName = parent.$options.name;
        }
      }

      if (parent) {
        var _parent;

        (_parent = parent).$emit.apply(_parent, (0, _toConsumableArray2.default)([eventName].concat(params)));
      }
    }
  }
};
exports.default = _default;

/***/ }),

/***/ 126:
/***/ (function(module, exports) {

/**
 * This method returns a new empty object.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Object} Returns the new empty object.
 * @example
 *
 * var objects = _.times(2, _.stubObject);
 *
 * console.log(objects);
 * // => [{}, {}]
 *
 * console.log(objects[0] === objects[1]);
 * // => false
 */
function stubObject() {
  return {};
}

module.exports = stubObject;


/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icon/icon.vue?vue&type=template&id=52ceed03&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('font-awesome-icon',_vm._g(_vm._b({attrs:{"icon":_vm.icon,"fixed-width":_vm.fw}},'font-awesome-icon',_vm.$attrs,false),_vm.$listeners))}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/icon/icon.vue?vue&type=template&id=52ceed03&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(4);

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      defineProperty(target, key, source[key]);
    });
  }

  return target;
}

module.exports = _objectSpread;

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

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(27);

var iterableToArray = __webpack_require__(28);

var nonIterableSpread = __webpack_require__(29);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_index_js_progress_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(181);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_index_js_progress_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_index_js_progress_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_index_js_progress_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_index_js_progress_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_index_js_progress_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 181:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(4));

var _isOneOf = _interopRequireDefault(__webpack_require__(7));

var _icon = _interopRequireDefault(__webpack_require__(20));

var logger = __webpack_require__(0).get("iview:components:progress:progress.vue");

var prefixCls = 'ivu-progress';
var _default = {
  components: {
    Icon: _icon.default
  },
  props: {
    hideInfo: {
      default: false,
      type: Boolean
    },
    percent: {
      default: 0,
      type: Number
    },
    status: {
      default: 'normal',
      validator: function validator(value) {
        return (0, _isOneOf.default)(value, ['normal', 'active', 'wrong', 'success']);
      }
    },
    strokeWidth: {
      default: 10,
      type: Number
    },
    vertical: {
      default: false,
      type: Boolean
    }
  },
  data: function data() {
    return {
      currentStatus: this.status
    };
  },
  computed: {
    bgClasses: function bgClasses() {
      return "".concat(prefixCls, "-bg");
    },
    bgStyle: function bgStyle() {
      return this.vertical ? {
        height: "".concat(this.percent, "%"),
        width: "".concat(this.strokeWidth, "px")
      } : {
        height: "".concat(this.strokeWidth, "px"),
        width: "".concat(this.percent, "%")
      };
    },
    innerClasses: function innerClasses() {
      return "".concat(prefixCls, "-inner");
    },
    isStatus: function isStatus() {
      return this.currentStatus === 'wrong' || this.currentStatus === 'success';
    },
    outerClasses: function outerClasses() {
      return "".concat(prefixCls, "-outer");
    },
    statusIcon: function statusIcon() {
      var type = '';

      switch (this.currentStatus) {
        case 'wrong':
          type = 'ios-close';
          break;

        case 'success':
          type = 'ios-checkmark';
          break;

        default:
      }

      return type;
    },
    textClasses: function textClasses() {
      return "".concat(prefixCls, "-text");
    },
    textInnerClasses: function textInnerClasses() {
      return "".concat(prefixCls, "-text-inner");
    },
    wrapClasses: function wrapClasses() {
      var _ref;

      return ["".concat(prefixCls), "".concat(prefixCls, "-").concat(this.currentStatus), (_ref = {}, (0, _defineProperty2.default)(_ref, "".concat(prefixCls, "-show-info"), !this.hideInfo), (0, _defineProperty2.default)(_ref, "".concat(prefixCls, "-vertical"), this.vertical), _ref)];
    }
  },
  watch: {
    percent: function percent(val, oldVal) {
      if (val < oldVal) {
        this.handleStatus(true);
      } else {
        this.handleStatus();
      }
    },
    status: function status(val) {
      this.currentStatus = val;
    }
  },
  created: function created() {
    this.handleStatus();
  },
  methods: {
    handleStatus: function handleStatus(isDown) {
      if (isDown) {
        this.currentStatus = 'normal';
        this.$emit('on-status-change', 'normal');
      } else if (parseInt(this.percent, 10) === 100) {
        this.currentStatus = 'success';
        this.$emit('on-status-change', 'success');
      }
    }
  }
};
exports.default = _default;

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

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(22);

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _icon.default;
  }
});
Object.defineProperty(exports, "getIconAsHTML", {
  enumerable: true,
  get: function get() {
    return _icon.getIconAsHTML;
  }
});
Object.defineProperty(exports, "isOneOfIconNames", {
  enumerable: true,
  get: function get() {
    return _icon.isOneOfIconNames;
  }
});
Object.defineProperty(exports, "isOneOfIconWeights", {
  enumerable: true,
  get: function get() {
    return _icon.isOneOfIconWeights;
  }
});

var _icon = _interopRequireWildcard(__webpack_require__(26));

var logger = __webpack_require__(0).get("iview:components:icon:index");

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;
    return newObj;
  }
}

module.exports = _interopRequireWildcard;

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(24);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),

/***/ 24:
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/progress/progress.vue?vue&type=template&id=458f946f&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.wrapClasses},[_c('div',{class:_vm.outerClasses},[_c('div',{class:_vm.innerClasses},[_c('div',{class:_vm.bgClasses,style:(_vm.bgStyle)})])]),_vm._v(" "),(!_vm.hideInfo)?_c('span',{class:_vm.textClasses},[_vm._t("default",[(_vm.isStatus)?_c('span',{class:_vm.textInnerClasses},[_c('icon',{attrs:{"type":_vm.statusIcon}})],1):_c('span',{class:_vm.textInnerClasses},[_vm._v("\n        "+_vm._s(_vm.percent)+"%\n      ")])])],2):_vm._e()])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/progress/progress.vue?vue&type=template&id=458f946f&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),

/***/ 25:
/***/ (function(module, exports) {

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;


/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _icon_vue_vue_type_template_id_52ceed03___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _icon_vue_vue_type_template_id_52ceed03___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _icon_vue_vue_type_template_id_52ceed03___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 27:
/***/ (function(module, exports) {

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

module.exports = _arrayWithoutHoles;

/***/ }),

/***/ 28:
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),

/***/ 29:
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

function _newArrowCheck(innerThis, boundThis) {
  if (innerThis !== boundThis) {
    throw new TypeError("Cannot instantiate an arrow function");
  }
}

module.exports = _newArrowCheck;

/***/ }),

/***/ 30:
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(9);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),

/***/ 32:
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(9);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(9);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(9);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_index_js_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(374);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_index_js_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_index_js_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_index_js_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_index_js_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_index_js_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 374:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _newArrowCheck2 = _interopRequireDefault(__webpack_require__(3));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(4));

var _stubArray = _interopRequireDefault(__webpack_require__(57));

var _stubObject = _interopRequireDefault(__webpack_require__(126));

var _noop = _interopRequireDefault(__webpack_require__(25));

var _isOneOf = _interopRequireDefault(__webpack_require__(7));

var _emitter = _interopRequireDefault(__webpack_require__(12));

var _uploadList = _interopRequireDefault(__webpack_require__(700));

var _ajax = _interopRequireDefault(__webpack_require__(701));

var logger = __webpack_require__(0).get("iview:components:upload:upload.vue");

var prefixCls = 'ivu-upload';
var _default = {
  name: 'Upload',
  components: {
    UploadList: _uploadList.default
  },
  mixins: [_emitter.default],
  props: {
    accept: {
      default: undefined,
      type: String
    },
    action: {
      required: true,
      type: String
    },
    beforeUpload: {
      default: undefined,
      type: Function
    },
    data: {
      default: undefined,
      type: Object
    },
    defaultFileList: {
      default: _stubArray.default,
      type: Array
    },
    format: {
      default: _stubArray.default,
      type: Array
    },
    headers: {
      default: _stubObject.default,
      type: Object
    },
    maxSize: {
      default: undefined,
      type: Number
    },
    multiple: {
      default: false,
      type: Boolean
    },
    name: {
      default: 'file',
      type: String
    },
    onError: {
      default: _stubObject.default,
      type: Function
    },
    onExceededSize: {
      default: _stubObject.default,
      type: Function
    },
    onFormatError: {
      default: _stubObject.default,
      type: Function
    },
    onPreview: {
      default: _stubObject.default,
      type: Function
    },
    onProgress: {
      default: _stubObject.default,
      type: Function
    },
    onRemove: {
      default: _stubObject.default,
      type: Function
    },
    onSuccess: {
      default: _stubObject.default,
      type: Function
    },
    showUploadList: {
      default: true,
      type: Boolean
    },
    type: {
      default: 'select',
      type: String,
      validator: function validator(value) {
        return (0, _isOneOf.default)(value, ['select', 'drag']);
      }
    },
    withCredentials: {
      default: false,
      type: Boolean
    }
  },
  data: function data() {
    return {
      dragOver: false,
      fileList: [],
      prefixCls: prefixCls,
      tempIndex: 1
    };
  },
  computed: {
    classes: function classes() {
      var _ref;

      return ["".concat(prefixCls), (_ref = {}, (0, _defineProperty2.default)(_ref, "".concat(prefixCls, "-select"), this.type === 'select'), (0, _defineProperty2.default)(_ref, "".concat(prefixCls, "-drag"), this.type === 'drag'), (0, _defineProperty2.default)(_ref, "".concat(prefixCls, "-dragOver"), this.type === 'drag' && this.dragOver), _ref)];
    }
  },
  watch: {
    defaultFileList: {
      handler: function handler(fileList) {
        var _this = this;

        this.fileList = fileList.map(function (item) {
          (0, _newArrowCheck2.default)(this, _this);
          item.status = 'finished';
          item.percentage = 100;
          item.uid = Date.now() + this.tempIndex;
          this.tempIndex += 1;
          return item;
        }.bind(this));
      },
      immediate: true
    }
  },
  methods: {
    clearFiles: function clearFiles() {
      this.fileList = [];
    },
    getFile: function getFile(file) {
      var _this2 = this;

      var fileList = this.fileList;
      var target;
      fileList.every(function (item) {
        (0, _newArrowCheck2.default)(this, _this2);
        target = file.uid === item.uid ? item : null;
        return !target;
      }.bind(this));
      return target;
    },
    handleChange: function handleChange(e) {
      var files = e.target.files;

      if (!files) {
        return;
      }

      this.uploadFiles(files);
      this.$refs.input.value = null;
    },
    handleClick: function handleClick() {
      this.$refs.input.click();
    },
    handleError: function handleError(err, response, file) {
      var item = this.getFile(file);
      var fileList = this.fileList;
      item.status = 'fail';
      fileList.splice(fileList.indexOf(item), 1);
      this.onError(err, response, file);
    },
    handlePreview: function handlePreview(file) {
      if (file.status === 'finished') {
        this.onPreview(file);
      }
    },
    handleProgress: function handleProgress(e, file) {
      var item = this.getFile(file);
      this.onProgress(e, item, this.fileList);
      item.percentage = e.percent || 0;
    },
    handleRemove: function handleRemove(file) {
      var fileList = this.fileList;
      fileList.splice(fileList.indexOf(file), 1);
      this.onRemove(file, fileList);
    },
    handleStart: function handleStart(file) {
      file.uid = Date.now() + this.tempIndex;
      this.tempIndex += 1;
      var item = {
        name: file.name,
        percentage: 0,
        showProgress: true,
        size: file.size,
        status: 'uploading',
        uid: file.uid
      };
      this.fileList.push(item);
    },
    handleSuccess: function handleSuccess(res, file) {
      var _this3 = this;

      var item = this.getFile(file);

      if (item) {
        item.status = 'finished';
        item.response = res;
        this.dispatch('FormItem', 'on-form-change', item);
        this.onSuccess(res, item, this.fileList);
        setTimeout(function () {
          (0, _newArrowCheck2.default)(this, _this3);
          item.showProgress = false;
        }.bind(this), 1000);
      }
    },
    onDrop: function onDrop(e) {
      this.dragOver = false;
      this.uploadFiles(e.dataTransfer.files);
    },
    post: function post(file) {
      var _this4 = this;

      // check format
      if (this.format.length) {
        var fileFormat = file.name.split('.').pop().toLocaleLowerCase();
        var checked = this.format.some(function (item) {
          (0, _newArrowCheck2.default)(this, _this4);
          return item.toLocaleLowerCase() === fileFormat;
        }.bind(this));

        if (!checked) {
          this.onFormatError(file, this.fileList);
          return;
        }
      } // check maxSize


      if (this.maxSize) {
        if (file.size > this.maxSize * 1024) {
          this.onExceededSize(file, this.fileList);
          return;
        }
      }

      this.handleStart(file);
      var formData = new FormData();
      formData.append(this.name, file);
      (0, _ajax.default)({
        action: this.action,
        data: this.data,
        file: file,
        filename: this.name,
        headers: this.headers,
        onError: function onError(err, response) {
          (0, _newArrowCheck2.default)(this, _this4);
          this.handleError(err, response, file);
        }.bind(this),
        onProgress: function onProgress(e) {
          (0, _newArrowCheck2.default)(this, _this4);
          this.handleProgress(e, file);
        }.bind(this),
        onSuccess: function onSuccess(res) {
          (0, _newArrowCheck2.default)(this, _this4);
          this.handleSuccess(res, file);
        }.bind(this),
        withCredentials: this.withCredentials
      });
    },
    upload: function upload(file) {
      var _this5 = this;

      if (!this.beforeUpload) {
        this.post(file);
        return;
      }

      var before = this.beforeUpload(file);

      if (before && before.then) {
        before.then(function (processedFile) {
          (0, _newArrowCheck2.default)(this, _this5);

          if (Object.prototype.toString.call(processedFile) === '[object File]') {
            this.post(processedFile);
          } else {
            this.post(file);
          }

          return null;
        }.bind(this), _noop.default // () => {
        //   this.$emit('cancel', file);
        // },
        ).catch(function (error) {
          (0, _newArrowCheck2.default)(this, _this5);
          throw error;
        }.bind(this));
      } else if (before !== false) {
        this.post(file);
      } else {// this.$emit('cancel', file);
      }
    },
    uploadFiles: function uploadFiles(files) {
      var _this6 = this;

      var postFiles = Array.prototype.slice.call(files);

      if (!this.multiple) {
        postFiles = postFiles.slice(0, 1);
      }

      if (postFiles.length === 0) {
        return;
      }

      postFiles.forEach(function (file) {
        (0, _newArrowCheck2.default)(this, _this6);
        this.upload(file);
      }.bind(this));
    }
  }
};
exports.default = _default;

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_index_js_upload_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(376);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_index_js_upload_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_index_js_upload_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_index_js_upload_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_index_js_upload_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_index_js_upload_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 376:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(4));

var _stubArray = _interopRequireDefault(__webpack_require__(57));

var _icon = _interopRequireDefault(__webpack_require__(20));

var _progress = _interopRequireDefault(__webpack_require__(490));

var logger = __webpack_require__(0).get("iview:components:upload:upload-list.vue");

var prefixCls = 'ivu-upload';
var _default = {
  name: 'UploadList',
  components: {
    Icon: _icon.default,
    iProgress: _progress.default
  },
  props: {
    files: {
      default: _stubArray.default,
      type: Array
    }
  },
  data: function data() {
    return {
      prefixCls: prefixCls
    };
  },
  methods: {
    fileCls: function fileCls(file) {
      return ["".concat(prefixCls, "-list-file"), (0, _defineProperty2.default)({}, "".concat(prefixCls, "-list-file-finish"), file.status === 'finished')];
    },
    format: function format(file) {
      var format = file.name.split('.').pop().toLocaleLowerCase() || '';
      var type = 'document';

      if (['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'].indexOf(format) > -1) {
        type = 'image';
      }

      if (['mp4', 'm3u8', 'rmvb', 'avi', 'swf', '3gp', 'mkv', 'flv'].indexOf(format) > -1) {
        type = 'ios-film';
      }

      if (['mp3', 'wav', 'wma', 'ogg', 'aac', 'flac'].indexOf(format) > -1) {
        type = 'ios-musical-notes';
      }

      if (['doc', 'txt', 'docx', 'pages', 'epub', 'pdf'].indexOf(format) > -1) {
        type = 'document-text';
      }

      if (['numbers', 'csv', 'xls', 'xlsx'].indexOf(format) > -1) {
        type = 'stats-bars';
      }

      if (['keynote', 'ppt', 'pptx'].indexOf(format) > -1) {
        type = 'ios-videocam';
      }

      return type;
    },
    handleClick: function handleClick(file) {
      this.$emit('on-file-click', file);
    },
    handlePreview: function handlePreview(file) {
      this.$emit('on-file-preview', file);
    },
    handleRemove: function handleRemove(file) {
      this.$emit('on-file-remove', file);
    },
    parsePercentage: function parsePercentage(val) {
      return parseInt(val, 10);
    }
  }
};
exports.default = _default;

/***/ }),

/***/ 39:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__39__;

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ 40:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__40__;

/***/ }),

/***/ 41:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__41__;

/***/ }),

/***/ 42:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__42__;

/***/ }),

/***/ 43:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__43__;

/***/ }),

/***/ 434:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/upload/upload.vue?vue&type=template&id=e0a7bd5e&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[_vm.prefixCls]},[_c('div',{class:_vm.classes,on:{"click":_vm.handleClick,"drop":function($event){$event.preventDefault();return _vm.onDrop($event)},"dragover":function($event){$event.preventDefault();_vm.dragOver = true},"dragleave":function($event){$event.preventDefault();_vm.dragOver = false}}},[_c('input',{ref:"input",class:[_vm.prefixCls + '-input'],attrs:{"type":"file","multiple":_vm.multiple,"accept":_vm.accept},on:{"change":_vm.handleChange}}),_vm._v(" "),_vm._t("default")],2),_vm._v(" "),_vm._t("tip"),_vm._v(" "),(_vm.showUploadList)?_c('upload-list',{attrs:{"files":_vm.fileList},on:{"on-file-remove":_vm.handleRemove,"on-file-preview":_vm.handlePreview}}):_vm._e()],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/upload/upload.vue?vue&type=template&id=e0a7bd5e&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

var baseFindKey = __webpack_require__(45),
    baseForOwn = __webpack_require__(46),
    baseIteratee = __webpack_require__(49);

/**
 * This method is like `_.find` except that it returns the key of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Object
 * @param {Object} object The object to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @returns {string|undefined} Returns the key of the matched element,
 *  else `undefined`.
 * @example
 *
 * var users = {
 *   'barney':  { 'age': 36, 'active': true },
 *   'fred':    { 'age': 40, 'active': false },
 *   'pebbles': { 'age': 1,  'active': true }
 * };
 *
 * _.findKey(users, function(o) { return o.age < 40; });
 * // => 'barney' (iteration order is not guaranteed)
 *
 * // The `_.matches` iteratee shorthand.
 * _.findKey(users, { 'age': 1, 'active': true });
 * // => 'pebbles'
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findKey(users, ['active', false]);
 * // => 'fred'
 *
 * // The `_.property` iteratee shorthand.
 * _.findKey(users, 'active');
 * // => 'barney'
 */
function findKey(object, predicate) {
  return baseFindKey(object, baseIteratee(predicate, 3), baseForOwn);
}

module.exports = findKey;


/***/ }),

/***/ 45:
/***/ (function(module, exports) {

/**
 * The base implementation of methods like `_.findKey` and `_.findLastKey`,
 * without support for iteratee shorthands, which iterates over `collection`
 * using `eachFunc`.
 *
 * @private
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @returns {*} Returns the found element or its key, else `undefined`.
 */
function baseFindKey(collection, predicate, eachFunc) {
  var result;
  eachFunc(collection, function(value, key, collection) {
    if (predicate(value, key, collection)) {
      result = key;
      return false;
    }
  });
  return result;
}

module.exports = baseFindKey;


/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

var baseFor = __webpack_require__(47),
    keys = __webpack_require__(23);

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;


/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

var createBaseFor = __webpack_require__(48);

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;


/***/ }),

/***/ 470:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/upload/upload-list.vue?vue&type=template&id=3c618f29&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{class:[_vm.prefixCls + '-list']},_vm._l((_vm.files),function(file,i){return _c('li',{key:i,class:_vm.fileCls(file),on:{"click":function($event){return _vm.handleClick(file)}}},[_c('span',{on:{"click":function($event){return _vm.handlePreview(file)}}},[_c('icon',{attrs:{"type":_vm.format(file)}}),_vm._v(" "+_vm._s(file.name)+"\n    ")],1),_vm._v(" "),_c('icon',{directives:[{name:"show",rawName:"v-show",value:(file.status === 'finished'),expression:"file.status === 'finished'"}],class:[_vm.prefixCls + '-list-remove'],attrs:{"type":"times","weight":"regular"},nativeOn:{"click":function($event){return _vm.handleRemove(file)}}}),_vm._v(" "),_c('transition',{attrs:{"name":"fade"}},[(file.showProgress)?_c('i-progress',{attrs:{"stroke-width":2,"percent":_vm.parsePercentage(file.percentage),"status":file.status === 'finished' && file.showProgress ? 'success' : 'normal'}}):_vm._e()],1)],1)}),0)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/upload/upload-list.vue?vue&type=template&id=3c618f29&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),

/***/ 48:
/***/ (function(module, exports) {

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;


/***/ }),

/***/ 49:
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),

/***/ 490:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _progress_vue_vue_type_template_id_458f946f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(242);
/* harmony import */ var _progress_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(180);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _progress_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _progress_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _progress_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _progress_vue_vue_type_template_id_458f946f___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _progress_vue_vue_type_template_id_458f946f___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__5__;

/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(51);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;


/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(30),
    listCacheDelete = __webpack_require__(31),
    listCacheGet = __webpack_require__(33),
    listCacheHas = __webpack_require__(34),
    listCacheSet = __webpack_require__(35);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(8),
    isKey = __webpack_require__(59),
    stringToPath = __webpack_require__(61),
    toString = __webpack_require__(55);

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;


/***/ }),

/***/ 55:
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),

/***/ 56:
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),

/***/ 57:
/***/ (function(module, exports) {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

var baseHas = __webpack_require__(66),
    hasPath = __webpack_require__(67);

/**
 * Checks if `path` is a direct property of `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = { 'a': { 'b': 2 } };
 * var other = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.has(object, 'a');
 * // => true
 *
 * _.has(object, 'a.b');
 * // => true
 *
 * _.has(object, ['a', 'b']);
 * // => true
 *
 * _.has(other, 'a');
 * // => false
 */
function has(object, path) {
  return object != null && hasPath(object, path, baseHas);
}

module.exports = has;


/***/ }),

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(8),
    isSymbol = __webpack_require__(60);

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;


/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = not;

var logger = __webpack_require__(0).get("iview:Assets:not");

function not(value) {
  return !value;
}

/***/ }),

/***/ 60:
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

var memoizeCapped = __webpack_require__(62);

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;


/***/ }),

/***/ 62:
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),

/***/ 66:
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.has` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHas(object, key) {
  return object != null && hasOwnProperty.call(object, key);
}

module.exports = baseHas;


/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(54),
    isArguments = __webpack_require__(68),
    isArray = __webpack_require__(8),
    isIndex = __webpack_require__(69),
    isLength = __webpack_require__(70),
    toKey = __webpack_require__(56);

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

module.exports = hasPath;


/***/ }),

/***/ 68:
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),

/***/ 69:
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),

/***/ 698:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1);

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _upload.default;
  }
});

var _upload = _interopRequireDefault(__webpack_require__(699));

var logger = __webpack_require__(0).get("iview:components:upload:index");

/***/ }),

/***/ 699:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _upload_vue_vue_type_template_id_e0a7bd5e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(434);
/* harmony import */ var _upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(373);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _upload_vue_vue_type_template_id_e0a7bd5e___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _upload_vue_vue_type_template_id_e0a7bd5e___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

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

/***/ 70:
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),

/***/ 700:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _upload_list_vue_vue_type_template_id_3c618f29___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(470);
/* harmony import */ var _upload_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(375);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _upload_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _upload_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _upload_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _upload_list_vue_vue_type_template_id_3c618f29___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _upload_list_vue_vue_type_template_id_3c618f29___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 701:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = upload;

var _newArrowCheck2 = _interopRequireDefault(__webpack_require__(3));

var _has = _interopRequireDefault(__webpack_require__(58));

var logger = __webpack_require__(0).get("iview:components:upload:ajax");

function getError(action, option, xhr) {
  var msg = "fail to post ".concat(action, " ").concat(xhr.status, "'");
  var err = new Error(msg);
  err.status = xhr.status;
  err.method = 'post';
  err.url = action;
  return err;
}

function getBody(xhr) {
  var text = xhr.responseText || xhr.response;

  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

function upload(option) {
  var _this = this;

  if (typeof XMLHttpRequest === 'undefined') {
    return;
  }

  var xhr = new XMLHttpRequest();
  var action = option.action;

  if (xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        e.percent = e.loaded / e.total * 100;
      }

      option.onProgress(e);
    };
  }

  var formData = new FormData();

  if (option.data) {
    Object.keys(option.data).forEach(function (key) {
      (0, _newArrowCheck2.default)(this, _this);
      formData.append(key, option.data[key]);
    }.bind(this));
  }

  formData.append(option.filename, option.file);

  xhr.onerror = function error(e) {
    option.onError(e);
  };

  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(action, option, xhr), getBody(xhr));
    }

    option.onSuccess(getBody(xhr));
    return undefined;
  };

  xhr.open('post', action, true);

  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  var headers = option.headers || {}; // if (headers['X-Requested-With'] !== null) {
  //   xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  // }

  /* eslint-disable-next-line no-restricted-syntax */

  for (var item in headers) {
    if ((0, _has.default)(headers, item) && headers[item] !== null) {
      xhr.setRequestHeader(item, headers[item]);
    }
  }

  xhr.send(formData);
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


/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(32);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ })

/******/ });
});
//# sourceMappingURL=upload.js.map