!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("vue")):"function"==typeof define&&define.amd?define("iview/locale",["vue"],t):"object"==typeof exports?exports["iview/locale"]=t(require("vue")):e["iview/locale"]=t(e.Vue)}(window,function(e){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist/locale/",n(n.s=4)}([function(e,t){e.exports=function(e){return e&&e.__esModule?e:{default:e}}},function(e,t,n){var o,r;
/*!
 * js-logger - http://github.com/jonnyreeves/js-logger
 * Jonny Reeves, http://jonnyreeves.co.uk/
 * js-logger may be freely distributed under the MIT license.
 */
/*!
 * js-logger - http://github.com/jonnyreeves/js-logger
 * Jonny Reeves, http://jonnyreeves.co.uk/
 * js-logger may be freely distributed under the MIT license.
 */!function(i){"use strict";var l,a={VERSION:"1.6.0"},c={},u=function(e,t){return function(){return t.apply(e,arguments)}},s=function(){var e,t,n=arguments,o=n[0];for(t=1;t<n.length;t++)for(e in n[t])e in o||!n[t].hasOwnProperty(e)||(o[e]=n[t][e]);return o},f=function(e,t){return{value:e,name:t}};a.TRACE=f(1,"TRACE"),a.DEBUG=f(2,"DEBUG"),a.INFO=f(3,"INFO"),a.TIME=f(4,"TIME"),a.WARN=f(5,"WARN"),a.ERROR=f(8,"ERROR"),a.OFF=f(99,"OFF");var d=function(e){this.context=e,this.setLevel(e.filterLevel),this.log=this.info};d.prototype={setLevel:function(e){e&&"value"in e&&(this.context.filterLevel=e)},getLevel:function(){return this.context.filterLevel},enabledFor:function(e){var t=this.context.filterLevel;return e.value>=t.value},trace:function(){this.invoke(a.TRACE,arguments)},debug:function(){this.invoke(a.DEBUG,arguments)},info:function(){this.invoke(a.INFO,arguments)},warn:function(){this.invoke(a.WARN,arguments)},error:function(){this.invoke(a.ERROR,arguments)},time:function(e){"string"==typeof e&&e.length>0&&this.invoke(a.TIME,[e,"start"])},timeEnd:function(e){"string"==typeof e&&e.length>0&&this.invoke(a.TIME,[e,"end"])},invoke:function(e,t){l&&this.enabledFor(e)&&l(t,s({level:e},this.context))}};var v,m=new d({filterLevel:a.OFF});(v=a).enabledFor=u(m,m.enabledFor),v.trace=u(m,m.trace),v.debug=u(m,m.debug),v.time=u(m,m.time),v.timeEnd=u(m,m.timeEnd),v.info=u(m,m.info),v.warn=u(m,m.warn),v.error=u(m,m.error),v.log=v.info,a.setHandler=function(e){l=e},a.setLevel=function(e){for(var t in m.setLevel(e),c)c.hasOwnProperty(t)&&c[t].setLevel(e)},a.getLevel=function(){return m.getLevel()},a.get=function(e){return c[e]||(c[e]=new d(s({name:e},m.context)))},a.createDefaultHandler=function(e){(e=e||{}).formatter=e.formatter||function(e,t){t.name&&e.unshift("["+t.name+"]")};var t={},n=function(e,t){Function.prototype.apply.call(e,console,t)};return"undefined"==typeof console?function(){}:function(o,r){o=Array.prototype.slice.call(o);var i,l=console.log;r.level===a.TIME?(i=(r.name?"["+r.name+"] ":"")+o[0],"start"===o[1]?console.time?console.time(i):t[i]=(new Date).getTime():console.timeEnd?console.timeEnd(i):n(l,[i+": "+((new Date).getTime()-t[i])+"ms"])):(r.level===a.WARN&&console.warn?l=console.warn:r.level===a.ERROR&&console.error?l=console.error:r.level===a.INFO&&console.info?l=console.info:r.level===a.DEBUG&&console.debug?l=console.debug:r.level===a.TRACE&&console.trace&&(l=console.trace),e.formatter(o,r),n(l,o))}},a.useDefaults=function(e){a.setLevel(e&&e.defaultLevel||a.DEBUG),a.setHandler(a.createDefaultHandler(e))},void 0===(r="function"==typeof(o=a)?o.call(t,n,t,e):o)||(e.exports=r)}()},function(e,t,n){"use strict";var o=n(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){i||"undefined"!=typeof iview&&("langs"in iview||(iview.langs={}),iview.langs[e.i.locale]=e)};var r=o(n(3)),i=(n(1).get("iview:locale:lang"),r.default.prototype.$isServer)},function(t,n){t.exports=e},function(e,t,n){"use strict";var o=n(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(n(2)),i=(n(1).get("iview:locale:lang:cs-CZ"),{i:{datepicker:{clear:"Vymazat",datePanelLabel:"[mmmm] [yyyy]",endTime:"Konec",month:"Měsíc",month1:"Leden",month10:"Říjen",month11:"Listopad",month12:"Prosinec",month2:"Únor",month3:"Březen",month4:"Duben",month5:"Květen",month6:"Červen",month7:"Červenec",month8:"Srpen",month9:"Září",months:{m1:"Led",m10:"Říj",m11:"Lis",m12:"Pro",m2:"Úno",m3:"Bře",m4:"Dub",m5:"Kvě",m6:"Čer",m7:"Čnc",m8:"Srp",m9:"Zář"},ok:"OK",selectDate:"Vybrat datum",selectTime:"Vybrat čas",startTime:"Začátek",weeks:{fri:"Pá",mon:"Po",sat:"So",sun:"Ne",thu:"Čt",tue:"Út",wed:"St"},weekStartDay:"1",year:"Rok"},locale:"cs-CZ",modal:{cancelText:"Zrušit",okText:"OK"},page:{goto:"Jít na",item:"položka",items:"položek",next:"Předchozí",next5:"Následujících 5 stránek",p:"",page:"na stránku",prev:"Následující",prev5:"Předchozích 5 stránek",total:"Celkem"},poptip:{cancelText:"Zrušit",okText:"OK"},rate:{star:"hvězda",stars:"hvězdy"},select:{loading:"Nahrávám",noMatch:"Nenalezeny žádné položky",placeholder:"Vybrat"},table:{clearFilter:"Vše",confirmFilter:"Potvrdit",noDataText:"Žádná data",noFilteredDataText:"Nenalezeny žádné položky",resetFilter:"Reset"},transfer:{filterPlaceholder:"Hledat",notFoundText:"Nenalezeno",titles:{source:"Zdroj",target:"Cíl"}},tree:{emptyText:"Žádná data"}}});(0,r.default)(i);var l=i;t.default=l}])});
//# sourceMappingURL=cs-CZ.js.map