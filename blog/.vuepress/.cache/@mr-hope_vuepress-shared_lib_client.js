import {
  require_dayjs_min
} from "./chunk-RHUTP25B.js";
import {
  require_localizedFormat
} from "./chunk-GG2GV5SX.js";
import {
  require_objectSupport
} from "./chunk-UJLLDWRU.js";
import {
  require_timezone
} from "./chunk-SPNUHUU2.js";
import {
  require_utc
} from "./chunk-3EXDT3YR.js";
import {
  computed,
  defineComponent,
  h
} from "./chunk-G642NIRV.js";
import "./chunk-HY7UP3Y7.js";
import {
  __commonJS,
  __spreadProps,
  __spreadValues,
  __toESM,
  init_define_ARTICLE_INFO_LOCALES,
  init_define_BACK_TO_TOP_LOCALES,
  init_define_CODE_COPY_LOCALES,
  init_define_CODE_COPY_OPIONS,
  init_define_CODE_DEMO_OPTIONS,
  init_define_COMMENT_OPTIONS,
  init_define_EXTERNAL_LINK_ICON_LOCALES,
  init_define_MERMAID_OPTIONS,
  init_define_PAGINATION_LOCALES,
  init_define_PHOTO_SWIPE_LOCALES,
  init_define_PHOTO_SWIPE_OPTIONS,
  init_define_PWA_LOCALES,
  init_define_READING_TIME_LOCALES,
  init_define_REVEAL_CONFIG,
  init_define_WALINE_LOCALES
} from "./chunk-2JB763FX.js";

// ../../node_modules/tslib/tslib.js
var require_tslib = __commonJS({
  "../../node_modules/tslib/tslib.js"(exports, module) {
    init_define_ARTICLE_INFO_LOCALES();
    init_define_BACK_TO_TOP_LOCALES();
    init_define_CODE_COPY_LOCALES();
    init_define_CODE_COPY_OPIONS();
    init_define_CODE_DEMO_OPTIONS();
    init_define_COMMENT_OPTIONS();
    init_define_MERMAID_OPTIONS();
    init_define_PAGINATION_LOCALES();
    init_define_PHOTO_SWIPE_LOCALES();
    init_define_PHOTO_SWIPE_OPTIONS();
    init_define_PWA_LOCALES();
    init_define_READING_TIME_LOCALES();
    init_define_REVEAL_CONFIG();
    init_define_WALINE_LOCALES();
    init_define_EXTERNAL_LINK_ICON_LOCALES();
    var __extends;
    var __assign;
    var __rest;
    var __decorate;
    var __param;
    var __metadata;
    var __awaiter;
    var __generator;
    var __exportStar;
    var __values;
    var __read;
    var __spread;
    var __spreadArrays;
    var __spreadArray;
    var __await;
    var __asyncGenerator;
    var __asyncDelegator;
    var __asyncValues;
    var __makeTemplateObject;
    var __importStar;
    var __importDefault;
    var __classPrivateFieldGet;
    var __classPrivateFieldSet;
    var __createBinding;
    (function(factory) {
      var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
      if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function(exports2) {
          factory(createExporter(root, createExporter(exports2)));
        });
      } else if (typeof module === "object" && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
      } else {
        factory(createExporter(root));
      }
      function createExporter(exports2, previous) {
        if (exports2 !== root) {
          if (typeof Object.create === "function") {
            Object.defineProperty(exports2, "__esModule", { value: true });
          } else {
            exports2.__esModule = true;
          }
        }
        return function(id, v) {
          return exports2[id] = previous ? previous(id, v) : v;
        };
      }
    })(function(exporter) {
      var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
        d.__proto__ = b;
      } || function(d, b) {
        for (var p in b)
          if (Object.prototype.hasOwnProperty.call(b, p))
            d[p] = b[p];
      };
      __extends = function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      __rest = function(s, e) {
        var t = {};
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
          }
        return t;
      };
      __decorate = function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      __param = function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      __metadata = function(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(metadataKey, metadataValue);
      };
      __awaiter = function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      __generator = function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (_)
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                return t;
              if (y = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _.label < t[2]) {
                    _.label = t[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      __exportStar = function(m, o) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
            __createBinding(o, m, p);
      };
      __createBinding = Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      };
      __values = function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
          return m.call(o);
        if (o && typeof o.length === "number")
          return {
            next: function() {
              if (o && i >= o.length)
                o = void 0;
              return { value: o && o[i++], done: !o };
            }
          };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      __read = function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
          return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"]))
              m.call(i);
          } finally {
            if (e)
              throw e.error;
          }
        }
        return ar;
      };
      __spread = function() {
        for (var ar = [], i = 0; i < arguments.length; i++)
          ar = ar.concat(__read(arguments[i]));
        return ar;
      };
      __spreadArrays = function() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
          s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
        return r;
      };
      __spreadArray = function(to, from, pack) {
        if (pack || arguments.length === 2)
          for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
              if (!ar)
                ar = Array.prototype.slice.call(from, 0, i);
              ar[i] = from[i];
            }
          }
        return to.concat(ar || Array.prototype.slice.call(from));
      };
      __await = function(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
      };
      __asyncGenerator = function(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i;
        function verb(n) {
          if (g[n])
            i[n] = function(v) {
              return new Promise(function(a, b) {
                q.push([n, v, a, b]) > 1 || resume(n, v);
              });
            };
        }
        function resume(n, v) {
          try {
            step(g[n](v));
          } catch (e) {
            settle(q[0][3], e);
          }
        }
        function step(r) {
          r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
        }
        function fulfill(value) {
          resume("next", value);
        }
        function reject(value) {
          resume("throw", value);
        }
        function settle(f, v) {
          if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]);
        }
      };
      __asyncDelegator = function(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function(e) {
          throw e;
        }), verb("return"), i[Symbol.iterator] = function() {
          return this;
        }, i;
        function verb(n, f) {
          i[n] = o[n] ? function(v) {
            return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v;
          } : f;
        }
      };
      __asyncValues = function(o) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i);
        function verb(n) {
          i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
              v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
          };
        }
        function settle(resolve, reject, d, v) {
          Promise.resolve(v).then(function(v2) {
            resolve({ value: v2, done: d });
          }, reject);
        }
      };
      __makeTemplateObject = function(cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", { value: raw });
        } else {
          cooked.raw = raw;
        }
        return cooked;
      };
      var __setModuleDefault = Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      };
      __importStar = function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      __classPrivateFieldGet = function(receiver, state, kind, f) {
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
      };
      __classPrivateFieldSet = function(receiver, state, value, kind, f) {
        if (kind === "m")
          throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
      };
      exporter("__extends", __extends);
      exporter("__assign", __assign);
      exporter("__rest", __rest);
      exporter("__decorate", __decorate);
      exporter("__param", __param);
      exporter("__metadata", __metadata);
      exporter("__awaiter", __awaiter);
      exporter("__generator", __generator);
      exporter("__exportStar", __exportStar);
      exporter("__createBinding", __createBinding);
      exporter("__values", __values);
      exporter("__read", __read);
      exporter("__spread", __spread);
      exporter("__spreadArrays", __spreadArrays);
      exporter("__spreadArray", __spreadArray);
      exporter("__await", __await);
      exporter("__asyncGenerator", __asyncGenerator);
      exporter("__asyncDelegator", __asyncDelegator);
      exporter("__asyncValues", __asyncValues);
      exporter("__makeTemplateObject", __makeTemplateObject);
      exporter("__importStar", __importStar);
      exporter("__importDefault", __importDefault);
      exporter("__classPrivateFieldGet", __classPrivateFieldGet);
      exporter("__classPrivateFieldSet", __classPrivateFieldSet);
    });
  }
});

// ../shared/lib/shared/utils/capitalize.js
var require_capitalize = __commonJS({
  "../shared/lib/shared/utils/capitalize.js"(exports) {
    "use strict";
    init_define_ARTICLE_INFO_LOCALES();
    init_define_BACK_TO_TOP_LOCALES();
    init_define_CODE_COPY_LOCALES();
    init_define_CODE_COPY_OPIONS();
    init_define_CODE_DEMO_OPTIONS();
    init_define_COMMENT_OPTIONS();
    init_define_MERMAID_OPTIONS();
    init_define_PAGINATION_LOCALES();
    init_define_PHOTO_SWIPE_LOCALES();
    init_define_PHOTO_SWIPE_OPTIONS();
    init_define_PWA_LOCALES();
    init_define_READING_TIME_LOCALES();
    init_define_REVEAL_CONFIG();
    init_define_WALINE_LOCALES();
    init_define_EXTERNAL_LINK_ICON_LOCALES();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.strictCapitalize = exports.capitalize = void 0;
    var capitalize2 = (word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    exports.capitalize = capitalize2;
    var strictCapitalize2 = (word) => `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;
    exports.strictCapitalize = strictCapitalize2;
  }
});

// ../shared/lib/shared/utils/dayjs.js
var require_dayjs = __commonJS({
  "../shared/lib/shared/utils/dayjs.js"(exports) {
    "use strict";
    init_define_ARTICLE_INFO_LOCALES();
    init_define_BACK_TO_TOP_LOCALES();
    init_define_CODE_COPY_LOCALES();
    init_define_CODE_COPY_OPIONS();
    init_define_CODE_DEMO_OPTIONS();
    init_define_COMMENT_OPTIONS();
    init_define_MERMAID_OPTIONS();
    init_define_PAGINATION_LOCALES();
    init_define_PHOTO_SWIPE_LOCALES();
    init_define_PHOTO_SWIPE_OPTIONS();
    init_define_PWA_LOCALES();
    init_define_READING_TIME_LOCALES();
    init_define_REVEAL_CONFIG();
    init_define_WALINE_LOCALES();
    init_define_EXTERNAL_LINK_ICON_LOCALES();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.dayjs = void 0;
    var tslib_1 = require_tslib();
    var dayjs_1 = (0, tslib_1.__importDefault)(require_dayjs_min());
    var localizedFormat_1 = (0, tslib_1.__importDefault)(require_localizedFormat());
    var objectSupport_1 = (0, tslib_1.__importDefault)(require_objectSupport());
    var timezone_1 = (0, tslib_1.__importDefault)(require_timezone());
    var utc_1 = (0, tslib_1.__importDefault)(require_utc());
    dayjs_1.default.extend(localizedFormat_1.default);
    dayjs_1.default.extend(objectSupport_1.default);
    dayjs_1.default.extend(utc_1.default);
    dayjs_1.default.extend(timezone_1.default);
    var zhLocale = {
      name: "zh-cn",
      weekdays: "\u661F\u671F\u65E5_\u661F\u671F\u4E00_\u661F\u671F\u4E8C_\u661F\u671F\u4E09_\u661F\u671F\u56DB_\u661F\u671F\u4E94_\u661F\u671F\u516D".split("_"),
      weekdaysShort: "\u5468\u65E5_\u5468\u4E00_\u5468\u4E8C_\u5468\u4E09_\u5468\u56DB_\u5468\u4E94_\u5468\u516D".split("_"),
      weekdaysMin: "\u65E5_\u4E00_\u4E8C_\u4E09_\u56DB_\u4E94_\u516D".split("_"),
      months: "\u4E00\u6708_\u4E8C\u6708_\u4E09\u6708_\u56DB\u6708_\u4E94\u6708_\u516D\u6708_\u4E03\u6708_\u516B\u6708_\u4E5D\u6708_\u5341\u6708_\u5341\u4E00\u6708_\u5341\u4E8C\u6708".split("_"),
      monthsShort: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),
      ordinal: (number, period) => {
        switch (period) {
          case "W":
            return `${number}\u5468`;
          default:
            return `${number}\u65E5`;
        }
      },
      weekStart: 1,
      yearStart: 4,
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "YYYY/MM/DD",
        LL: "YYYY\u5E74M\u6708D\u65E5",
        LLL: "YYYY\u5E74M\u6708D\u65E5Ah\u70B9mm\u5206",
        LLLL: "YYYY\u5E74M\u6708D\u65E5ddddAh\u70B9mm\u5206",
        l: "YYYY/M/D",
        ll: "YYYY\u5E74M\u6708D\u65E5",
        lll: "YYYY\u5E74M\u6708D\u65E5 HH:mm",
        llll: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm"
      },
      relativeTime: {
        future: "%s\u5185",
        past: "%s\u524D",
        s: "\u51E0\u79D2",
        m: "1 \u5206\u949F",
        mm: "%d \u5206\u949F",
        h: "1 \u5C0F\u65F6",
        hh: "%d \u5C0F\u65F6",
        d: "1 \u5929",
        dd: "%d \u5929",
        M: "1 \u4E2A\u6708",
        MM: "%d \u4E2A\u6708",
        y: "1 \u5E74",
        yy: "%d \u5E74"
      },
      meridiem: (hour, minute) => {
        const hm = hour * 100 + minute;
        return hm < 600 ? "\u51CC\u6668" : hm < 900 ? "\u65E9\u4E0A" : hm < 1100 ? "\u4E0A\u5348" : hm < 1300 ? "\u4E2D\u5348" : hm < 1800 ? "\u4E0B\u5348" : "\u665A\u4E0A";
      }
    };
    var enLocale = {
      name: "en",
      weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_")
    };
    dayjs_1.default.locale("zh", zhLocale);
    dayjs_1.default.locale("en", enLocale);
    exports.dayjs = dayjs_1.default;
  }
});

// ../shared/lib/shared/utils/date.js
var require_date = __commonJS({
  "../shared/lib/shared/utils/date.js"(exports) {
    "use strict";
    init_define_ARTICLE_INFO_LOCALES();
    init_define_BACK_TO_TOP_LOCALES();
    init_define_CODE_COPY_LOCALES();
    init_define_CODE_COPY_OPIONS();
    init_define_CODE_DEMO_OPTIONS();
    init_define_COMMENT_OPTIONS();
    init_define_MERMAID_OPTIONS();
    init_define_PAGINATION_LOCALES();
    init_define_PHOTO_SWIPE_LOCALES();
    init_define_PHOTO_SWIPE_OPTIONS();
    init_define_PWA_LOCALES();
    init_define_READING_TIME_LOCALES();
    init_define_REVEAL_CONFIG();
    init_define_WALINE_LOCALES();
    init_define_EXTERNAL_LINK_ICON_LOCALES();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.compareDate = exports.getDate = exports.timeTransformer = void 0;
    var dayjs_1 = require_dayjs();
    var getLang = (lang = "en") => {
      const langcode = lang.toLowerCase();
      if (langcode === "zh" || langcode === "zh-cn")
        return "zh";
      if (langcode === "en-us" || langcode === "en-uk" || langcode === "en")
        return "en";
      console.warn(`${lang} locale missing in config`);
      return "en";
    };
    var timeTransformer2 = (date, options = {}) => {
      const { lang, timezone, type } = options;
      dayjs_1.dayjs.locale(getLang(lang));
      const dateText = timezone ? (0, dayjs_1.dayjs)(date).tz(timezone).format("LL") : (0, dayjs_1.dayjs)(date).format("LL");
      const timeText = timezone ? (0, dayjs_1.dayjs)(date).tz(timezone).format("HH:mm") : (0, dayjs_1.dayjs)(date).format("HH:mm");
      return type === "date" ? dateText : type === "time" ? timeText : `${dateText} ${timeText}`;
    };
    exports.timeTransformer = timeTransformer2;
    var getDate2 = (date, options = {}) => {
      const { timezone } = options;
      if (date) {
        const time = (0, dayjs_1.dayjs)(date instanceof Date ? date : date.trim());
        if (time.isValid()) {
          const currentTime = timezone ? (0, dayjs_1.dayjs)(date).tz(timezone) : (0, dayjs_1.dayjs)(date);
          const year = currentTime.year();
          const month = currentTime.month() + 1;
          const day = currentTime.date();
          const hour = currentTime.hour();
          const minute = currentTime.minute();
          const second = currentTime.second();
          const millisecond = currentTime.millisecond();
          const isDate = hour === 0 && minute === 0 && second === 0 && millisecond === 0;
          const value = currentTime.toDate();
          return {
            display: (0, exports.timeTransformer)(value, __spreadValues({
              type: isDate ? "date" : "full"
            }, options)),
            value,
            detail: __spreadValues({
              year,
              month,
              day
            }, isDate ? {} : { hour, minute, second })
          };
        }
        const timeRegPattern = /(?:(\d{2,4})[/-](\d{1,2})[/-](\d{1,2}))?\s*(?:(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?/u;
        const result = timeRegPattern.exec(date.trim());
        if (result) {
          const [, year, month, day, hour, minute, second] = result;
          const getNumber = (a) => typeof a === "undefined" ? void 0 : Number(a);
          const getYear = (yearNumber) => yearNumber && yearNumber < 100 ? yearNumber + 2e3 : yearNumber;
          const getSecond = (secondNumber) => hour && minute && !second ? 0 : secondNumber;
          const detail = {
            year: getYear(getNumber(year)),
            month: getNumber(month),
            day: getNumber(day),
            hour: getNumber(hour),
            minute: getNumber(minute),
            second: getSecond(getNumber(second))
          };
          const isTime = year === void 0 && month === void 0 && day === void 0;
          const isDate = hour === void 0 && minute === void 0 && second === void 0;
          const value = (0, dayjs_1.dayjs)(__spreadProps(__spreadValues({}, detail), { month: detail.month - 1 })).toDate();
          return {
            display: (0, exports.timeTransformer)(value, __spreadValues({
              type: isDate ? "date" : isTime ? "time" : "full"
            }, options)),
            value: isTime ? void 0 : value,
            detail: isDate ? { year: detail.year, month: detail.month, day: detail.day } : isTime ? { hour: detail.hour, minute: detail.minute, second: detail.second } : detail
          };
        }
      }
      return null;
    };
    exports.getDate = getDate2;
    var compareDate2 = (dateA, dateB) => {
      const parsedDateA = (0, exports.getDate)(typeof dateA === "number" ? new Date(dateA) : dateA);
      const parsedDateB = (0, exports.getDate)(typeof dateB === "number" ? new Date(dateB) : dateB);
      if (!parsedDateA || !parsedDateA.value)
        return 1;
      if (!parsedDateB || !parsedDateB.value)
        return -1;
      return parsedDateB.value.getTime() - parsedDateA.value.getTime();
    };
    exports.compareDate = compareDate2;
  }
});

// ../shared/lib/shared/utils/info.js
var require_info = __commonJS({
  "../shared/lib/shared/utils/info.js"(exports) {
    "use strict";
    init_define_ARTICLE_INFO_LOCALES();
    init_define_BACK_TO_TOP_LOCALES();
    init_define_CODE_COPY_LOCALES();
    init_define_CODE_COPY_OPIONS();
    init_define_CODE_DEMO_OPTIONS();
    init_define_COMMENT_OPTIONS();
    init_define_MERMAID_OPTIONS();
    init_define_PAGINATION_LOCALES();
    init_define_PHOTO_SWIPE_LOCALES();
    init_define_PHOTO_SWIPE_OPTIONS();
    init_define_PWA_LOCALES();
    init_define_READING_TIME_LOCALES();
    init_define_REVEAL_CONFIG();
    init_define_WALINE_LOCALES();
    init_define_EXTERNAL_LINK_ICON_LOCALES();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getTag = exports.getCategory = exports.getAuthor = void 0;
    var capitalize_1 = require_capitalize();
    var getAuthor2 = (author, canDisable = false) => {
      if (author) {
        if (Array.isArray(author)) {
          return author.map((item) => typeof item === "string" ? { name: item } : item);
        }
        if (typeof author === "string")
          return [{ name: author }];
        if (typeof author === "object" && author.name)
          return [author];
        console.error(`Expect 'author' to be \`AuthorInfo[] | AuthorInfo | string[] | string ${canDisable ? "" : "| false"} | undefined\`, but got`, author);
        return [];
      }
      return [];
    };
    exports.getAuthor = getAuthor2;
    var getCategory2 = (category) => {
      if (category) {
        if (Array.isArray(category))
          return category.map(capitalize_1.capitalize);
        if (typeof category === "string")
          return [(0, capitalize_1.capitalize)(category)];
        console.error(`Expect 'category' to be \`string[] | string | undefined\`, but got`, category);
      }
      return [];
    };
    exports.getCategory = getCategory2;
    var getTag2 = (tag) => {
      if (tag) {
        if (Array.isArray(tag))
          return tag;
        if (typeof tag === "string")
          return [tag];
        console.error(`Expect 'tag' to be \`string[] | string | undefined\`, but got`, tag);
      }
      return [];
    };
    exports.getTag = getTag2;
  }
});

// ../shared/lib/shared/utils/url.js
var require_url = __commonJS({
  "../shared/lib/shared/utils/url.js"(exports) {
    "use strict";
    init_define_ARTICLE_INFO_LOCALES();
    init_define_BACK_TO_TOP_LOCALES();
    init_define_CODE_COPY_LOCALES();
    init_define_CODE_COPY_OPIONS();
    init_define_CODE_DEMO_OPTIONS();
    init_define_COMMENT_OPTIONS();
    init_define_MERMAID_OPTIONS();
    init_define_PAGINATION_LOCALES();
    init_define_PHOTO_SWIPE_LOCALES();
    init_define_PHOTO_SWIPE_OPTIONS();
    init_define_PWA_LOCALES();
    init_define_READING_TIME_LOCALES();
    init_define_REVEAL_CONFIG();
    init_define_WALINE_LOCALES();
    init_define_EXTERNAL_LINK_ICON_LOCALES();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isAbsoluteUrl = exports.isUrl = void 0;
    var isUrl2 = (test) => {
      if (typeof test !== "string" || test === "")
        return false;
      const result = /^(?:\w+:)?\/\/(\S+)$/u.exec(test);
      if (!result)
        return false;
      const address = result[1];
      if (!address)
        return false;
      return /^localhost[:?\d]*(?:[^:?\d]\S*)?$/u.test(address) || /^[^\s.]+\.\S{2,}$/u.test(address);
    };
    exports.isUrl = isUrl2;
    var isAbsoluteUrl2 = (test) => test.startsWith("/");
    exports.isAbsoluteUrl = isAbsoluteUrl2;
  }
});

// ../shared/lib/shared/utils/index.js
var require_utils = __commonJS({
  "../shared/lib/shared/utils/index.js"(exports) {
    "use strict";
    init_define_ARTICLE_INFO_LOCALES();
    init_define_BACK_TO_TOP_LOCALES();
    init_define_CODE_COPY_LOCALES();
    init_define_CODE_COPY_OPIONS();
    init_define_CODE_DEMO_OPTIONS();
    init_define_COMMENT_OPTIONS();
    init_define_MERMAID_OPTIONS();
    init_define_PAGINATION_LOCALES();
    init_define_PHOTO_SWIPE_LOCALES();
    init_define_PHOTO_SWIPE_OPTIONS();
    init_define_PWA_LOCALES();
    init_define_READING_TIME_LOCALES();
    init_define_REVEAL_CONFIG();
    init_define_WALINE_LOCALES();
    init_define_EXTERNAL_LINK_ICON_LOCALES();
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    (0, tslib_1.__exportStar)(require_capitalize(), exports);
    (0, tslib_1.__exportStar)(require_date(), exports);
    (0, tslib_1.__exportStar)(require_info(), exports);
    (0, tslib_1.__exportStar)(require_url(), exports);
  }
});

// ../shared/lib/shared/types/author.js
var require_author = __commonJS({
  "../shared/lib/shared/types/author.js"(exports) {
    "use strict";
    init_define_ARTICLE_INFO_LOCALES();
    init_define_BACK_TO_TOP_LOCALES();
    init_define_CODE_COPY_LOCALES();
    init_define_CODE_COPY_OPIONS();
    init_define_CODE_DEMO_OPTIONS();
    init_define_COMMENT_OPTIONS();
    init_define_MERMAID_OPTIONS();
    init_define_PAGINATION_LOCALES();
    init_define_PHOTO_SWIPE_LOCALES();
    init_define_PHOTO_SWIPE_OPTIONS();
    init_define_PWA_LOCALES();
    init_define_READING_TIME_LOCALES();
    init_define_REVEAL_CONFIG();
    init_define_WALINE_LOCALES();
    init_define_EXTERNAL_LINK_ICON_LOCALES();
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// ../shared/lib/shared/types/locales.js
var require_locales = __commonJS({
  "../shared/lib/shared/types/locales.js"(exports) {
    "use strict";
    init_define_ARTICLE_INFO_LOCALES();
    init_define_BACK_TO_TOP_LOCALES();
    init_define_CODE_COPY_LOCALES();
    init_define_CODE_COPY_OPIONS();
    init_define_CODE_DEMO_OPTIONS();
    init_define_COMMENT_OPTIONS();
    init_define_MERMAID_OPTIONS();
    init_define_PAGINATION_LOCALES();
    init_define_PHOTO_SWIPE_LOCALES();
    init_define_PHOTO_SWIPE_OPTIONS();
    init_define_PWA_LOCALES();
    init_define_READING_TIME_LOCALES();
    init_define_REVEAL_CONFIG();
    init_define_WALINE_LOCALES();
    init_define_EXTERNAL_LINK_ICON_LOCALES();
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// ../shared/lib/shared/types/frontmatter.js
var require_frontmatter = __commonJS({
  "../shared/lib/shared/types/frontmatter.js"(exports) {
    "use strict";
    init_define_ARTICLE_INFO_LOCALES();
    init_define_BACK_TO_TOP_LOCALES();
    init_define_CODE_COPY_LOCALES();
    init_define_CODE_COPY_OPIONS();
    init_define_CODE_DEMO_OPTIONS();
    init_define_COMMENT_OPTIONS();
    init_define_MERMAID_OPTIONS();
    init_define_PAGINATION_LOCALES();
    init_define_PHOTO_SWIPE_LOCALES();
    init_define_PHOTO_SWIPE_OPTIONS();
    init_define_PWA_LOCALES();
    init_define_READING_TIME_LOCALES();
    init_define_REVEAL_CONFIG();
    init_define_WALINE_LOCALES();
    init_define_EXTERNAL_LINK_ICON_LOCALES();
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// ../shared/lib/shared/types/themeConfig.js
var require_themeConfig = __commonJS({
  "../shared/lib/shared/types/themeConfig.js"(exports) {
    "use strict";
    init_define_ARTICLE_INFO_LOCALES();
    init_define_BACK_TO_TOP_LOCALES();
    init_define_CODE_COPY_LOCALES();
    init_define_CODE_COPY_OPIONS();
    init_define_CODE_DEMO_OPTIONS();
    init_define_COMMENT_OPTIONS();
    init_define_MERMAID_OPTIONS();
    init_define_PAGINATION_LOCALES();
    init_define_PHOTO_SWIPE_LOCALES();
    init_define_PHOTO_SWIPE_OPTIONS();
    init_define_PWA_LOCALES();
    init_define_READING_TIME_LOCALES();
    init_define_REVEAL_CONFIG();
    init_define_WALINE_LOCALES();
    init_define_EXTERNAL_LINK_ICON_LOCALES();
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// ../shared/lib/shared/types/index.js
var require_types = __commonJS({
  "../shared/lib/shared/types/index.js"(exports) {
    "use strict";
    init_define_ARTICLE_INFO_LOCALES();
    init_define_BACK_TO_TOP_LOCALES();
    init_define_CODE_COPY_LOCALES();
    init_define_CODE_COPY_OPIONS();
    init_define_CODE_DEMO_OPTIONS();
    init_define_COMMENT_OPTIONS();
    init_define_MERMAID_OPTIONS();
    init_define_PAGINATION_LOCALES();
    init_define_PHOTO_SWIPE_LOCALES();
    init_define_PHOTO_SWIPE_OPTIONS();
    init_define_PWA_LOCALES();
    init_define_READING_TIME_LOCALES();
    init_define_REVEAL_CONFIG();
    init_define_WALINE_LOCALES();
    init_define_EXTERNAL_LINK_ICON_LOCALES();
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    (0, tslib_1.__exportStar)(require_author(), exports);
    (0, tslib_1.__exportStar)(require_locales(), exports);
    (0, tslib_1.__exportStar)(require_frontmatter(), exports);
    (0, tslib_1.__exportStar)(require_themeConfig(), exports);
  }
});

// ../shared/lib/shared/index.js
var require_shared = __commonJS({
  "../shared/lib/shared/index.js"(exports) {
    "use strict";
    init_define_ARTICLE_INFO_LOCALES();
    init_define_BACK_TO_TOP_LOCALES();
    init_define_CODE_COPY_LOCALES();
    init_define_CODE_COPY_OPIONS();
    init_define_CODE_DEMO_OPTIONS();
    init_define_COMMENT_OPTIONS();
    init_define_MERMAID_OPTIONS();
    init_define_PAGINATION_LOCALES();
    init_define_PHOTO_SWIPE_LOCALES();
    init_define_PHOTO_SWIPE_OPTIONS();
    init_define_PWA_LOCALES();
    init_define_READING_TIME_LOCALES();
    init_define_REVEAL_CONFIG();
    init_define_WALINE_LOCALES();
    init_define_EXTERNAL_LINK_ICON_LOCALES();
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    (0, tslib_1.__exportStar)(require_utils(), exports);
    (0, tslib_1.__exportStar)(require_types(), exports);
  }
});

// dep:@mr-hope_vuepress-shared_lib_client
init_define_ARTICLE_INFO_LOCALES();
init_define_BACK_TO_TOP_LOCALES();
init_define_CODE_COPY_LOCALES();
init_define_CODE_COPY_OPIONS();
init_define_CODE_DEMO_OPTIONS();
init_define_COMMENT_OPTIONS();
init_define_MERMAID_OPTIONS();
init_define_PAGINATION_LOCALES();
init_define_PHOTO_SWIPE_LOCALES();
init_define_PHOTO_SWIPE_OPTIONS();
init_define_PWA_LOCALES();
init_define_READING_TIME_LOCALES();
init_define_REVEAL_CONFIG();
init_define_WALINE_LOCALES();
init_define_EXTERNAL_LINK_ICON_LOCALES();

// ../shared/lib/client/index.js
init_define_ARTICLE_INFO_LOCALES();
init_define_BACK_TO_TOP_LOCALES();
init_define_CODE_COPY_LOCALES();
init_define_CODE_COPY_OPIONS();
init_define_CODE_DEMO_OPTIONS();
init_define_COMMENT_OPTIONS();
init_define_MERMAID_OPTIONS();
init_define_PAGINATION_LOCALES();
init_define_PHOTO_SWIPE_LOCALES();
init_define_PHOTO_SWIPE_OPTIONS();
init_define_PWA_LOCALES();
init_define_READING_TIME_LOCALES();
init_define_REVEAL_CONFIG();
init_define_WALINE_LOCALES();
init_define_EXTERNAL_LINK_ICON_LOCALES();
var import_shared2 = __toESM(require_shared());

// ../shared/lib/client/components/index.js
init_define_ARTICLE_INFO_LOCALES();
init_define_BACK_TO_TOP_LOCALES();
init_define_CODE_COPY_LOCALES();
init_define_CODE_COPY_OPIONS();
init_define_CODE_DEMO_OPTIONS();
init_define_COMMENT_OPTIONS();
init_define_MERMAID_OPTIONS();
init_define_PAGINATION_LOCALES();
init_define_PHOTO_SWIPE_LOCALES();
init_define_PHOTO_SWIPE_OPTIONS();
init_define_PWA_LOCALES();
init_define_READING_TIME_LOCALES();
init_define_REVEAL_CONFIG();
init_define_WALINE_LOCALES();
init_define_EXTERNAL_LINK_ICON_LOCALES();

// ../shared/lib/client/components/IconBase.js
init_define_ARTICLE_INFO_LOCALES();
init_define_BACK_TO_TOP_LOCALES();
init_define_CODE_COPY_LOCALES();
init_define_CODE_COPY_OPIONS();
init_define_CODE_DEMO_OPTIONS();
init_define_COMMENT_OPTIONS();
init_define_MERMAID_OPTIONS();
init_define_PAGINATION_LOCALES();
init_define_PHOTO_SWIPE_LOCALES();
init_define_PHOTO_SWIPE_OPTIONS();
init_define_PWA_LOCALES();
init_define_READING_TIME_LOCALES();
init_define_REVEAL_CONFIG();
init_define_WALINE_LOCALES();
init_define_EXTERNAL_LINK_ICON_LOCALES();
var IconBase = defineComponent({
  name: "IconBase",
  props: {
    name: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "currentColor"
    }
  },
  setup: (props, { slots }) => () => {
    var _a;
    return h("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      class: ["icon", `${props.name}-icon`],
      viewBox: "0 0 1024 1024",
      ariaLabelledby: props.name
    }, [
      h("title", { id: props.name, lang: "en" }, `${props.name} icon`),
      h("g", { fill: props.color }, (_a = slots.default) == null ? void 0 : _a.call(slots))
    ]);
  }
});

// ../shared/lib/client/composables/index.js
init_define_ARTICLE_INFO_LOCALES();
init_define_BACK_TO_TOP_LOCALES();
init_define_CODE_COPY_LOCALES();
init_define_CODE_COPY_OPIONS();
init_define_CODE_DEMO_OPTIONS();
init_define_COMMENT_OPTIONS();
init_define_MERMAID_OPTIONS();
init_define_PAGINATION_LOCALES();
init_define_PHOTO_SWIPE_LOCALES();
init_define_PHOTO_SWIPE_OPTIONS();
init_define_PWA_LOCALES();
init_define_READING_TIME_LOCALES();
init_define_REVEAL_CONFIG();
init_define_WALINE_LOCALES();
init_define_EXTERNAL_LINK_ICON_LOCALES();

// ../shared/lib/client/composables/locales.js
init_define_ARTICLE_INFO_LOCALES();
init_define_BACK_TO_TOP_LOCALES();
init_define_CODE_COPY_LOCALES();
init_define_CODE_COPY_OPIONS();
init_define_CODE_DEMO_OPTIONS();
init_define_COMMENT_OPTIONS();
init_define_MERMAID_OPTIONS();
init_define_PAGINATION_LOCALES();
init_define_PHOTO_SWIPE_LOCALES();
init_define_PHOTO_SWIPE_OPTIONS();
init_define_PWA_LOCALES();
init_define_READING_TIME_LOCALES();
init_define_REVEAL_CONFIG();
init_define_WALINE_LOCALES();
init_define_EXTERNAL_LINK_ICON_LOCALES();
import { useRouteLocale } from "@vuepress/client";
var useLocaleConfig = (localesConfig) => {
  const routeLocale = useRouteLocale();
  return computed(() => localesConfig[routeLocale.value]);
};

// ../shared/lib/client/composables/page.js
init_define_ARTICLE_INFO_LOCALES();
init_define_BACK_TO_TOP_LOCALES();
init_define_CODE_COPY_LOCALES();
init_define_CODE_COPY_OPIONS();
init_define_CODE_DEMO_OPTIONS();
init_define_COMMENT_OPTIONS();
init_define_MERMAID_OPTIONS();
init_define_PAGINATION_LOCALES();
init_define_PHOTO_SWIPE_LOCALES();
init_define_PHOTO_SWIPE_OPTIONS();
init_define_PWA_LOCALES();
init_define_READING_TIME_LOCALES();
init_define_REVEAL_CONFIG();
init_define_WALINE_LOCALES();
init_define_EXTERNAL_LINK_ICON_LOCALES();
import { usePageData } from "@vuepress/client";
var usePageTitle = () => computed(() => usePageData().value.title);

// ../shared/lib/client/utils/index.js
init_define_ARTICLE_INFO_LOCALES();
init_define_BACK_TO_TOP_LOCALES();
init_define_CODE_COPY_LOCALES();
init_define_CODE_COPY_OPIONS();
init_define_CODE_DEMO_OPTIONS();
init_define_COMMENT_OPTIONS();
init_define_MERMAID_OPTIONS();
init_define_PAGINATION_LOCALES();
init_define_PHOTO_SWIPE_LOCALES();
init_define_PHOTO_SWIPE_OPTIONS();
init_define_PWA_LOCALES();
init_define_READING_TIME_LOCALES();
init_define_REVEAL_CONFIG();
init_define_WALINE_LOCALES();
init_define_EXTERNAL_LINK_ICON_LOCALES();

// ../shared/lib/client/utils/click-outside.js
init_define_ARTICLE_INFO_LOCALES();
init_define_BACK_TO_TOP_LOCALES();
init_define_CODE_COPY_LOCALES();
init_define_CODE_COPY_OPIONS();
init_define_CODE_DEMO_OPTIONS();
init_define_COMMENT_OPTIONS();
init_define_MERMAID_OPTIONS();
init_define_PAGINATION_LOCALES();
init_define_PHOTO_SWIPE_LOCALES();
init_define_PHOTO_SWIPE_OPTIONS();
init_define_PWA_LOCALES();
init_define_READING_TIME_LOCALES();
init_define_REVEAL_CONFIG();
init_define_WALINE_LOCALES();
init_define_EXTERNAL_LINK_ICON_LOCALES();
var nodeList = /* @__PURE__ */ new Map();
var startClick;
if (true) {
  document.addEventListener("mousedown", (event) => {
    startClick = event;
  });
  document.addEventListener("mouseup", (event) => {
    for (const handlers of nodeList.values()) {
      for (const { documentHandler } of handlers) {
        documentHandler(event, startClick);
      }
    }
  });
}
var createDocumentHandler = (el, binding) => {
  let excludes = [];
  if (Array.isArray(binding.arg)) {
    excludes = binding.arg;
  } else if (binding.arg instanceof HTMLElement) {
    excludes.push(binding.arg);
  }
  return (mouseup, mousedown) => {
    const popperRef = binding.instance.popperRef;
    const mouseUpTarget = mouseup.target;
    const mouseDownTarget = mousedown == null ? void 0 : mousedown.target;
    const isBound = !binding || !binding.instance;
    const isTargetExists = !mouseUpTarget || !mouseDownTarget;
    const isContainedByEl = el.contains(mouseUpTarget) || el.contains(mouseDownTarget);
    const isSelf = el === mouseUpTarget;
    const isTargetExcluded = excludes.length && excludes.some((item) => item == null ? void 0 : item.contains(mouseUpTarget)) || excludes.length && excludes.includes(mouseDownTarget);
    const isContainedByPopper = popperRef && (popperRef.contains(mouseUpTarget) || popperRef.contains(mouseDownTarget));
    if (isBound || isTargetExists || isContainedByEl || isSelf || isTargetExcluded || isContainedByPopper) {
      return;
    }
    binding.value(mouseup, mousedown);
  };
};
var clickOutSideDirective = {
  beforeMount(el, binding) {
    if (!nodeList.has(el)) {
      nodeList.set(el, []);
    }
    nodeList.get(el).push({
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value
    });
  },
  updated(el, binding) {
    if (!nodeList.has(el)) {
      nodeList.set(el, []);
    }
    const handlers = nodeList.get(el);
    const oldHandlerIndex = handlers.findIndex((item) => item.bindingFn === binding.oldValue);
    const newHandler = {
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value
    };
    if (oldHandlerIndex >= 0) {
      handlers.splice(oldHandlerIndex, 1, newHandler);
    } else {
      handlers.push(newHandler);
    }
  },
  unmounted(el) {
    nodeList.delete(el);
  }
};

// ../shared/lib/client/utils/path.js
init_define_ARTICLE_INFO_LOCALES();
init_define_BACK_TO_TOP_LOCALES();
init_define_CODE_COPY_LOCALES();
init_define_CODE_COPY_OPIONS();
init_define_CODE_DEMO_OPTIONS();
init_define_COMMENT_OPTIONS();
init_define_MERMAID_OPTIONS();
init_define_PAGINATION_LOCALES();
init_define_PHOTO_SWIPE_LOCALES();
init_define_PHOTO_SWIPE_OPTIONS();
init_define_PWA_LOCALES();
init_define_READING_TIME_LOCALES();
init_define_REVEAL_CONFIG();
init_define_WALINE_LOCALES();
init_define_EXTERNAL_LINK_ICON_LOCALES();
var HASH_REGEXP = /#.*$/u;
var getHash = (path) => {
  const match = HASH_REGEXP.exec(path);
  if (match)
    return match[0];
  return "";
};
var normalizePath = (path) => decodeURI(path).replace(HASH_REGEXP, "").replace(/(index)?\.(md|html)$/, "");
var isActiveLink = (route, link) => {
  if (link === void 0)
    return false;
  const currentPath = normalizePath(route.path);
  const targetPath = normalizePath(link);
  const linkHash = getHash(link);
  if (linkHash)
    return linkHash === route.hash && (!targetPath || currentPath === targetPath);
  return currentPath === targetPath;
};

// ../shared/lib/client/utils/message.js
init_define_ARTICLE_INFO_LOCALES();
init_define_BACK_TO_TOP_LOCALES();
init_define_CODE_COPY_LOCALES();
init_define_CODE_COPY_OPIONS();
init_define_CODE_DEMO_OPTIONS();
init_define_COMMENT_OPTIONS();
init_define_MERMAID_OPTIONS();
init_define_PAGINATION_LOCALES();
init_define_PHOTO_SWIPE_LOCALES();
init_define_PHOTO_SWIPE_OPTIONS();
init_define_PWA_LOCALES();
init_define_READING_TIME_LOCALES();
init_define_REVEAL_CONFIG();
init_define_WALINE_LOCALES();
init_define_EXTERNAL_LINK_ICON_LOCALES();
import "C:/projects/vuepress-theme-hope/packages/shared/lib/client/styles/message.scss";
var Message = class {
  constructor() {
    const containerId = "message-container";
    const containerElement = document.getElementById(containerId);
    if (containerElement)
      this.containerElement = containerElement;
    else {
      this.containerElement = document.createElement("div");
      this.containerElement.id = containerId;
      document.body.appendChild(this.containerElement);
    }
  }
  pop(html, duration = 2e3) {
    const messageElement = document.createElement("div");
    messageElement.className = "message move-in";
    messageElement.innerHTML = html;
    this.containerElement.appendChild(messageElement);
    if (duration > 0)
      setTimeout(() => {
        this.close(messageElement);
      }, duration);
  }
  close(messageElement) {
    messageElement.className = messageElement.className.replace("move-in", "");
    messageElement.className += "move-out";
    messageElement.addEventListener("animationend", () => {
      messageElement.remove();
    });
  }
};

// ../shared/lib/client/utils/resolveRouteWithRedirect.js
init_define_ARTICLE_INFO_LOCALES();
init_define_BACK_TO_TOP_LOCALES();
init_define_CODE_COPY_LOCALES();
init_define_CODE_COPY_OPIONS();
init_define_CODE_DEMO_OPTIONS();
init_define_COMMENT_OPTIONS();
init_define_MERMAID_OPTIONS();
init_define_PAGINATION_LOCALES();
init_define_PHOTO_SWIPE_LOCALES();
init_define_PHOTO_SWIPE_OPTIONS();
init_define_PWA_LOCALES();
init_define_READING_TIME_LOCALES();
init_define_REVEAL_CONFIG();
init_define_WALINE_LOCALES();
init_define_EXTERNAL_LINK_ICON_LOCALES();
import { isFunction, isString } from "@vuepress/shared";
var resolveRouteWithRedirect = (router, ...args) => {
  const route = router.resolve(...args);
  const lastMatched = route.matched[route.matched.length - 1];
  if (!(lastMatched == null ? void 0 : lastMatched.redirect))
    return route;
  const { redirect } = lastMatched;
  const resolvedRedirect = isFunction(redirect) ? redirect(route) : redirect;
  const resolvedRedirectObj = isString(resolvedRedirect) ? { path: resolvedRedirect } : resolvedRedirect;
  return resolveRouteWithRedirect(router, __spreadValues({
    hash: route.hash,
    query: route.query,
    params: route.params
  }, resolvedRedirectObj));
};
var export_capitalize = import_shared2.capitalize;
var export_compareDate = import_shared2.compareDate;
var export_getAuthor = import_shared2.getAuthor;
var export_getCategory = import_shared2.getCategory;
var export_getDate = import_shared2.getDate;
var export_getTag = import_shared2.getTag;
var export_isAbsoluteUrl = import_shared2.isAbsoluteUrl;
var export_isUrl = import_shared2.isUrl;
var export_strictCapitalize = import_shared2.strictCapitalize;
var export_timeTransformer = import_shared2.timeTransformer;
export {
  IconBase,
  Message,
  export_capitalize as capitalize,
  clickOutSideDirective,
  export_compareDate as compareDate,
  export_getAuthor as getAuthor,
  export_getCategory as getCategory,
  export_getDate as getDate,
  getHash,
  export_getTag as getTag,
  export_isAbsoluteUrl as isAbsoluteUrl,
  isActiveLink,
  export_isUrl as isUrl,
  normalizePath,
  resolveRouteWithRedirect,
  export_strictCapitalize as strictCapitalize,
  export_timeTransformer as timeTransformer,
  useLocaleConfig,
  usePageTitle
};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
//# sourceMappingURL=@mr-hope_vuepress-shared_lib_client.js.map
