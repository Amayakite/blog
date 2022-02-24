import {
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

// dep:reveal_js_plugin_markdown_markdown_esm_js
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

// ../../node_modules/reveal.js/plugin/markdown/markdown.esm.js
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
function e(e2, t2) {
  var n2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var r2 = Object.getOwnPropertySymbols(e2);
    t2 && (r2 = r2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
    })), n2.push.apply(n2, r2);
  }
  return n2;
}
function t(e2, t2) {
  if (!(e2 instanceof t2))
    throw new TypeError("Cannot call a class as a function");
}
function n(e2, t2) {
  for (var n2 = 0; n2 < t2.length; n2++) {
    var r2 = t2[n2];
    r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(e2, r2.key, r2);
  }
}
function r(e2, t2, r2) {
  return t2 && n(e2.prototype, t2), r2 && n(e2, r2), e2;
}
function u(e2, t2, n2) {
  return t2 in e2 ? Object.defineProperty(e2, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e2[t2] = n2, e2;
}
function i(e2, t2) {
  if (e2 == null)
    return {};
  var n2, r2, u2 = function(e3, t3) {
    if (e3 == null)
      return {};
    var n3, r3, u3 = {}, i3 = Object.keys(e3);
    for (r3 = 0; r3 < i3.length; r3++)
      n3 = i3[r3], t3.indexOf(n3) >= 0 || (u3[n3] = e3[n3]);
    return u3;
  }(e2, t2);
  if (Object.getOwnPropertySymbols) {
    var i2 = Object.getOwnPropertySymbols(e2);
    for (r2 = 0; r2 < i2.length; r2++)
      n2 = i2[r2], t2.indexOf(n2) >= 0 || Object.prototype.propertyIsEnumerable.call(e2, n2) && (u2[n2] = e2[n2]);
  }
  return u2;
}
function o(e2, t2) {
  return function(e3) {
    if (Array.isArray(e3))
      return e3;
  }(e2) || function(e3, t3) {
    var n2 = e3 && (typeof Symbol != "undefined" && e3[Symbol.iterator] || e3["@@iterator"]);
    if (n2 == null)
      return;
    var r2, u2, i2 = [], o2 = true, a2 = false;
    try {
      for (n2 = n2.call(e3); !(o2 = (r2 = n2.next()).done) && (i2.push(r2.value), !t3 || i2.length !== t3); o2 = true)
        ;
    } catch (e4) {
      a2 = true, u2 = e4;
    } finally {
      try {
        o2 || n2.return == null || n2.return();
      } finally {
        if (a2)
          throw u2;
      }
    }
    return i2;
  }(e2, t2) || a(e2, t2) || function() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function a(e2, t2) {
  if (e2) {
    if (typeof e2 == "string")
      return l(e2, t2);
    var n2 = Object.prototype.toString.call(e2).slice(8, -1);
    return n2 === "Object" && e2.constructor && (n2 = e2.constructor.name), n2 === "Map" || n2 === "Set" ? Array.from(e2) : n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2) ? l(e2, t2) : void 0;
  }
}
function l(e2, t2) {
  (t2 == null || t2 > e2.length) && (t2 = e2.length);
  for (var n2 = 0, r2 = new Array(t2); n2 < t2; n2++)
    r2[n2] = e2[n2];
  return r2;
}
function s(e2, t2) {
  var n2 = typeof Symbol != "undefined" && e2[Symbol.iterator] || e2["@@iterator"];
  if (!n2) {
    if (Array.isArray(e2) || (n2 = a(e2)) || t2 && e2 && typeof e2.length == "number") {
      n2 && (e2 = n2);
      var r2 = 0, u2 = function() {
      };
      return { s: u2, n: function() {
        return r2 >= e2.length ? { done: true } : { done: false, value: e2[r2++] };
      }, e: function(e3) {
        throw e3;
      }, f: u2 };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var i2, o2 = true, l2 = false;
  return { s: function() {
    n2 = n2.call(e2);
  }, n: function() {
    var e3 = n2.next();
    return o2 = e3.done, e3;
  }, e: function(e3) {
    l2 = true, i2 = e3;
  }, f: function() {
    try {
      o2 || n2.return == null || n2.return();
    } finally {
      if (l2)
        throw i2;
    }
  } };
}
var c = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {};
var f = function(e2) {
  return e2 && e2.Math == Math && e2;
};
var p = f(typeof globalThis == "object" && globalThis) || f(typeof window == "object" && window) || f(typeof self == "object" && self) || f(typeof c == "object" && c) || function() {
  return this;
}() || Function("return this")();
var h = {};
var D = function(e2) {
  try {
    return !!e2();
  } catch (e3) {
    return true;
  }
};
var g = !D(function() {
  return Object.defineProperty({}, 1, { get: function() {
    return 7;
  } })[1] != 7;
});
var d = {};
var v = {}.propertyIsEnumerable;
var A = Object.getOwnPropertyDescriptor;
var y = A && !v.call({ 1: 2 }, 1);
d.f = y ? function(e2) {
  var t2 = A(this, e2);
  return !!t2 && t2.enumerable;
} : v;
var E = function(e2, t2) {
  return { enumerable: !(1 & e2), configurable: !(2 & e2), writable: !(4 & e2), value: t2 };
};
var m = {}.toString;
var k = function(e2) {
  return m.call(e2).slice(8, -1);
};
var F = k;
var b = "".split;
var C = D(function() {
  return !Object("z").propertyIsEnumerable(0);
}) ? function(e2) {
  return F(e2) == "String" ? b.call(e2, "") : Object(e2);
} : Object;
var x = function(e2) {
  if (e2 == null)
    throw TypeError("Can't call method on " + e2);
  return e2;
};
var w = C;
var B = x;
var S = function(e2) {
  return w(B(e2));
};
var _ = function(e2) {
  return typeof e2 == "object" ? e2 !== null : typeof e2 == "function";
};
var T = _;
var O = function(e2, t2) {
  if (!T(e2))
    return e2;
  var n2, r2;
  if (t2 && typeof (n2 = e2.toString) == "function" && !T(r2 = n2.call(e2)))
    return r2;
  if (typeof (n2 = e2.valueOf) == "function" && !T(r2 = n2.call(e2)))
    return r2;
  if (!t2 && typeof (n2 = e2.toString) == "function" && !T(r2 = n2.call(e2)))
    return r2;
  throw TypeError("Can't convert object to primitive value");
};
var R = x;
var j = function(e2) {
  return Object(R(e2));
};
var I = j;
var z = {}.hasOwnProperty;
var $ = function(e2, t2) {
  return z.call(I(e2), t2);
};
var P = _;
var L = p.document;
var M = P(L) && P(L.createElement);
var N = function(e2) {
  return M ? L.createElement(e2) : {};
};
var U = N;
var q = !g && !D(function() {
  return Object.defineProperty(U("div"), "a", { get: function() {
    return 7;
  } }).a != 7;
});
var Z = g;
var G = d;
var H = E;
var V = S;
var Y = O;
var K = $;
var X = q;
var W = Object.getOwnPropertyDescriptor;
h.f = Z ? W : function(e2, t2) {
  if (e2 = V(e2), t2 = Y(t2, true), X)
    try {
      return W(e2, t2);
    } catch (e3) {
    }
  if (K(e2, t2))
    return H(!G.f.call(e2, t2), e2[t2]);
};
var J = {};
var Q = _;
var ee = function(e2) {
  if (!Q(e2))
    throw TypeError(String(e2) + " is not an object");
  return e2;
};
var te = g;
var ne = q;
var re = ee;
var ue = O;
var ie = Object.defineProperty;
J.f = te ? ie : function(e2, t2, n2) {
  if (re(e2), t2 = ue(t2, true), re(n2), ne)
    try {
      return ie(e2, t2, n2);
    } catch (e3) {
    }
  if ("get" in n2 || "set" in n2)
    throw TypeError("Accessors not supported");
  return "value" in n2 && (e2[t2] = n2.value), e2;
};
var oe = J;
var ae = E;
var le = g ? function(e2, t2, n2) {
  return oe.f(e2, t2, ae(1, n2));
} : function(e2, t2, n2) {
  return e2[t2] = n2, e2;
};
var se = { exports: {} };
var ce = p;
var fe = le;
var pe = function(e2, t2) {
  try {
    fe(ce, e2, t2);
  } catch (n2) {
    ce[e2] = t2;
  }
  return t2;
};
var he = pe;
var De = p["__core-js_shared__"] || he("__core-js_shared__", {});
var ge = De;
var de = Function.toString;
typeof ge.inspectSource != "function" && (ge.inspectSource = function(e2) {
  return de.call(e2);
});
var ve = ge.inspectSource;
var Ae = ve;
var ye = p.WeakMap;
var Ee = typeof ye == "function" && /native code/.test(Ae(ye));
var me = { exports: {} };
var ke = De;
(me.exports = function(e2, t2) {
  return ke[e2] || (ke[e2] = t2 !== void 0 ? t2 : {});
})("versions", []).push({ version: "3.12.1", mode: "global", copyright: "\xA9 2021 Denis Pushkarev (zloirock.ru)" });
var Fe;
var be;
var Ce;
var xe = 0;
var we = Math.random();
var Be = function(e2) {
  return "Symbol(" + String(e2 === void 0 ? "" : e2) + ")_" + (++xe + we).toString(36);
};
var Se = me.exports;
var _e = Be;
var Te = Se("keys");
var Oe = function(e2) {
  return Te[e2] || (Te[e2] = _e(e2));
};
var Re = {};
var je = Ee;
var Ie = _;
var ze = le;
var $e = $;
var Pe = De;
var Le = Oe;
var Me = Re;
var Ne = p.WeakMap;
if (je || Pe.state) {
  Ue = Pe.state || (Pe.state = new Ne()), qe = Ue.get, Ze = Ue.has, Ge = Ue.set;
  Fe = function(e2, t2) {
    if (Ze.call(Ue, e2))
      throw new TypeError("Object already initialized");
    return t2.facade = e2, Ge.call(Ue, e2, t2), t2;
  }, be = function(e2) {
    return qe.call(Ue, e2) || {};
  }, Ce = function(e2) {
    return Ze.call(Ue, e2);
  };
} else {
  He = Le("state");
  Me[He] = true, Fe = function(e2, t2) {
    if ($e(e2, He))
      throw new TypeError("Object already initialized");
    return t2.facade = e2, ze(e2, He, t2), t2;
  }, be = function(e2) {
    return $e(e2, He) ? e2[He] : {};
  }, Ce = function(e2) {
    return $e(e2, He);
  };
}
var Ue;
var qe;
var Ze;
var Ge;
var He;
var Ve = { set: Fe, get: be, has: Ce, enforce: function(e2) {
  return Ce(e2) ? be(e2) : Fe(e2, {});
}, getterFor: function(e2) {
  return function(t2) {
    var n2;
    if (!Ie(t2) || (n2 = be(t2)).type !== e2)
      throw TypeError("Incompatible receiver, " + e2 + " required");
    return n2;
  };
} };
var Ye = p;
var Ke = le;
var Xe = $;
var We = pe;
var Je = ve;
var Qe = Ve.get;
var et = Ve.enforce;
var tt = String(String).split("String");
(se.exports = function(e2, t2, n2, r2) {
  var u2, i2 = !!r2 && !!r2.unsafe, o2 = !!r2 && !!r2.enumerable, a2 = !!r2 && !!r2.noTargetGet;
  typeof n2 == "function" && (typeof t2 != "string" || Xe(n2, "name") || Ke(n2, "name", t2), (u2 = et(n2)).source || (u2.source = tt.join(typeof t2 == "string" ? t2 : ""))), e2 !== Ye ? (i2 ? !a2 && e2[t2] && (o2 = true) : delete e2[t2], o2 ? e2[t2] = n2 : Ke(e2, t2, n2)) : o2 ? e2[t2] = n2 : We(t2, n2);
})(Function.prototype, "toString", function() {
  return typeof this == "function" && Qe(this).source || Je(this);
});
var nt = p;
var rt = p;
var ut = function(e2) {
  return typeof e2 == "function" ? e2 : void 0;
};
var it = function(e2, t2) {
  return arguments.length < 2 ? ut(nt[e2]) || ut(rt[e2]) : nt[e2] && nt[e2][t2] || rt[e2] && rt[e2][t2];
};
var ot = {};
var at = Math.ceil;
var lt = Math.floor;
var st = function(e2) {
  return isNaN(e2 = +e2) ? 0 : (e2 > 0 ? lt : at)(e2);
};
var ct = st;
var ft = Math.min;
var pt = function(e2) {
  return e2 > 0 ? ft(ct(e2), 9007199254740991) : 0;
};
var ht = st;
var Dt = Math.max;
var gt = Math.min;
var dt = function(e2, t2) {
  var n2 = ht(e2);
  return n2 < 0 ? Dt(n2 + t2, 0) : gt(n2, t2);
};
var vt = S;
var At = pt;
var yt = dt;
var Et = function(e2) {
  return function(t2, n2, r2) {
    var u2, i2 = vt(t2), o2 = At(i2.length), a2 = yt(r2, o2);
    if (e2 && n2 != n2) {
      for (; o2 > a2; )
        if ((u2 = i2[a2++]) != u2)
          return true;
    } else
      for (; o2 > a2; a2++)
        if ((e2 || a2 in i2) && i2[a2] === n2)
          return e2 || a2 || 0;
    return !e2 && -1;
  };
};
var mt = { includes: Et(true), indexOf: Et(false) };
var kt = $;
var Ft = S;
var bt = mt.indexOf;
var Ct = Re;
var xt = function(e2, t2) {
  var n2, r2 = Ft(e2), u2 = 0, i2 = [];
  for (n2 in r2)
    !kt(Ct, n2) && kt(r2, n2) && i2.push(n2);
  for (; t2.length > u2; )
    kt(r2, n2 = t2[u2++]) && (~bt(i2, n2) || i2.push(n2));
  return i2;
};
var wt = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
var Bt = xt;
var St = wt.concat("length", "prototype");
ot.f = Object.getOwnPropertyNames || function(e2) {
  return Bt(e2, St);
};
var _t = {};
_t.f = Object.getOwnPropertySymbols;
var Tt = ot;
var Ot = _t;
var Rt = ee;
var jt = it("Reflect", "ownKeys") || function(e2) {
  var t2 = Tt.f(Rt(e2)), n2 = Ot.f;
  return n2 ? t2.concat(n2(e2)) : t2;
};
var It = $;
var zt = jt;
var $t = h;
var Pt = J;
var Lt = D;
var Mt = /#|\.prototype\./;
var Nt = function(e2, t2) {
  var n2 = qt[Ut(e2)];
  return n2 == Gt || n2 != Zt && (typeof t2 == "function" ? Lt(t2) : !!t2);
};
var Ut = Nt.normalize = function(e2) {
  return String(e2).replace(Mt, ".").toLowerCase();
};
var qt = Nt.data = {};
var Zt = Nt.NATIVE = "N";
var Gt = Nt.POLYFILL = "P";
var Ht = Nt;
var Vt = p;
var Yt = h.f;
var Kt = le;
var Xt = se.exports;
var Wt = pe;
var Jt = function(e2, t2) {
  for (var n2 = zt(t2), r2 = Pt.f, u2 = $t.f, i2 = 0; i2 < n2.length; i2++) {
    var o2 = n2[i2];
    It(e2, o2) || r2(e2, o2, u2(t2, o2));
  }
};
var Qt = Ht;
var en = function(e2, t2) {
  var n2, r2, u2, i2, o2, a2 = e2.target, l2 = e2.global, s2 = e2.stat;
  if (n2 = l2 ? Vt : s2 ? Vt[a2] || Wt(a2, {}) : (Vt[a2] || {}).prototype)
    for (r2 in t2) {
      if (i2 = t2[r2], u2 = e2.noTargetGet ? (o2 = Yt(n2, r2)) && o2.value : n2[r2], !Qt(l2 ? r2 : a2 + (s2 ? "." : "#") + r2, e2.forced) && u2 !== void 0) {
        if (typeof i2 == typeof u2)
          continue;
        Jt(i2, u2);
      }
      (e2.sham || u2 && u2.sham) && Kt(i2, "sham", true), Xt(n2, r2, i2, e2);
    }
};
var tn = ee;
var nn = function() {
  var e2 = tn(this), t2 = "";
  return e2.global && (t2 += "g"), e2.ignoreCase && (t2 += "i"), e2.multiline && (t2 += "m"), e2.dotAll && (t2 += "s"), e2.unicode && (t2 += "u"), e2.sticky && (t2 += "y"), t2;
};
var rn = {};
var un = D;
function on(e2, t2) {
  return RegExp(e2, t2);
}
rn.UNSUPPORTED_Y = un(function() {
  var e2 = on("a", "y");
  return e2.lastIndex = 2, e2.exec("abcd") != null;
}), rn.BROKEN_CARET = un(function() {
  var e2 = on("^r", "gy");
  return e2.lastIndex = 2, e2.exec("str") != null;
});
var an = nn;
var ln = rn;
var sn = me.exports;
var cn = RegExp.prototype.exec;
var fn = sn("native-string-replace", String.prototype.replace);
var pn = cn;
var hn = function() {
  var e2 = /a/, t2 = /b*/g;
  return cn.call(e2, "a"), cn.call(t2, "a"), e2.lastIndex !== 0 || t2.lastIndex !== 0;
}();
var Dn = ln.UNSUPPORTED_Y || ln.BROKEN_CARET;
var gn = /()??/.exec("")[1] !== void 0;
(hn || gn || Dn) && (pn = function(e2) {
  var t2, n2, r2, u2, i2 = this, o2 = Dn && i2.sticky, a2 = an.call(i2), l2 = i2.source, s2 = 0, c2 = e2;
  return o2 && ((a2 = a2.replace("y", "")).indexOf("g") === -1 && (a2 += "g"), c2 = String(e2).slice(i2.lastIndex), i2.lastIndex > 0 && (!i2.multiline || i2.multiline && e2[i2.lastIndex - 1] !== "\n") && (l2 = "(?: " + l2 + ")", c2 = " " + c2, s2++), n2 = new RegExp("^(?:" + l2 + ")", a2)), gn && (n2 = new RegExp("^" + l2 + "$(?!\\s)", a2)), hn && (t2 = i2.lastIndex), r2 = cn.call(o2 ? n2 : i2, c2), o2 ? r2 ? (r2.input = r2.input.slice(s2), r2[0] = r2[0].slice(s2), r2.index = i2.lastIndex, i2.lastIndex += r2[0].length) : i2.lastIndex = 0 : hn && r2 && (i2.lastIndex = i2.global ? r2.index + r2[0].length : t2), gn && r2 && r2.length > 1 && fn.call(r2[0], n2, function() {
    for (u2 = 1; u2 < arguments.length - 2; u2++)
      arguments[u2] === void 0 && (r2[u2] = void 0);
  }), r2;
});
var dn = pn;
en({ target: "RegExp", proto: true, forced: /./.exec !== dn }, { exec: dn });
var vn;
var An;
var yn = it("navigator", "userAgent") || "";
var En = yn;
var mn = p.process;
var kn = mn && mn.versions;
var Fn = kn && kn.v8;
Fn ? An = (vn = Fn.split("."))[0] < 4 ? 1 : vn[0] + vn[1] : En && (!(vn = En.match(/Edge\/(\d+)/)) || vn[1] >= 74) && (vn = En.match(/Chrome\/(\d+)/)) && (An = vn[1]);
var bn = An && +An;
var Cn = bn;
var xn = D;
var wn = !!Object.getOwnPropertySymbols && !xn(function() {
  return !String(Symbol()) || !Symbol.sham && Cn && Cn < 41;
});
var Bn = wn && !Symbol.sham && typeof Symbol.iterator == "symbol";
var Sn = p;
var _n = me.exports;
var Tn = $;
var On = Be;
var Rn = wn;
var jn = Bn;
var In = _n("wks");
var zn = Sn.Symbol;
var $n = jn ? zn : zn && zn.withoutSetter || On;
var Pn = function(e2) {
  return Tn(In, e2) && (Rn || typeof In[e2] == "string") || (Rn && Tn(zn, e2) ? In[e2] = zn[e2] : In[e2] = $n("Symbol." + e2)), In[e2];
};
var Ln = se.exports;
var Mn = dn;
var Nn = D;
var Un = Pn;
var qn = le;
var Zn = Un("species");
var Gn = RegExp.prototype;
var Hn = !Nn(function() {
  var e2 = /./;
  return e2.exec = function() {
    var e3 = [];
    return e3.groups = { a: "7" }, e3;
  }, "".replace(e2, "$<a>") !== "7";
});
var Vn = "a".replace(/./, "$0") === "$0";
var Yn = Un("replace");
var Kn = !!/./[Yn] && /./[Yn]("a", "$0") === "";
var Xn = !Nn(function() {
  var e2 = /(?:)/, t2 = e2.exec;
  e2.exec = function() {
    return t2.apply(this, arguments);
  };
  var n2 = "ab".split(e2);
  return n2.length !== 2 || n2[0] !== "a" || n2[1] !== "b";
});
var Wn = function(e2, t2, n2, r2) {
  var u2 = Un(e2), i2 = !Nn(function() {
    var t3 = {};
    return t3[u2] = function() {
      return 7;
    }, ""[e2](t3) != 7;
  }), o2 = i2 && !Nn(function() {
    var t3 = false, n3 = /a/;
    return e2 === "split" && ((n3 = {}).constructor = {}, n3.constructor[Zn] = function() {
      return n3;
    }, n3.flags = "", n3[u2] = /./[u2]), n3.exec = function() {
      return t3 = true, null;
    }, n3[u2](""), !t3;
  });
  if (!i2 || !o2 || e2 === "replace" && (!Hn || !Vn || Kn) || e2 === "split" && !Xn) {
    var a2 = /./[u2], l2 = n2(u2, ""[e2], function(e3, t3, n3, r3, u3) {
      var o3 = t3.exec;
      return o3 === Mn || o3 === Gn.exec ? i2 && !u3 ? { done: true, value: a2.call(t3, n3, r3) } : { done: true, value: e3.call(n3, t3, r3) } : { done: false };
    }, { REPLACE_KEEPS_$0: Vn, REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: Kn }), s2 = l2[0], c2 = l2[1];
    Ln(String.prototype, e2, s2), Ln(Gn, u2, t2 == 2 ? function(e3, t3) {
      return c2.call(e3, this, t3);
    } : function(e3) {
      return c2.call(e3, this);
    });
  }
  r2 && qn(Gn[u2], "sham", true);
};
var Jn = st;
var Qn = x;
var er = function(e2) {
  return function(t2, n2) {
    var r2, u2, i2 = String(Qn(t2)), o2 = Jn(n2), a2 = i2.length;
    return o2 < 0 || o2 >= a2 ? e2 ? "" : void 0 : (r2 = i2.charCodeAt(o2)) < 55296 || r2 > 56319 || o2 + 1 === a2 || (u2 = i2.charCodeAt(o2 + 1)) < 56320 || u2 > 57343 ? e2 ? i2.charAt(o2) : r2 : e2 ? i2.slice(o2, o2 + 2) : u2 - 56320 + (r2 - 55296 << 10) + 65536;
  };
};
var tr = { codeAt: er(false), charAt: er(true) };
var nr = tr.charAt;
var rr = function(e2, t2, n2) {
  return t2 + (n2 ? nr(e2, t2).length : 1);
};
var ur = j;
var ir = Math.floor;
var or = "".replace;
var ar = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var lr = /\$([$&'`]|\d{1,2})/g;
var sr = k;
var cr = dn;
var fr = function(e2, t2) {
  var n2 = e2.exec;
  if (typeof n2 == "function") {
    var r2 = n2.call(e2, t2);
    if (typeof r2 != "object")
      throw TypeError("RegExp exec method returned something other than an Object or null");
    return r2;
  }
  if (sr(e2) !== "RegExp")
    throw TypeError("RegExp#exec called on incompatible receiver");
  return cr.call(e2, t2);
};
var pr = Wn;
var hr = ee;
var Dr = pt;
var gr = st;
var dr = x;
var vr = rr;
var Ar = function(e2, t2, n2, r2, u2, i2) {
  var o2 = n2 + e2.length, a2 = r2.length, l2 = lr;
  return u2 !== void 0 && (u2 = ur(u2), l2 = ar), or.call(i2, l2, function(i3, l3) {
    var s2;
    switch (l3.charAt(0)) {
      case "$":
        return "$";
      case "&":
        return e2;
      case "`":
        return t2.slice(0, n2);
      case "'":
        return t2.slice(o2);
      case "<":
        s2 = u2[l3.slice(1, -1)];
        break;
      default:
        var c2 = +l3;
        if (c2 === 0)
          return i3;
        if (c2 > a2) {
          var f2 = ir(c2 / 10);
          return f2 === 0 ? i3 : f2 <= a2 ? r2[f2 - 1] === void 0 ? l3.charAt(1) : r2[f2 - 1] + l3.charAt(1) : i3;
        }
        s2 = r2[c2 - 1];
    }
    return s2 === void 0 ? "" : s2;
  });
};
var yr = fr;
var Er = Math.max;
var mr = Math.min;
pr("replace", 2, function(e2, t2, n2, r2) {
  var u2 = r2.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE, i2 = r2.REPLACE_KEEPS_$0, o2 = u2 ? "$" : "$0";
  return [function(n3, r3) {
    var u3 = dr(this), i3 = n3 == null ? void 0 : n3[e2];
    return i3 !== void 0 ? i3.call(n3, u3, r3) : t2.call(String(u3), n3, r3);
  }, function(e3, r3) {
    if (!u2 && i2 || typeof r3 == "string" && r3.indexOf(o2) === -1) {
      var a2 = n2(t2, e3, this, r3);
      if (a2.done)
        return a2.value;
    }
    var l2 = hr(e3), s2 = String(this), c2 = typeof r3 == "function";
    c2 || (r3 = String(r3));
    var f2 = l2.global;
    if (f2) {
      var p2 = l2.unicode;
      l2.lastIndex = 0;
    }
    for (var h2 = []; ; ) {
      var D2 = yr(l2, s2);
      if (D2 === null)
        break;
      if (h2.push(D2), !f2)
        break;
      String(D2[0]) === "" && (l2.lastIndex = vr(s2, Dr(l2.lastIndex), p2));
    }
    for (var g2, d2 = "", v2 = 0, A2 = 0; A2 < h2.length; A2++) {
      D2 = h2[A2];
      for (var y2 = String(D2[0]), E2 = Er(mr(gr(D2.index), s2.length), 0), m2 = [], k2 = 1; k2 < D2.length; k2++)
        m2.push((g2 = D2[k2]) === void 0 ? g2 : String(g2));
      var F2 = D2.groups;
      if (c2) {
        var b2 = [y2].concat(m2, E2, s2);
        F2 !== void 0 && b2.push(F2);
        var C2 = String(r3.apply(void 0, b2));
      } else
        C2 = Ar(y2, s2, E2, m2, F2, r3);
      E2 >= v2 && (d2 += s2.slice(v2, E2) + C2, v2 = E2 + y2.length);
    }
    return d2 + s2.slice(v2);
  }];
});
var kr = _;
var Fr = ee;
var br = function(e2) {
  if (!kr(e2) && e2 !== null)
    throw TypeError("Can't set " + String(e2) + " as a prototype");
  return e2;
};
var Cr = Object.setPrototypeOf || ("__proto__" in {} ? function() {
  var e2, t2 = false, n2 = {};
  try {
    (e2 = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(n2, []), t2 = n2 instanceof Array;
  } catch (e3) {
  }
  return function(n3, r2) {
    return Fr(n3), br(r2), t2 ? e2.call(n3, r2) : n3.__proto__ = r2, n3;
  };
}() : void 0);
var xr = _;
var wr = Cr;
var Br = _;
var Sr = k;
var _r = Pn("match");
var Tr = function(e2) {
  var t2;
  return Br(e2) && ((t2 = e2[_r]) !== void 0 ? !!t2 : Sr(e2) == "RegExp");
};
var Or = it;
var Rr = J;
var jr = g;
var Ir = Pn("species");
var zr = function(e2) {
  var t2 = Or(e2), n2 = Rr.f;
  jr && t2 && !t2[Ir] && n2(t2, Ir, { configurable: true, get: function() {
    return this;
  } });
};
var $r = g;
var Pr = p;
var Lr = Ht;
var Mr = function(e2, t2, n2) {
  var r2, u2;
  return wr && typeof (r2 = t2.constructor) == "function" && r2 !== n2 && xr(u2 = r2.prototype) && u2 !== n2.prototype && wr(e2, u2), e2;
};
var Nr = J.f;
var Ur = ot.f;
var qr = Tr;
var Zr = nn;
var Gr = rn;
var Hr = se.exports;
var Vr = D;
var Yr = Ve.enforce;
var Kr = zr;
var Xr = Pn("match");
var Wr = Pr.RegExp;
var Jr = Wr.prototype;
var Qr = /a/g;
var eu = /a/g;
var tu = new Wr(Qr) !== Qr;
var nu = Gr.UNSUPPORTED_Y;
if ($r && Lr("RegExp", !tu || nu || Vr(function() {
  return eu[Xr] = false, Wr(Qr) != Qr || Wr(eu) == eu || Wr(Qr, "i") != "/a/i";
}))) {
  for (ru = function(e2, t2) {
    var n2, r2 = this instanceof ru, u2 = qr(e2), i2 = t2 === void 0;
    if (!r2 && u2 && e2.constructor === ru && i2)
      return e2;
    tu ? u2 && !i2 && (e2 = e2.source) : e2 instanceof ru && (i2 && (t2 = Zr.call(e2)), e2 = e2.source), nu && (n2 = !!t2 && t2.indexOf("y") > -1) && (t2 = t2.replace(/y/g, ""));
    var o2 = Mr(tu ? new Wr(e2, t2) : Wr(e2, t2), r2 ? this : Jr, ru);
    nu && n2 && (Yr(o2).sticky = true);
    return o2;
  }, uu = function(e2) {
    e2 in ru || Nr(ru, e2, { configurable: true, get: function() {
      return Wr[e2];
    }, set: function(t2) {
      Wr[e2] = t2;
    } });
  }, iu = Ur(Wr), ou = 0; iu.length > ou; )
    uu(iu[ou++]);
  Jr.constructor = ru, ru.prototype = Jr, Hr(Pr, "RegExp", ru);
}
var ru;
var uu;
var iu;
var ou;
Kr("RegExp");
var au = se.exports;
var lu = ee;
var su = D;
var cu = nn;
var fu = RegExp.prototype;
var pu = fu.toString;
var hu = su(function() {
  return pu.call({ source: "a", flags: "b" }) != "/a/b";
});
var Du = pu.name != "toString";
(hu || Du) && au(RegExp.prototype, "toString", function() {
  var e2 = lu(this), t2 = String(e2.source), n2 = e2.flags;
  return "/" + t2 + "/" + String(n2 === void 0 && e2 instanceof RegExp && !("flags" in fu) ? cu.call(e2) : n2);
}, { unsafe: true });
var gu = ee;
var du = pt;
var vu = x;
var Au = rr;
var yu = fr;
Wn("match", 1, function(e2, t2, n2) {
  return [function(t3) {
    var n3 = vu(this), r2 = t3 == null ? void 0 : t3[e2];
    return r2 !== void 0 ? r2.call(t3, n3) : new RegExp(t3)[e2](String(n3));
  }, function(e3) {
    var r2 = n2(t2, e3, this);
    if (r2.done)
      return r2.value;
    var u2 = gu(e3), i2 = String(this);
    if (!u2.global)
      return yu(u2, i2);
    var o2 = u2.unicode;
    u2.lastIndex = 0;
    for (var a2, l2 = [], s2 = 0; (a2 = yu(u2, i2)) !== null; ) {
      var c2 = String(a2[0]);
      l2[s2] = c2, c2 === "" && (u2.lastIndex = Au(i2, du(u2.lastIndex), o2)), s2++;
    }
    return s2 === 0 ? null : l2;
  }];
});
var Eu = g;
var mu = J.f;
var ku = Function.prototype;
var Fu = ku.toString;
var bu = /^\s*function ([^ (]*)/;
Eu && !("name" in ku) && mu(ku, "name", { configurable: true, get: function() {
  try {
    return Fu.call(this).match(bu)[1];
  } catch (e2) {
    return "";
  }
} });
var Cu = D;
var xu = function(e2, t2) {
  var n2 = [][e2];
  return !!n2 && Cu(function() {
    n2.call(null, t2 || function() {
      throw 1;
    }, 1);
  });
};
var wu = en;
var Bu = S;
var Su = [].join;
var _u = C != Object;
var Tu = xu("join", ",");
wu({ target: "Array", proto: true, forced: _u || !Tu }, { join: function(e2) {
  return Su.call(Bu(this), e2 === void 0 ? "," : e2);
} });
var Ou = function(e2) {
  if (typeof e2 != "function")
    throw TypeError(String(e2) + " is not a function");
  return e2;
};
var Ru = ee;
var ju = Ou;
var Iu = Pn("species");
var zu = function(e2, t2) {
  var n2, r2 = Ru(e2).constructor;
  return r2 === void 0 || (n2 = Ru(r2)[Iu]) == null ? t2 : ju(n2);
};
var $u = Wn;
var Pu = Tr;
var Lu = ee;
var Mu = x;
var Nu = zu;
var Uu = rr;
var qu = pt;
var Zu = fr;
var Gu = dn;
var Hu = rn.UNSUPPORTED_Y;
var Vu = [].push;
var Yu = Math.min;
$u("split", 2, function(e2, t2, n2) {
  var r2;
  return r2 = "abbc".split(/(b)*/)[1] == "c" || "test".split(/(?:)/, -1).length != 4 || "ab".split(/(?:ab)*/).length != 2 || ".".split(/(.?)(.?)/).length != 4 || ".".split(/()()/).length > 1 || "".split(/.?/).length ? function(e3, n3) {
    var r3 = String(Mu(this)), u2 = n3 === void 0 ? 4294967295 : n3 >>> 0;
    if (u2 === 0)
      return [];
    if (e3 === void 0)
      return [r3];
    if (!Pu(e3))
      return t2.call(r3, e3, u2);
    for (var i2, o2, a2, l2 = [], s2 = (e3.ignoreCase ? "i" : "") + (e3.multiline ? "m" : "") + (e3.unicode ? "u" : "") + (e3.sticky ? "y" : ""), c2 = 0, f2 = new RegExp(e3.source, s2 + "g"); (i2 = Gu.call(f2, r3)) && !((o2 = f2.lastIndex) > c2 && (l2.push(r3.slice(c2, i2.index)), i2.length > 1 && i2.index < r3.length && Vu.apply(l2, i2.slice(1)), a2 = i2[0].length, c2 = o2, l2.length >= u2)); )
      f2.lastIndex === i2.index && f2.lastIndex++;
    return c2 === r3.length ? !a2 && f2.test("") || l2.push("") : l2.push(r3.slice(c2)), l2.length > u2 ? l2.slice(0, u2) : l2;
  } : "0".split(void 0, 0).length ? function(e3, n3) {
    return e3 === void 0 && n3 === 0 ? [] : t2.call(this, e3, n3);
  } : t2, [function(t3, n3) {
    var u2 = Mu(this), i2 = t3 == null ? void 0 : t3[e2];
    return i2 !== void 0 ? i2.call(t3, u2, n3) : r2.call(String(u2), t3, n3);
  }, function(e3, u2) {
    var i2 = n2(r2, e3, this, u2, r2 !== t2);
    if (i2.done)
      return i2.value;
    var o2 = Lu(e3), a2 = String(this), l2 = Nu(o2, RegExp), s2 = o2.unicode, c2 = (o2.ignoreCase ? "i" : "") + (o2.multiline ? "m" : "") + (o2.unicode ? "u" : "") + (Hu ? "g" : "y"), f2 = new l2(Hu ? "^(?:" + o2.source + ")" : o2, c2), p2 = u2 === void 0 ? 4294967295 : u2 >>> 0;
    if (p2 === 0)
      return [];
    if (a2.length === 0)
      return Zu(f2, a2) === null ? [a2] : [];
    for (var h2 = 0, D2 = 0, g2 = []; D2 < a2.length; ) {
      f2.lastIndex = Hu ? 0 : D2;
      var d2, v2 = Zu(f2, Hu ? a2.slice(D2) : a2);
      if (v2 === null || (d2 = Yu(qu(f2.lastIndex + (Hu ? D2 : 0)), a2.length)) === h2)
        D2 = Uu(a2, D2, s2);
      else {
        if (g2.push(a2.slice(h2, D2)), g2.length === p2)
          return g2;
        for (var A2 = 1; A2 <= v2.length - 1; A2++)
          if (g2.push(v2[A2]), g2.length === p2)
            return g2;
        D2 = h2 = d2;
      }
    }
    return g2.push(a2.slice(h2)), g2;
  }];
}, Hu);
var Ku = x;
var Xu = "[	\n\v\f\r \xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]";
var Wu = RegExp("^" + Xu + Xu + "*");
var Ju = RegExp(Xu + Xu + "*$");
var Qu = function(e2) {
  return function(t2) {
    var n2 = String(Ku(t2));
    return 1 & e2 && (n2 = n2.replace(Wu, "")), 2 & e2 && (n2 = n2.replace(Ju, "")), n2;
  };
};
var ei = { start: Qu(1), end: Qu(2), trim: Qu(3) };
var ti = D;
var ni = "	\n\v\f\r \xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";
var ri = ei.trim;
en({ target: "String", proto: true, forced: function(e2) {
  return ti(function() {
    return !!ni[e2]() || "\u200B\x85\u180E"[e2]() != "\u200B\x85\u180E" || ni[e2].name !== e2;
  });
}("trim") }, { trim: function() {
  return ri(this);
} });
var ui = { CSSRuleList: 0, CSSStyleDeclaration: 0, CSSValueList: 0, ClientRectList: 0, DOMRectList: 0, DOMStringList: 0, DOMTokenList: 1, DataTransferItemList: 0, FileList: 0, HTMLAllCollection: 0, HTMLCollection: 0, HTMLFormElement: 0, HTMLSelectElement: 0, MediaList: 0, MimeTypeArray: 0, NamedNodeMap: 0, NodeList: 1, PaintRequestList: 0, Plugin: 0, PluginArray: 0, SVGLengthList: 0, SVGNumberList: 0, SVGPathSegList: 0, SVGPointList: 0, SVGStringList: 0, SVGTransformList: 0, SourceBufferList: 0, StyleSheetList: 0, TextTrackCueList: 0, TextTrackList: 0, TouchList: 0 };
var ii = Ou;
var oi = function(e2, t2, n2) {
  if (ii(e2), t2 === void 0)
    return e2;
  switch (n2) {
    case 0:
      return function() {
        return e2.call(t2);
      };
    case 1:
      return function(n3) {
        return e2.call(t2, n3);
      };
    case 2:
      return function(n3, r2) {
        return e2.call(t2, n3, r2);
      };
    case 3:
      return function(n3, r2, u2) {
        return e2.call(t2, n3, r2, u2);
      };
  }
  return function() {
    return e2.apply(t2, arguments);
  };
};
var ai = k;
var li = Array.isArray || function(e2) {
  return ai(e2) == "Array";
};
var si = _;
var ci = li;
var fi = Pn("species");
var pi = function(e2, t2) {
  var n2;
  return ci(e2) && (typeof (n2 = e2.constructor) != "function" || n2 !== Array && !ci(n2.prototype) ? si(n2) && (n2 = n2[fi]) === null && (n2 = void 0) : n2 = void 0), new (n2 === void 0 ? Array : n2)(t2 === 0 ? 0 : t2);
};
var hi = oi;
var Di = C;
var gi = j;
var di = pt;
var vi = pi;
var Ai = [].push;
var yi = function(e2) {
  var t2 = e2 == 1, n2 = e2 == 2, r2 = e2 == 3, u2 = e2 == 4, i2 = e2 == 6, o2 = e2 == 7, a2 = e2 == 5 || i2;
  return function(l2, s2, c2, f2) {
    for (var p2, h2, D2 = gi(l2), g2 = Di(D2), d2 = hi(s2, c2, 3), v2 = di(g2.length), A2 = 0, y2 = f2 || vi, E2 = t2 ? y2(l2, v2) : n2 || o2 ? y2(l2, 0) : void 0; v2 > A2; A2++)
      if ((a2 || A2 in g2) && (h2 = d2(p2 = g2[A2], A2, D2), e2))
        if (t2)
          E2[A2] = h2;
        else if (h2)
          switch (e2) {
            case 3:
              return true;
            case 5:
              return p2;
            case 6:
              return A2;
            case 2:
              Ai.call(E2, p2);
          }
        else
          switch (e2) {
            case 4:
              return false;
            case 7:
              Ai.call(E2, p2);
          }
    return i2 ? -1 : r2 || u2 ? u2 : E2;
  };
};
var Ei = { forEach: yi(0), map: yi(1), filter: yi(2), some: yi(3), every: yi(4), find: yi(5), findIndex: yi(6), filterOut: yi(7) };
var mi = Ei.forEach;
var ki = p;
var Fi = ui;
var bi = xu("forEach") ? [].forEach : function(e2) {
  return mi(this, e2, arguments.length > 1 ? arguments[1] : void 0);
};
var Ci = le;
for (xi in Fi) {
  wi = ki[xi], Bi = wi && wi.prototype;
  if (Bi && Bi.forEach !== bi)
    try {
      Ci(Bi, "forEach", bi);
    } catch (e2) {
      Bi.forEach = bi;
    }
}
var wi;
var Bi;
var xi;
var Si = {};
Si[Pn("toStringTag")] = "z";
var _i = String(Si) === "[object z]";
var Ti = _i;
var Oi = k;
var Ri = Pn("toStringTag");
var ji = Oi(function() {
  return arguments;
}()) == "Arguments";
var Ii = Ti ? Oi : function(e2) {
  var t2, n2, r2;
  return e2 === void 0 ? "Undefined" : e2 === null ? "Null" : typeof (n2 = function(e3, t3) {
    try {
      return e3[t3];
    } catch (e4) {
    }
  }(t2 = Object(e2), Ri)) == "string" ? n2 : ji ? Oi(t2) : (r2 = Oi(t2)) == "Object" && typeof t2.callee == "function" ? "Arguments" : r2;
};
var zi = Ii;
var $i = _i ? {}.toString : function() {
  return "[object " + zi(this) + "]";
};
var Pi = _i;
var Li = se.exports;
var Mi = $i;
Pi || Li(Object.prototype, "toString", Mi, { unsafe: true });
var Ni = p.Promise;
var Ui = se.exports;
var qi = J.f;
var Zi = $;
var Gi = Pn("toStringTag");
var Hi = function(e2, t2, n2) {
  e2 && !Zi(e2 = n2 ? e2 : e2.prototype, Gi) && qi(e2, Gi, { configurable: true, value: t2 });
};
var Vi = {};
var Yi = Vi;
var Ki = Pn("iterator");
var Xi = Array.prototype;
var Wi = Ii;
var Ji = Vi;
var Qi = Pn("iterator");
var eo = ee;
var to = ee;
var no = function(e2) {
  return e2 !== void 0 && (Yi.Array === e2 || Xi[Ki] === e2);
};
var ro = pt;
var uo = oi;
var io = function(e2) {
  if (e2 != null)
    return e2[Qi] || e2["@@iterator"] || Ji[Wi(e2)];
};
var oo = function(e2) {
  var t2 = e2.return;
  if (t2 !== void 0)
    return eo(t2.call(e2)).value;
};
var ao = function(e2, t2) {
  this.stopped = e2, this.result = t2;
};
var lo = Pn("iterator");
var so = false;
try {
  co = 0, fo = { next: function() {
    return { done: !!co++ };
  }, return: function() {
    so = true;
  } };
  fo[lo] = function() {
    return this;
  }, Array.from(fo, function() {
    throw 2;
  });
} catch (e2) {
}
var co;
var fo;
var po;
var ho;
var Do;
var go = it("document", "documentElement");
var vo = /(?:iphone|ipod|ipad).*applewebkit/i.test(yn);
var Ao = k(p.process) == "process";
var yo = p;
var Eo = D;
var mo = oi;
var ko = go;
var Fo = N;
var bo = vo;
var Co = Ao;
var xo = yo.location;
var wo = yo.setImmediate;
var Bo = yo.clearImmediate;
var So = yo.process;
var _o = yo.MessageChannel;
var To = yo.Dispatch;
var Oo = 0;
var Ro = {};
var jo = function(e2) {
  if (Ro.hasOwnProperty(e2)) {
    var t2 = Ro[e2];
    delete Ro[e2], t2();
  }
};
var Io = function(e2) {
  return function() {
    jo(e2);
  };
};
var zo = function(e2) {
  jo(e2.data);
};
var $o = function(e2) {
  yo.postMessage(e2 + "", xo.protocol + "//" + xo.host);
};
wo && Bo || (wo = function(e2) {
  for (var t2 = [], n2 = 1; arguments.length > n2; )
    t2.push(arguments[n2++]);
  return Ro[++Oo] = function() {
    (typeof e2 == "function" ? e2 : Function(e2)).apply(void 0, t2);
  }, po(Oo), Oo;
}, Bo = function(e2) {
  delete Ro[e2];
}, Co ? po = function(e2) {
  So.nextTick(Io(e2));
} : To && To.now ? po = function(e2) {
  To.now(Io(e2));
} : _o && !bo ? (Do = (ho = new _o()).port2, ho.port1.onmessage = zo, po = mo(Do.postMessage, Do, 1)) : yo.addEventListener && typeof postMessage == "function" && !yo.importScripts && xo && xo.protocol !== "file:" && !Eo($o) ? (po = $o, yo.addEventListener("message", zo, false)) : po = "onreadystatechange" in Fo("script") ? function(e2) {
  ko.appendChild(Fo("script")).onreadystatechange = function() {
    ko.removeChild(this), jo(e2);
  };
} : function(e2) {
  setTimeout(Io(e2), 0);
});
var Po;
var Lo;
var Mo;
var No;
var Uo;
var qo;
var Zo;
var Go;
var Ho = { set: wo, clear: Bo };
var Vo = /web0s(?!.*chrome)/i.test(yn);
var Yo = p;
var Ko = h.f;
var Xo = Ho.set;
var Wo = vo;
var Jo = Vo;
var Qo = Ao;
var ea = Yo.MutationObserver || Yo.WebKitMutationObserver;
var ta = Yo.document;
var na = Yo.process;
var ra = Yo.Promise;
var ua = Ko(Yo, "queueMicrotask");
var ia = ua && ua.value;
ia || (Po = function() {
  var e2, t2;
  for (Qo && (e2 = na.domain) && e2.exit(); Lo; ) {
    t2 = Lo.fn, Lo = Lo.next;
    try {
      t2();
    } catch (e3) {
      throw Lo ? No() : Mo = void 0, e3;
    }
  }
  Mo = void 0, e2 && e2.enter();
}, Wo || Qo || Jo || !ea || !ta ? ra && ra.resolve ? ((Zo = ra.resolve(void 0)).constructor = ra, Go = Zo.then, No = function() {
  Go.call(Zo, Po);
}) : No = Qo ? function() {
  na.nextTick(Po);
} : function() {
  Xo.call(Yo, Po);
} : (Uo = true, qo = ta.createTextNode(""), new ea(Po).observe(qo, { characterData: true }), No = function() {
  qo.data = Uo = !Uo;
}));
var oa = ia || function(e2) {
  var t2 = { fn: e2, next: void 0 };
  Mo && (Mo.next = t2), Lo || (Lo = t2, No()), Mo = t2;
};
var aa = {};
var la = Ou;
var sa = function(e2) {
  var t2, n2;
  this.promise = new e2(function(e3, r2) {
    if (t2 !== void 0 || n2 !== void 0)
      throw TypeError("Bad Promise constructor");
    t2 = e3, n2 = r2;
  }), this.resolve = la(t2), this.reject = la(n2);
};
aa.f = function(e2) {
  return new sa(e2);
};
var ca;
var fa;
var pa;
var ha;
var Da = ee;
var ga = _;
var da = aa;
var va = p;
var Aa = typeof window == "object";
var ya = en;
var Ea = p;
var ma = it;
var ka = Ni;
var Fa = se.exports;
var ba = function(e2, t2, n2) {
  for (var r2 in t2)
    Ui(e2, r2, t2[r2], n2);
  return e2;
};
var Ca = Cr;
var xa = Hi;
var wa = zr;
var Ba = _;
var Sa = Ou;
var _a = function(e2, t2, n2) {
  if (!(e2 instanceof t2))
    throw TypeError("Incorrect " + (n2 ? n2 + " " : "") + "invocation");
  return e2;
};
var Ta = ve;
var Oa = function(e2, t2, n2) {
  var r2, u2, i2, o2, a2, l2, s2, c2 = n2 && n2.that, f2 = !(!n2 || !n2.AS_ENTRIES), p2 = !(!n2 || !n2.IS_ITERATOR), h2 = !(!n2 || !n2.INTERRUPTED), D2 = uo(t2, c2, 1 + f2 + h2), g2 = function(e3) {
    return r2 && oo(r2), new ao(true, e3);
  }, d2 = function(e3) {
    return f2 ? (to(e3), h2 ? D2(e3[0], e3[1], g2) : D2(e3[0], e3[1])) : h2 ? D2(e3, g2) : D2(e3);
  };
  if (p2)
    r2 = e2;
  else {
    if (typeof (u2 = io(e2)) != "function")
      throw TypeError("Target is not iterable");
    if (no(u2)) {
      for (i2 = 0, o2 = ro(e2.length); o2 > i2; i2++)
        if ((a2 = d2(e2[i2])) && a2 instanceof ao)
          return a2;
      return new ao(false);
    }
    r2 = u2.call(e2);
  }
  for (l2 = r2.next; !(s2 = l2.call(r2)).done; ) {
    try {
      a2 = d2(s2.value);
    } catch (e3) {
      throw oo(r2), e3;
    }
    if (typeof a2 == "object" && a2 && a2 instanceof ao)
      return a2;
  }
  return new ao(false);
};
var Ra = function(e2, t2) {
  if (!t2 && !so)
    return false;
  var n2 = false;
  try {
    var r2 = {};
    r2[lo] = function() {
      return { next: function() {
        return { done: n2 = true };
      } };
    }, e2(r2);
  } catch (e3) {
  }
  return n2;
};
var ja = zu;
var Ia = Ho.set;
var za = oa;
var $a = function(e2, t2) {
  if (Da(e2), ga(t2) && t2.constructor === e2)
    return t2;
  var n2 = da.f(e2);
  return (0, n2.resolve)(t2), n2.promise;
};
var Pa = function(e2, t2) {
  var n2 = va.console;
  n2 && n2.error && (arguments.length === 1 ? n2.error(e2) : n2.error(e2, t2));
};
var La = aa;
var Ma = function(e2) {
  try {
    return { error: false, value: e2() };
  } catch (e3) {
    return { error: true, value: e3 };
  }
};
var Na = Ve;
var Ua = Ht;
var qa = Aa;
var Za = Ao;
var Ga = bn;
var Ha = Pn("species");
var Va = "Promise";
var Ya = Na.get;
var Ka = Na.set;
var Xa = Na.getterFor(Va);
var Wa = ka && ka.prototype;
var Ja = ka;
var Qa = Wa;
var el = Ea.TypeError;
var tl = Ea.document;
var nl = Ea.process;
var rl = La.f;
var ul = rl;
var il = !!(tl && tl.createEvent && Ea.dispatchEvent);
var ol = typeof PromiseRejectionEvent == "function";
var al = false;
var ll = Ua(Va, function() {
  var e2 = Ta(Ja) !== String(Ja);
  if (!e2 && Ga === 66)
    return true;
  if (Ga >= 51 && /native code/.test(Ja))
    return false;
  var t2 = new Ja(function(e3) {
    e3(1);
  }), n2 = function(e3) {
    e3(function() {
    }, function() {
    });
  };
  return (t2.constructor = {})[Ha] = n2, !(al = t2.then(function() {
  }) instanceof n2) || !e2 && qa && !ol;
});
var sl = ll || !Ra(function(e2) {
  Ja.all(e2).catch(function() {
  });
});
var cl = function(e2) {
  var t2;
  return !(!Ba(e2) || typeof (t2 = e2.then) != "function") && t2;
};
var fl = function(e2, t2) {
  if (!e2.notified) {
    e2.notified = true;
    var n2 = e2.reactions;
    za(function() {
      for (var r2 = e2.value, u2 = e2.state == 1, i2 = 0; n2.length > i2; ) {
        var o2, a2, l2, s2 = n2[i2++], c2 = u2 ? s2.ok : s2.fail, f2 = s2.resolve, p2 = s2.reject, h2 = s2.domain;
        try {
          c2 ? (u2 || (e2.rejection === 2 && gl(e2), e2.rejection = 1), c2 === true ? o2 = r2 : (h2 && h2.enter(), o2 = c2(r2), h2 && (h2.exit(), l2 = true)), o2 === s2.promise ? p2(el("Promise-chain cycle")) : (a2 = cl(o2)) ? a2.call(o2, f2, p2) : f2(o2)) : p2(r2);
        } catch (e3) {
          h2 && !l2 && h2.exit(), p2(e3);
        }
      }
      e2.reactions = [], e2.notified = false, t2 && !e2.rejection && hl(e2);
    });
  }
};
var pl = function(e2, t2, n2) {
  var r2, u2;
  il ? ((r2 = tl.createEvent("Event")).promise = t2, r2.reason = n2, r2.initEvent(e2, false, true), Ea.dispatchEvent(r2)) : r2 = { promise: t2, reason: n2 }, !ol && (u2 = Ea["on" + e2]) ? u2(r2) : e2 === "unhandledrejection" && Pa("Unhandled promise rejection", n2);
};
var hl = function(e2) {
  Ia.call(Ea, function() {
    var t2, n2 = e2.facade, r2 = e2.value;
    if (Dl(e2) && (t2 = Ma(function() {
      Za ? nl.emit("unhandledRejection", r2, n2) : pl("unhandledrejection", n2, r2);
    }), e2.rejection = Za || Dl(e2) ? 2 : 1, t2.error))
      throw t2.value;
  });
};
var Dl = function(e2) {
  return e2.rejection !== 1 && !e2.parent;
};
var gl = function(e2) {
  Ia.call(Ea, function() {
    var t2 = e2.facade;
    Za ? nl.emit("rejectionHandled", t2) : pl("rejectionhandled", t2, e2.value);
  });
};
var dl = function(e2, t2, n2) {
  return function(r2) {
    e2(t2, r2, n2);
  };
};
var vl = function(e2, t2, n2) {
  e2.done || (e2.done = true, n2 && (e2 = n2), e2.value = t2, e2.state = 2, fl(e2, true));
};
var Al = function(e2, t2, n2) {
  if (!e2.done) {
    e2.done = true, n2 && (e2 = n2);
    try {
      if (e2.facade === t2)
        throw el("Promise can't be resolved itself");
      var r2 = cl(t2);
      r2 ? za(function() {
        var n3 = { done: false };
        try {
          r2.call(t2, dl(Al, n3, e2), dl(vl, n3, e2));
        } catch (t3) {
          vl(n3, t3, e2);
        }
      }) : (e2.value = t2, e2.state = 1, fl(e2, false));
    } catch (t3) {
      vl({ done: false }, t3, e2);
    }
  }
};
if (ll && (Qa = (Ja = function(e2) {
  _a(this, Ja, Va), Sa(e2), ca.call(this);
  var t2 = Ya(this);
  try {
    e2(dl(Al, t2), dl(vl, t2));
  } catch (e3) {
    vl(t2, e3);
  }
}).prototype, (ca = function(e2) {
  Ka(this, { type: Va, done: false, notified: false, parent: false, reactions: [], rejection: false, state: 0, value: void 0 });
}).prototype = ba(Qa, { then: function(e2, t2) {
  var n2 = Xa(this), r2 = rl(ja(this, Ja));
  return r2.ok = typeof e2 != "function" || e2, r2.fail = typeof t2 == "function" && t2, r2.domain = Za ? nl.domain : void 0, n2.parent = true, n2.reactions.push(r2), n2.state != 0 && fl(n2, false), r2.promise;
}, catch: function(e2) {
  return this.then(void 0, e2);
} }), fa = function() {
  var e2 = new ca(), t2 = Ya(e2);
  this.promise = e2, this.resolve = dl(Al, t2), this.reject = dl(vl, t2);
}, La.f = rl = function(e2) {
  return e2 === Ja || e2 === pa ? new fa(e2) : ul(e2);
}, typeof ka == "function" && Wa !== Object.prototype)) {
  ha = Wa.then, al || (Fa(Wa, "then", function(e2, t2) {
    var n2 = this;
    return new Ja(function(e3, t3) {
      ha.call(n2, e3, t3);
    }).then(e2, t2);
  }, { unsafe: true }), Fa(Wa, "catch", Qa.catch, { unsafe: true }));
  try {
    delete Wa.constructor;
  } catch (e2) {
  }
  Ca && Ca(Wa, Qa);
}
ya({ global: true, wrap: true, forced: ll }, { Promise: Ja }), xa(Ja, Va, false), wa(Va), pa = ma(Va), ya({ target: Va, stat: true, forced: ll }, { reject: function(e2) {
  var t2 = rl(this);
  return t2.reject.call(void 0, e2), t2.promise;
} }), ya({ target: Va, stat: true, forced: ll }, { resolve: function(e2) {
  return $a(this, e2);
} }), ya({ target: Va, stat: true, forced: sl }, { all: function(e2) {
  var t2 = this, n2 = rl(t2), r2 = n2.resolve, u2 = n2.reject, i2 = Ma(function() {
    var n3 = Sa(t2.resolve), i3 = [], o2 = 0, a2 = 1;
    Oa(e2, function(e3) {
      var l2 = o2++, s2 = false;
      i3.push(void 0), a2++, n3.call(t2, e3).then(function(e4) {
        s2 || (s2 = true, i3[l2] = e4, --a2 || r2(i3));
      }, u2);
    }), --a2 || r2(i3);
  });
  return i2.error && u2(i2.value), n2.promise;
}, race: function(e2) {
  var t2 = this, n2 = rl(t2), r2 = n2.reject, u2 = Ma(function() {
    var u3 = Sa(t2.resolve);
    Oa(e2, function(e3) {
      u3.call(t2, e3).then(n2.resolve, r2);
    });
  });
  return u2.error && r2(u2.value), n2.promise;
} });
var yl = O;
var El = J;
var ml = E;
var kl = function(e2, t2, n2) {
  var r2 = yl(t2);
  r2 in e2 ? El.f(e2, r2, ml(0, n2)) : e2[r2] = n2;
};
var Fl = D;
var bl = bn;
var Cl = Pn("species");
var xl = function(e2) {
  return bl >= 51 || !Fl(function() {
    var t2 = [];
    return (t2.constructor = {})[Cl] = function() {
      return { foo: 1 };
    }, t2[e2](Boolean).foo !== 1;
  });
};
var wl = en;
var Bl = _;
var Sl = li;
var _l = dt;
var Tl = pt;
var Ol = S;
var Rl = kl;
var jl = Pn;
var Il = xl("slice");
var zl = jl("species");
var $l = [].slice;
var Pl = Math.max;
wl({ target: "Array", proto: true, forced: !Il }, { slice: function(e2, t2) {
  var n2, r2, u2, i2 = Ol(this), o2 = Tl(i2.length), a2 = _l(e2, o2), l2 = _l(t2 === void 0 ? o2 : t2, o2);
  if (Sl(i2) && (typeof (n2 = i2.constructor) != "function" || n2 !== Array && !Sl(n2.prototype) ? Bl(n2) && (n2 = n2[zl]) === null && (n2 = void 0) : n2 = void 0, n2 === Array || n2 === void 0))
    return $l.call(i2, a2, l2);
  for (r2 = new (n2 === void 0 ? Array : n2)(Pl(l2 - a2, 0)), u2 = 0; a2 < l2; a2++, u2++)
    a2 in i2 && Rl(r2, u2, i2[a2]);
  return r2.length = u2, r2;
} });
var Ll;
var Ml = xt;
var Nl = wt;
var Ul = Object.keys || function(e2) {
  return Ml(e2, Nl);
};
var ql = J;
var Zl = ee;
var Gl = Ul;
var Hl = g ? Object.defineProperties : function(e2, t2) {
  Zl(e2);
  for (var n2, r2 = Gl(t2), u2 = r2.length, i2 = 0; u2 > i2; )
    ql.f(e2, n2 = r2[i2++], t2[n2]);
  return e2;
};
var Vl = ee;
var Yl = Hl;
var Kl = wt;
var Xl = Re;
var Wl = go;
var Jl = N;
var Ql = Oe("IE_PROTO");
var es = function() {
};
var ts = function(e2) {
  return "<script>" + e2 + "<\/script>";
};
var ns = function() {
  try {
    Ll = document.domain && new ActiveXObject("htmlfile");
  } catch (e3) {
  }
  var e2, t2;
  ns = Ll ? function(e3) {
    e3.write(ts("")), e3.close();
    var t3 = e3.parentWindow.Object;
    return e3 = null, t3;
  }(Ll) : ((t2 = Jl("iframe")).style.display = "none", Wl.appendChild(t2), t2.src = String("javascript:"), (e2 = t2.contentWindow.document).open(), e2.write(ts("document.F=Object")), e2.close(), e2.F);
  for (var n2 = Kl.length; n2--; )
    delete ns.prototype[Kl[n2]];
  return ns();
};
Xl[Ql] = true;
var rs = Object.create || function(e2, t2) {
  var n2;
  return e2 !== null ? (es.prototype = Vl(e2), n2 = new es(), es.prototype = null, n2[Ql] = e2) : n2 = ns(), t2 === void 0 ? n2 : Yl(n2, t2);
};
var us = rs;
var is = J;
var os = Pn("unscopables");
var as = Array.prototype;
as[os] == null && is.f(as, os, { configurable: true, value: us(null) });
var ls;
var ss;
var cs;
var fs = function(e2) {
  as[os][e2] = true;
};
var ps = !D(function() {
  function e2() {
  }
  return e2.prototype.constructor = null, Object.getPrototypeOf(new e2()) !== e2.prototype;
});
var hs = $;
var Ds = j;
var gs = ps;
var ds = Oe("IE_PROTO");
var vs = Object.prototype;
var As = gs ? Object.getPrototypeOf : function(e2) {
  return e2 = Ds(e2), hs(e2, ds) ? e2[ds] : typeof e2.constructor == "function" && e2 instanceof e2.constructor ? e2.constructor.prototype : e2 instanceof Object ? vs : null;
};
var ys = D;
var Es = As;
var ms = le;
var ks = $;
var Fs = Pn("iterator");
var bs = false;
[].keys && ("next" in (cs = [].keys()) ? (ss = Es(Es(cs))) !== Object.prototype && (ls = ss) : bs = true), (ls == null || ys(function() {
  var e2 = {};
  return ls[Fs].call(e2) !== e2;
})) && (ls = {}), ks(ls, Fs) || ms(ls, Fs, function() {
  return this;
});
var Cs = { IteratorPrototype: ls, BUGGY_SAFARI_ITERATORS: bs };
var xs = Cs.IteratorPrototype;
var ws = rs;
var Bs = E;
var Ss = Hi;
var _s = Vi;
var Ts = function() {
  return this;
};
var Os = en;
var Rs = function(e2, t2, n2) {
  var r2 = t2 + " Iterator";
  return e2.prototype = ws(xs, { next: Bs(1, n2) }), Ss(e2, r2, false), _s[r2] = Ts, e2;
};
var js = As;
var Is = Cr;
var zs = Hi;
var $s = le;
var Ps = se.exports;
var Ls = Vi;
var Ms = Cs.IteratorPrototype;
var Ns = Cs.BUGGY_SAFARI_ITERATORS;
var Us = Pn("iterator");
var qs = function() {
  return this;
};
var Zs = function(e2, t2, n2, r2, u2, i2, o2) {
  Rs(n2, t2, r2);
  var a2, l2, s2, c2 = function(e3) {
    if (e3 === u2 && g2)
      return g2;
    if (!Ns && e3 in h2)
      return h2[e3];
    switch (e3) {
      case "keys":
      case "values":
      case "entries":
        return function() {
          return new n2(this, e3);
        };
    }
    return function() {
      return new n2(this);
    };
  }, f2 = t2 + " Iterator", p2 = false, h2 = e2.prototype, D2 = h2[Us] || h2["@@iterator"] || u2 && h2[u2], g2 = !Ns && D2 || c2(u2), d2 = t2 == "Array" && h2.entries || D2;
  if (d2 && (a2 = js(d2.call(new e2())), Ms !== Object.prototype && a2.next && (js(a2) !== Ms && (Is ? Is(a2, Ms) : typeof a2[Us] != "function" && $s(a2, Us, qs)), zs(a2, f2, true))), u2 == "values" && D2 && D2.name !== "values" && (p2 = true, g2 = function() {
    return D2.call(this);
  }), h2[Us] !== g2 && $s(h2, Us, g2), Ls[t2] = g2, u2)
    if (l2 = { values: c2("values"), keys: i2 ? g2 : c2("keys"), entries: c2("entries") }, o2)
      for (s2 in l2)
        (Ns || p2 || !(s2 in h2)) && Ps(h2, s2, l2[s2]);
    else
      Os({ target: t2, proto: true, forced: Ns || p2 }, l2);
  return l2;
};
var Gs = S;
var Hs = fs;
var Vs = Vi;
var Ys = Ve;
var Ks = Zs;
var Xs = Ys.set;
var Ws = Ys.getterFor("Array Iterator");
var Js = Ks(Array, "Array", function(e2, t2) {
  Xs(this, { type: "Array Iterator", target: Gs(e2), index: 0, kind: t2 });
}, function() {
  var e2 = Ws(this), t2 = e2.target, n2 = e2.kind, r2 = e2.index++;
  return !t2 || r2 >= t2.length ? (e2.target = void 0, { value: void 0, done: true }) : n2 == "keys" ? { value: r2, done: false } : n2 == "values" ? { value: t2[r2], done: false } : { value: [r2, t2[r2]], done: false };
}, "values");
Vs.Arguments = Vs.Array, Hs("keys"), Hs("values"), Hs("entries");
var Qs = tr.charAt;
var ec = Ve;
var tc = Zs;
var nc = ec.set;
var rc = ec.getterFor("String Iterator");
tc(String, "String", function(e2) {
  nc(this, { type: "String Iterator", string: String(e2), index: 0 });
}, function() {
  var e2, t2 = rc(this), n2 = t2.string, r2 = t2.index;
  return r2 >= n2.length ? { value: void 0, done: true } : (e2 = Qs(n2, r2), t2.index += e2.length, { value: e2, done: false });
});
var uc = p;
var ic = ui;
var oc = Js;
var ac = le;
var lc = Pn;
var sc = lc("iterator");
var cc = lc("toStringTag");
var fc = oc.values;
for (pc in ic) {
  hc = uc[pc], Dc = hc && hc.prototype;
  if (Dc) {
    if (Dc[sc] !== fc)
      try {
        ac(Dc, sc, fc);
      } catch (e2) {
        Dc[sc] = fc;
      }
    if (Dc[cc] || ac(Dc, cc, pc), ic[pc]) {
      for (gc in oc)
        if (Dc[gc] !== oc[gc])
          try {
            ac(Dc, gc, oc[gc]);
          } catch (e2) {
            Dc[gc] = oc[gc];
          }
    }
  }
}
var hc;
var Dc;
var gc;
var pc;
var dc = en;
var vc = D;
var Ac = li;
var yc = _;
var Ec = j;
var mc = pt;
var kc = kl;
var Fc = pi;
var bc = xl;
var Cc = bn;
var xc = Pn("isConcatSpreadable");
var wc = Cc >= 51 || !vc(function() {
  var e2 = [];
  return e2[xc] = false, e2.concat()[0] !== e2;
});
var Bc = bc("concat");
var Sc = function(e2) {
  if (!yc(e2))
    return false;
  var t2 = e2[xc];
  return t2 !== void 0 ? !!t2 : Ac(e2);
};
dc({ target: "Array", proto: true, forced: !wc || !Bc }, { concat: function(e2) {
  var t2, n2, r2, u2, i2, o2 = Ec(this), a2 = Fc(o2, 0), l2 = 0;
  for (t2 = -1, r2 = arguments.length; t2 < r2; t2++)
    if (Sc(i2 = t2 === -1 ? o2 : arguments[t2])) {
      if (l2 + (u2 = mc(i2.length)) > 9007199254740991)
        throw TypeError("Maximum allowed index exceeded");
      for (n2 = 0; n2 < u2; n2++, l2++)
        n2 in i2 && kc(a2, l2, i2[n2]);
    } else {
      if (l2 >= 9007199254740991)
        throw TypeError("Maximum allowed index exceeded");
      kc(a2, l2++, i2);
    }
  return a2.length = l2, a2;
} });
var _c = j;
var Tc = Ul;
en({ target: "Object", stat: true, forced: D(function() {
  Tc(1);
}) }, { keys: function(e2) {
  return Tc(_c(e2));
} });
var Oc = mt.includes;
var Rc = fs;
en({ target: "Array", proto: true }, { includes: function(e2) {
  return Oc(this, e2, arguments.length > 1 ? arguments[1] : void 0);
} }), Rc("includes");
var jc = Tr;
var Ic = Pn("match");
var zc = function(e2) {
  if (jc(e2))
    throw TypeError("The method doesn't accept regular expressions");
  return e2;
};
var $c = x;
en({ target: "String", proto: true, forced: !function(e2) {
  var t2 = /./;
  try {
    "/./"[e2](t2);
  } catch (n2) {
    try {
      return t2[Ic] = false, "/./"[e2](t2);
    } catch (e3) {
    }
  }
  return false;
}("includes") }, { includes: function(e2) {
  return !!~String($c(this)).indexOf(zc(e2), arguments.length > 1 ? arguments[1] : void 0);
} });
var Pc = x;
var Lc = /"/g;
var Mc = D;
var Nc = function(e2, t2, n2, r2) {
  var u2 = String(Pc(e2)), i2 = "<" + t2;
  return n2 !== "" && (i2 += " " + n2 + '="' + String(r2).replace(Lc, "&quot;") + '"'), i2 + ">" + u2 + "</" + t2 + ">";
};
en({ target: "String", proto: true, forced: function(e2) {
  return Mc(function() {
    var t2 = ""[e2]('"');
    return t2 !== t2.toLowerCase() || t2.split('"').length > 3;
  });
}("link") }, { link: function(e2) {
  return Nc(this, "a", "href", e2);
} });
var Uc = Ei.map;
en({ target: "Array", proto: true, forced: !xl("map") }, { map: function(e2) {
  return Uc(this, e2, arguments.length > 1 ? arguments[1] : void 0);
} });
var qc = en;
var Zc = dt;
var Gc = st;
var Hc = pt;
var Vc = j;
var Yc = pi;
var Kc = kl;
var Xc = xl("splice");
var Wc = Math.max;
var Jc = Math.min;
qc({ target: "Array", proto: true, forced: !Xc }, { splice: function(e2, t2) {
  var n2, r2, u2, i2, o2, a2, l2 = Vc(this), s2 = Hc(l2.length), c2 = Zc(e2, s2), f2 = arguments.length;
  if (f2 === 0 ? n2 = r2 = 0 : f2 === 1 ? (n2 = 0, r2 = s2 - c2) : (n2 = f2 - 2, r2 = Jc(Wc(Gc(t2), 0), s2 - c2)), s2 + n2 - r2 > 9007199254740991)
    throw TypeError("Maximum allowed length exceeded");
  for (u2 = Yc(l2, r2), i2 = 0; i2 < r2; i2++)
    (o2 = c2 + i2) in l2 && Kc(u2, i2, l2[o2]);
  if (u2.length = r2, n2 < r2) {
    for (i2 = c2; i2 < s2 - r2; i2++)
      a2 = i2 + n2, (o2 = i2 + r2) in l2 ? l2[a2] = l2[o2] : delete l2[a2];
    for (i2 = s2; i2 > s2 - r2 + n2; i2--)
      delete l2[i2 - 1];
  } else if (n2 > r2)
    for (i2 = s2 - r2; i2 > c2; i2--)
      a2 = i2 + n2 - 1, (o2 = i2 + r2 - 1) in l2 ? l2[a2] = l2[o2] : delete l2[a2];
  for (i2 = 0; i2 < n2; i2++)
    l2[i2 + c2] = arguments[i2 + 2];
  return l2.length = s2 - r2 + n2, u2;
} });
var Qc = { exports: {} };
function ef() {
  return { baseUrl: null, breaks: false, gfm: true, headerIds: true, headerPrefix: "", highlight: null, langPrefix: "language-", mangle: true, pedantic: false, renderer: null, sanitize: false, sanitizer: null, silent: false, smartLists: false, smartypants: false, tokenizer: null, walkTokens: null, xhtml: false };
}
Qc.exports = { defaults: { baseUrl: null, breaks: false, gfm: true, headerIds: true, headerPrefix: "", highlight: null, langPrefix: "language-", mangle: true, pedantic: false, renderer: null, sanitize: false, sanitizer: null, silent: false, smartLists: false, smartypants: false, tokenizer: null, walkTokens: null, xhtml: false }, getDefaults: ef, changeDefaults: function(e2) {
  Qc.exports.defaults = e2;
} };
var tf = /[&<>"']/;
var nf = /[&<>"']/g;
var rf = /[<>"']|&(?!#?\w+;)/;
var uf = /[<>"']|&(?!#?\w+;)/g;
var of = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
var af = function(e2) {
  return of[e2];
};
var lf = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;
function sf(e2) {
  return e2.replace(lf, function(e3, t2) {
    return (t2 = t2.toLowerCase()) === "colon" ? ":" : t2.charAt(0) === "#" ? t2.charAt(1) === "x" ? String.fromCharCode(parseInt(t2.substring(2), 16)) : String.fromCharCode(+t2.substring(1)) : "";
  });
}
var cf = /(^|[^\[])\^/g;
var ff = /[^\w:]/g;
var pf = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
var hf = {};
var Df = /^[^:]+:\/*[^/]*$/;
var gf = /^([^:]+:)[\s\S]*$/;
var df = /^([^:]+:\/*[^/]*)[\s\S]*$/;
function vf(e2, t2) {
  hf[" " + e2] || (Df.test(e2) ? hf[" " + e2] = e2 + "/" : hf[" " + e2] = Af(e2, "/", true));
  var n2 = (e2 = hf[" " + e2]).indexOf(":") === -1;
  return t2.substring(0, 2) === "//" ? n2 ? t2 : e2.replace(gf, "$1") + t2 : t2.charAt(0) === "/" ? n2 ? t2 : e2.replace(df, "$1") + t2 : e2 + t2;
}
function Af(e2, t2, n2) {
  var r2 = e2.length;
  if (r2 === 0)
    return "";
  for (var u2 = 0; u2 < r2; ) {
    var i2 = e2.charAt(r2 - u2 - 1);
    if (i2 !== t2 || n2) {
      if (i2 === t2 || !n2)
        break;
      u2++;
    } else
      u2++;
  }
  return e2.substr(0, r2 - u2);
}
var yf = function(e2, t2) {
  if (t2) {
    if (tf.test(e2))
      return e2.replace(nf, af);
  } else if (rf.test(e2))
    return e2.replace(uf, af);
  return e2;
};
var Ef = sf;
var mf = function(e2, t2) {
  e2 = e2.source || e2, t2 = t2 || "";
  var n2 = { replace: function(t3, r2) {
    return r2 = (r2 = r2.source || r2).replace(cf, "$1"), e2 = e2.replace(t3, r2), n2;
  }, getRegex: function() {
    return new RegExp(e2, t2);
  } };
  return n2;
};
var kf = function(e2, t2, n2) {
  if (e2) {
    var r2;
    try {
      r2 = decodeURIComponent(sf(n2)).replace(ff, "").toLowerCase();
    } catch (e3) {
      return null;
    }
    if (r2.indexOf("javascript:") === 0 || r2.indexOf("vbscript:") === 0 || r2.indexOf("data:") === 0)
      return null;
  }
  t2 && !pf.test(n2) && (n2 = vf(t2, n2));
  try {
    n2 = encodeURI(n2).replace(/%25/g, "%");
  } catch (e3) {
    return null;
  }
  return n2;
};
var Ff = { exec: function() {
} };
var bf = function(e2) {
  for (var t2, n2, r2 = 1; r2 < arguments.length; r2++)
    for (n2 in t2 = arguments[r2])
      Object.prototype.hasOwnProperty.call(t2, n2) && (e2[n2] = t2[n2]);
  return e2;
};
var Cf = function(e2, t2) {
  var n2 = e2.replace(/\|/g, function(e3, t3, n3) {
    for (var r3 = false, u2 = t3; --u2 >= 0 && n3[u2] === "\\"; )
      r3 = !r3;
    return r3 ? "|" : " |";
  }).split(/ \|/), r2 = 0;
  if (n2.length > t2)
    n2.splice(t2);
  else
    for (; n2.length < t2; )
      n2.push("");
  for (; r2 < n2.length; r2++)
    n2[r2] = n2[r2].trim().replace(/\\\|/g, "|");
  return n2;
};
var xf = Af;
var wf = function(e2, t2) {
  if (e2.indexOf(t2[1]) === -1)
    return -1;
  for (var n2 = e2.length, r2 = 0, u2 = 0; u2 < n2; u2++)
    if (e2[u2] === "\\")
      u2++;
    else if (e2[u2] === t2[0])
      r2++;
    else if (e2[u2] === t2[1] && --r2 < 0)
      return u2;
  return -1;
};
var Bf = function(e2) {
  e2 && e2.sanitize && !e2.silent && console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options");
};
var Sf = function(e2, t2) {
  if (t2 < 1)
    return "";
  for (var n2 = ""; t2 > 1; )
    1 & t2 && (n2 += e2), t2 >>= 1, e2 += e2;
  return n2 + e2;
};
var _f = Qc.exports.defaults;
var Tf = xf;
var Of = Cf;
var Rf = yf;
var jf = wf;
function If(e2, t2, n2) {
  var r2 = t2.href, u2 = t2.title ? Rf(t2.title) : null, i2 = e2[1].replace(/\\([\[\]])/g, "$1");
  return e2[0].charAt(0) !== "!" ? { type: "link", raw: n2, href: r2, title: u2, text: i2 } : { type: "image", raw: n2, href: r2, title: u2, text: Rf(i2) };
}
var zf = function() {
  function e2(n2) {
    t(this, e2), this.options = n2 || _f;
  }
  return r(e2, [{ key: "space", value: function(e3) {
    var t2 = this.rules.block.newline.exec(e3);
    if (t2)
      return t2[0].length > 1 ? { type: "space", raw: t2[0] } : { raw: "\n" };
  } }, { key: "code", value: function(e3) {
    var t2 = this.rules.block.code.exec(e3);
    if (t2) {
      var n2 = t2[0].replace(/^ {1,4}/gm, "");
      return { type: "code", raw: t2[0], codeBlockStyle: "indented", text: this.options.pedantic ? n2 : Tf(n2, "\n") };
    }
  } }, { key: "fences", value: function(e3) {
    var t2 = this.rules.block.fences.exec(e3);
    if (t2) {
      var n2 = t2[0], r2 = function(e4, t3) {
        var n3 = e4.match(/^(\s+)(?:```)/);
        if (n3 === null)
          return t3;
        var r3 = n3[1];
        return t3.split("\n").map(function(e5) {
          var t4 = e5.match(/^\s+/);
          return t4 === null ? e5 : o(t4, 1)[0].length >= r3.length ? e5.slice(r3.length) : e5;
        }).join("\n");
      }(n2, t2[3] || "");
      return { type: "code", raw: n2, lang: t2[2] ? t2[2].trim() : t2[2], text: r2 };
    }
  } }, { key: "heading", value: function(e3) {
    var t2 = this.rules.block.heading.exec(e3);
    if (t2) {
      var n2 = t2[2].trim();
      if (/#$/.test(n2)) {
        var r2 = Tf(n2, "#");
        this.options.pedantic ? n2 = r2.trim() : r2 && !/ $/.test(r2) || (n2 = r2.trim());
      }
      return { type: "heading", raw: t2[0], depth: t2[1].length, text: n2 };
    }
  } }, { key: "nptable", value: function(e3) {
    var t2 = this.rules.block.nptable.exec(e3);
    if (t2) {
      var n2 = { type: "table", header: Of(t2[1].replace(/^ *| *\| *$/g, "")), align: t2[2].replace(/^ *|\| *$/g, "").split(/ *\| */), cells: t2[3] ? t2[3].replace(/\n$/, "").split("\n") : [], raw: t2[0] };
      if (n2.header.length === n2.align.length) {
        var r2, u2 = n2.align.length;
        for (r2 = 0; r2 < u2; r2++)
          /^ *-+: *$/.test(n2.align[r2]) ? n2.align[r2] = "right" : /^ *:-+: *$/.test(n2.align[r2]) ? n2.align[r2] = "center" : /^ *:-+ *$/.test(n2.align[r2]) ? n2.align[r2] = "left" : n2.align[r2] = null;
        for (u2 = n2.cells.length, r2 = 0; r2 < u2; r2++)
          n2.cells[r2] = Of(n2.cells[r2], n2.header.length);
        return n2;
      }
    }
  } }, { key: "hr", value: function(e3) {
    var t2 = this.rules.block.hr.exec(e3);
    if (t2)
      return { type: "hr", raw: t2[0] };
  } }, { key: "blockquote", value: function(e3) {
    var t2 = this.rules.block.blockquote.exec(e3);
    if (t2) {
      var n2 = t2[0].replace(/^ *> ?/gm, "");
      return { type: "blockquote", raw: t2[0], text: n2 };
    }
  } }, { key: "list", value: function(e3) {
    var t2 = this.rules.block.list.exec(e3);
    if (t2) {
      var n2, r2, u2, i2, o2, a2, l2, s2, c2, f2 = t2[0], p2 = t2[2], h2 = p2.length > 1, D2 = { type: "list", raw: f2, ordered: h2, start: h2 ? +p2.slice(0, -1) : "", loose: false, items: [] }, g2 = t2[0].match(this.rules.block.item), d2 = false, v2 = g2.length;
      u2 = this.rules.block.listItemStart.exec(g2[0]);
      for (var A2 = 0; A2 < v2; A2++) {
        if (f2 = n2 = g2[A2], this.options.pedantic || (c2 = n2.match(new RegExp("\\n\\s*\\n {0," + (u2[0].length - 1) + "}\\S"))) && (o2 = n2.length - c2.index + g2.slice(A2 + 1).join("\n").length, D2.raw = D2.raw.substring(0, D2.raw.length - o2), f2 = n2 = n2.substring(0, c2.index), v2 = A2 + 1), A2 !== v2 - 1) {
          if (i2 = this.rules.block.listItemStart.exec(g2[A2 + 1]), this.options.pedantic ? i2[1].length > u2[1].length : i2[1].length >= u2[0].length || i2[1].length > 3) {
            g2.splice(A2, 2, g2[A2] + (!this.options.pedantic && i2[1].length < u2[0].length && !g2[A2].match(/\n$/) ? "" : "\n") + g2[A2 + 1]), A2--, v2--;
            continue;
          }
          (!this.options.pedantic || this.options.smartLists ? i2[2][i2[2].length - 1] !== p2[p2.length - 1] : h2 === (i2[2].length === 1)) && (o2 = g2.slice(A2 + 1).join("\n").length, D2.raw = D2.raw.substring(0, D2.raw.length - o2), A2 = v2 - 1), u2 = i2;
        }
        r2 = n2.length, ~(n2 = n2.replace(/^ *([*+-]|\d+[.)]) ?/, "")).indexOf("\n ") && (r2 -= n2.length, n2 = this.options.pedantic ? n2.replace(/^ {1,4}/gm, "") : n2.replace(new RegExp("^ {1," + r2 + "}", "gm"), "")), n2 = Tf(n2, "\n"), A2 !== v2 - 1 && (f2 += "\n"), a2 = d2 || /\n\n(?!\s*$)/.test(f2), A2 !== v2 - 1 && (d2 = f2.slice(-2) === "\n\n", a2 || (a2 = d2)), a2 && (D2.loose = true), this.options.gfm && (s2 = void 0, (l2 = /^\[[ xX]\] /.test(n2)) && (s2 = n2[1] !== " ", n2 = n2.replace(/^\[[ xX]\] +/, ""))), D2.items.push({ type: "list_item", raw: f2, task: l2, checked: s2, loose: a2, text: n2 });
      }
      return D2;
    }
  } }, { key: "html", value: function(e3) {
    var t2 = this.rules.block.html.exec(e3);
    if (t2)
      return { type: this.options.sanitize ? "paragraph" : "html", raw: t2[0], pre: !this.options.sanitizer && (t2[1] === "pre" || t2[1] === "script" || t2[1] === "style"), text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(t2[0]) : Rf(t2[0]) : t2[0] };
  } }, { key: "def", value: function(e3) {
    var t2 = this.rules.block.def.exec(e3);
    if (t2)
      return t2[3] && (t2[3] = t2[3].substring(1, t2[3].length - 1)), { type: "def", tag: t2[1].toLowerCase().replace(/\s+/g, " "), raw: t2[0], href: t2[2], title: t2[3] };
  } }, { key: "table", value: function(e3) {
    var t2 = this.rules.block.table.exec(e3);
    if (t2) {
      var n2 = { type: "table", header: Of(t2[1].replace(/^ *| *\| *$/g, "")), align: t2[2].replace(/^ *|\| *$/g, "").split(/ *\| */), cells: t2[3] ? t2[3].replace(/\n$/, "").split("\n") : [] };
      if (n2.header.length === n2.align.length) {
        n2.raw = t2[0];
        var r2, u2 = n2.align.length;
        for (r2 = 0; r2 < u2; r2++)
          /^ *-+: *$/.test(n2.align[r2]) ? n2.align[r2] = "right" : /^ *:-+: *$/.test(n2.align[r2]) ? n2.align[r2] = "center" : /^ *:-+ *$/.test(n2.align[r2]) ? n2.align[r2] = "left" : n2.align[r2] = null;
        for (u2 = n2.cells.length, r2 = 0; r2 < u2; r2++)
          n2.cells[r2] = Of(n2.cells[r2].replace(/^ *\| *| *\| *$/g, ""), n2.header.length);
        return n2;
      }
    }
  } }, { key: "lheading", value: function(e3) {
    var t2 = this.rules.block.lheading.exec(e3);
    if (t2)
      return { type: "heading", raw: t2[0], depth: t2[2].charAt(0) === "=" ? 1 : 2, text: t2[1] };
  } }, { key: "paragraph", value: function(e3) {
    var t2 = this.rules.block.paragraph.exec(e3);
    if (t2)
      return { type: "paragraph", raw: t2[0], text: t2[1].charAt(t2[1].length - 1) === "\n" ? t2[1].slice(0, -1) : t2[1] };
  } }, { key: "text", value: function(e3) {
    var t2 = this.rules.block.text.exec(e3);
    if (t2)
      return { type: "text", raw: t2[0], text: t2[0] };
  } }, { key: "escape", value: function(e3) {
    var t2 = this.rules.inline.escape.exec(e3);
    if (t2)
      return { type: "escape", raw: t2[0], text: Rf(t2[1]) };
  } }, { key: "tag", value: function(e3, t2, n2) {
    var r2 = this.rules.inline.tag.exec(e3);
    if (r2)
      return !t2 && /^<a /i.test(r2[0]) ? t2 = true : t2 && /^<\/a>/i.test(r2[0]) && (t2 = false), !n2 && /^<(pre|code|kbd|script)(\s|>)/i.test(r2[0]) ? n2 = true : n2 && /^<\/(pre|code|kbd|script)(\s|>)/i.test(r2[0]) && (n2 = false), { type: this.options.sanitize ? "text" : "html", raw: r2[0], inLink: t2, inRawBlock: n2, text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(r2[0]) : Rf(r2[0]) : r2[0] };
  } }, { key: "link", value: function(e3) {
    var t2 = this.rules.inline.link.exec(e3);
    if (t2) {
      var n2 = t2[2].trim();
      if (!this.options.pedantic && /^</.test(n2)) {
        if (!/>$/.test(n2))
          return;
        var r2 = Tf(n2.slice(0, -1), "\\");
        if ((n2.length - r2.length) % 2 == 0)
          return;
      } else {
        var u2 = jf(t2[2], "()");
        if (u2 > -1) {
          var i2 = (t2[0].indexOf("!") === 0 ? 5 : 4) + t2[1].length + u2;
          t2[2] = t2[2].substring(0, u2), t2[0] = t2[0].substring(0, i2).trim(), t2[3] = "";
        }
      }
      var o2 = t2[2], a2 = "";
      if (this.options.pedantic) {
        var l2 = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(o2);
        l2 && (o2 = l2[1], a2 = l2[3]);
      } else
        a2 = t2[3] ? t2[3].slice(1, -1) : "";
      return o2 = o2.trim(), /^</.test(o2) && (o2 = this.options.pedantic && !/>$/.test(n2) ? o2.slice(1) : o2.slice(1, -1)), If(t2, { href: o2 ? o2.replace(this.rules.inline._escapes, "$1") : o2, title: a2 ? a2.replace(this.rules.inline._escapes, "$1") : a2 }, t2[0]);
    }
  } }, { key: "reflink", value: function(e3, t2) {
    var n2;
    if ((n2 = this.rules.inline.reflink.exec(e3)) || (n2 = this.rules.inline.nolink.exec(e3))) {
      var r2 = (n2[2] || n2[1]).replace(/\s+/g, " ");
      if (!(r2 = t2[r2.toLowerCase()]) || !r2.href) {
        var u2 = n2[0].charAt(0);
        return { type: "text", raw: u2, text: u2 };
      }
      return If(n2, r2, n2[0]);
    }
  } }, { key: "emStrong", value: function(e3, t2) {
    var n2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "", r2 = this.rules.inline.emStrong.lDelim.exec(e3);
    if (r2 && (!r2[3] || !n2.match(/(?:[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08C7\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\u9FFC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7CA\uA7F5-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDE60-\uDE7E\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC52-\uDC6F\uDC83-\uDCAF\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD3F\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF30-\uDF3B]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF2\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE96\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82C[\uDC00-\uDD1E\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD834[\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])/))) {
      var u2 = r2[1] || r2[2] || "";
      if (!u2 || u2 && (n2 === "" || this.rules.inline.punctuation.exec(n2))) {
        var i2, o2, a2 = r2[0].length - 1, l2 = a2, s2 = 0, c2 = r2[0][0] === "*" ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
        for (c2.lastIndex = 0, t2 = t2.slice(-1 * e3.length + a2); (r2 = c2.exec(t2)) != null; )
          if (i2 = r2[1] || r2[2] || r2[3] || r2[4] || r2[5] || r2[6])
            if (o2 = i2.length, r2[3] || r2[4])
              l2 += o2;
            else if (!((r2[5] || r2[6]) && a2 % 3) || (a2 + o2) % 3) {
              if (!((l2 -= o2) > 0)) {
                if (l2 + s2 - o2 <= 0 && !t2.slice(c2.lastIndex).match(c2) && (o2 = Math.min(o2, o2 + l2 + s2)), Math.min(a2, o2) % 2)
                  return { type: "em", raw: e3.slice(0, a2 + r2.index + o2 + 1), text: e3.slice(1, a2 + r2.index + o2) };
                if (Math.min(a2, o2) % 2 == 0)
                  return { type: "strong", raw: e3.slice(0, a2 + r2.index + o2 + 1), text: e3.slice(2, a2 + r2.index + o2 - 1) };
              }
            } else
              s2 += o2;
      }
    }
  } }, { key: "codespan", value: function(e3) {
    var t2 = this.rules.inline.code.exec(e3);
    if (t2) {
      var n2 = t2[2].replace(/\n/g, " "), r2 = /[^ ]/.test(n2), u2 = /^ /.test(n2) && / $/.test(n2);
      return r2 && u2 && (n2 = n2.substring(1, n2.length - 1)), n2 = Rf(n2, true), { type: "codespan", raw: t2[0], text: n2 };
    }
  } }, { key: "br", value: function(e3) {
    var t2 = this.rules.inline.br.exec(e3);
    if (t2)
      return { type: "br", raw: t2[0] };
  } }, { key: "del", value: function(e3) {
    var t2 = this.rules.inline.del.exec(e3);
    if (t2)
      return { type: "del", raw: t2[0], text: t2[2] };
  } }, { key: "autolink", value: function(e3, t2) {
    var n2, r2, u2 = this.rules.inline.autolink.exec(e3);
    if (u2)
      return r2 = u2[2] === "@" ? "mailto:" + (n2 = Rf(this.options.mangle ? t2(u2[1]) : u2[1])) : n2 = Rf(u2[1]), { type: "link", raw: u2[0], text: n2, href: r2, tokens: [{ type: "text", raw: n2, text: n2 }] };
  } }, { key: "url", value: function(e3, t2) {
    var n2;
    if (n2 = this.rules.inline.url.exec(e3)) {
      var r2, u2;
      if (n2[2] === "@")
        u2 = "mailto:" + (r2 = Rf(this.options.mangle ? t2(n2[0]) : n2[0]));
      else {
        var i2;
        do {
          i2 = n2[0], n2[0] = this.rules.inline._backpedal.exec(n2[0])[0];
        } while (i2 !== n2[0]);
        r2 = Rf(n2[0]), u2 = n2[1] === "www." ? "http://" + r2 : r2;
      }
      return { type: "link", raw: n2[0], text: r2, href: u2, tokens: [{ type: "text", raw: r2, text: r2 }] };
    }
  } }, { key: "inlineText", value: function(e3, t2, n2) {
    var r2, u2 = this.rules.inline.text.exec(e3);
    if (u2)
      return r2 = t2 ? this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(u2[0]) : Rf(u2[0]) : u2[0] : Rf(this.options.smartypants ? n2(u2[0]) : u2[0]), { type: "text", raw: u2[0], text: r2 };
  } }]), e2;
}();
var $f = Ff;
var Pf = mf;
var Lf = bf;
var Mf = { newline: /^(?: *(?:\n|$))+/, code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/, fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/, hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/, heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/, list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?! {0,3}bull )\n*|\s*$)/, html: "^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$))", def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/, nptable: $f, table: $f, lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/, _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html| +\n)[^\n]+)*)/, text: /^[^\n]+/, _label: /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/, _title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/ };
Mf.def = Pf(Mf.def).replace("label", Mf._label).replace("title", Mf._title).getRegex(), Mf.bullet = /(?:[*+-]|\d{1,9}[.)])/, Mf.item = /^( *)(bull) ?[^\n]*(?:\n(?! *bull ?)[^\n]*)*/, Mf.item = Pf(Mf.item, "gm").replace(/bull/g, Mf.bullet).getRegex(), Mf.listItemStart = Pf(/^( *)(bull) */).replace("bull", Mf.bullet).getRegex(), Mf.list = Pf(Mf.list).replace(/bull/g, Mf.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + Mf.def.source + ")").getRegex(), Mf._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", Mf._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/, Mf.html = Pf(Mf.html, "i").replace("comment", Mf._comment).replace("tag", Mf._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), Mf.paragraph = Pf(Mf._paragraph).replace("hr", Mf.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag", Mf._tag).getRegex(), Mf.blockquote = Pf(Mf.blockquote).replace("paragraph", Mf.paragraph).getRegex(), Mf.normal = Lf({}, Mf), Mf.gfm = Lf({}, Mf.normal, { nptable: "^ *([^|\\n ].*\\|.*)\\n {0,3}([-:]+ *\\|[-| :]*)(?:\\n((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)", table: "^ *\\|(.+)\\n {0,3}\\|?( *[-:]+[-| :]*)(?:\\n *((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)" }), Mf.gfm.nptable = Pf(Mf.gfm.nptable).replace("hr", Mf.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag", Mf._tag).getRegex(), Mf.gfm.table = Pf(Mf.gfm.table).replace("hr", Mf.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag", Mf._tag).getRegex(), Mf.pedantic = Lf({}, Mf.normal, { html: Pf(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", Mf._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: $f, paragraph: Pf(Mf.normal._paragraph).replace("hr", Mf.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", Mf.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex() });
var Nf = { escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/, url: $f, tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>", link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/, reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/, nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/, reflinkSearch: "reflink|nolink(?!\\()", emStrong: { lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/, rDelimAst: /\_\_[^_]*?\*[^_]*?\_\_|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/, rDelimUnd: /\*\*[^*]*?\_[^*]*?\*\*|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/ }, code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, br: /^( {2,}|\\)\n(?!\s*$)/, del: $f, text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, punctuation: /^([\spunctuation])/, _punctuation: "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~" };
Nf.punctuation = Pf(Nf.punctuation).replace(/punctuation/g, Nf._punctuation).getRegex(), Nf.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g, Nf.escapedEmSt = /\\\*|\\_/g, Nf._comment = Pf(Mf._comment).replace("(?:-->|$)", "-->").getRegex(), Nf.emStrong.lDelim = Pf(Nf.emStrong.lDelim).replace(/punct/g, Nf._punctuation).getRegex(), Nf.emStrong.rDelimAst = Pf(Nf.emStrong.rDelimAst, "g").replace(/punct/g, Nf._punctuation).getRegex(), Nf.emStrong.rDelimUnd = Pf(Nf.emStrong.rDelimUnd, "g").replace(/punct/g, Nf._punctuation).getRegex(), Nf._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g, Nf._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/, Nf._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/, Nf.autolink = Pf(Nf.autolink).replace("scheme", Nf._scheme).replace("email", Nf._email).getRegex(), Nf._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/, Nf.tag = Pf(Nf.tag).replace("comment", Nf._comment).replace("attribute", Nf._attribute).getRegex(), Nf._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, Nf._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/, Nf._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/, Nf.link = Pf(Nf.link).replace("label", Nf._label).replace("href", Nf._href).replace("title", Nf._title).getRegex(), Nf.reflink = Pf(Nf.reflink).replace("label", Nf._label).getRegex(), Nf.reflinkSearch = Pf(Nf.reflinkSearch, "g").replace("reflink", Nf.reflink).replace("nolink", Nf.nolink).getRegex(), Nf.normal = Lf({}, Nf), Nf.pedantic = Lf({}, Nf.normal, { strong: { start: /^__|\*\*/, middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/, endAst: /\*\*(?!\*)/g, endUnd: /__(?!_)/g }, em: { start: /^_|\*/, middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/, endAst: /\*(?!\*)/g, endUnd: /_(?!_)/g }, link: Pf(/^!?\[(label)\]\((.*?)\)/).replace("label", Nf._label).getRegex(), reflink: Pf(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Nf._label).getRegex() }), Nf.gfm = Lf({}, Nf.normal, { escape: Pf(Nf.escape).replace("])", "~|])").getRegex(), _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/, url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/, text: /^([`~]+|[^`~])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/ }), Nf.gfm.url = Pf(Nf.gfm.url, "i").replace("email", Nf.gfm._extended_email).getRegex(), Nf.breaks = Lf({}, Nf.gfm, { br: Pf(Nf.br).replace("{2,}", "*").getRegex(), text: Pf(Nf.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() });
var Uf = { block: Mf, inline: Nf };
var qf = zf;
var Zf = Qc.exports.defaults;
var Gf = Uf.block;
var Hf = Uf.inline;
var Vf = Sf;
function Yf(e2) {
  return e2.replace(/---/g, "\u2014").replace(/--/g, "\u2013").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018").replace(/'/g, "\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201C").replace(/"/g, "\u201D").replace(/\.{3}/g, "\u2026");
}
function Kf(e2) {
  var t2, n2, r2 = "", u2 = e2.length;
  for (t2 = 0; t2 < u2; t2++)
    n2 = e2.charCodeAt(t2), Math.random() > 0.5 && (n2 = "x" + n2.toString(16)), r2 += "&#" + n2 + ";";
  return r2;
}
var Xf = function() {
  function e2(n2) {
    t(this, e2), this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = n2 || Zf, this.options.tokenizer = this.options.tokenizer || new qf(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options;
    var r2 = { block: Gf.normal, inline: Hf.normal };
    this.options.pedantic ? (r2.block = Gf.pedantic, r2.inline = Hf.pedantic) : this.options.gfm && (r2.block = Gf.gfm, this.options.breaks ? r2.inline = Hf.breaks : r2.inline = Hf.gfm), this.tokenizer.rules = r2;
  }
  return r(e2, [{ key: "lex", value: function(e3) {
    return e3 = e3.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    "), this.blockTokens(e3, this.tokens, true), this.inline(this.tokens), this.tokens;
  } }, { key: "blockTokens", value: function(e3) {
    var t2, n2, r2, u2, i2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], o2 = !(arguments.length > 2 && arguments[2] !== void 0) || arguments[2];
    for (this.options.pedantic && (e3 = e3.replace(/^ +$/gm, "")); e3; )
      if (t2 = this.tokenizer.space(e3))
        e3 = e3.substring(t2.raw.length), t2.type && i2.push(t2);
      else if (t2 = this.tokenizer.code(e3))
        e3 = e3.substring(t2.raw.length), (u2 = i2[i2.length - 1]) && u2.type === "paragraph" ? (u2.raw += "\n" + t2.raw, u2.text += "\n" + t2.text) : i2.push(t2);
      else if (t2 = this.tokenizer.fences(e3))
        e3 = e3.substring(t2.raw.length), i2.push(t2);
      else if (t2 = this.tokenizer.heading(e3))
        e3 = e3.substring(t2.raw.length), i2.push(t2);
      else if (t2 = this.tokenizer.nptable(e3))
        e3 = e3.substring(t2.raw.length), i2.push(t2);
      else if (t2 = this.tokenizer.hr(e3))
        e3 = e3.substring(t2.raw.length), i2.push(t2);
      else if (t2 = this.tokenizer.blockquote(e3))
        e3 = e3.substring(t2.raw.length), t2.tokens = this.blockTokens(t2.text, [], o2), i2.push(t2);
      else if (t2 = this.tokenizer.list(e3)) {
        for (e3 = e3.substring(t2.raw.length), r2 = t2.items.length, n2 = 0; n2 < r2; n2++)
          t2.items[n2].tokens = this.blockTokens(t2.items[n2].text, [], false);
        i2.push(t2);
      } else if (t2 = this.tokenizer.html(e3))
        e3 = e3.substring(t2.raw.length), i2.push(t2);
      else if (o2 && (t2 = this.tokenizer.def(e3)))
        e3 = e3.substring(t2.raw.length), this.tokens.links[t2.tag] || (this.tokens.links[t2.tag] = { href: t2.href, title: t2.title });
      else if (t2 = this.tokenizer.table(e3))
        e3 = e3.substring(t2.raw.length), i2.push(t2);
      else if (t2 = this.tokenizer.lheading(e3))
        e3 = e3.substring(t2.raw.length), i2.push(t2);
      else if (o2 && (t2 = this.tokenizer.paragraph(e3)))
        e3 = e3.substring(t2.raw.length), i2.push(t2);
      else if (t2 = this.tokenizer.text(e3))
        e3 = e3.substring(t2.raw.length), (u2 = i2[i2.length - 1]) && u2.type === "text" ? (u2.raw += "\n" + t2.raw, u2.text += "\n" + t2.text) : i2.push(t2);
      else if (e3) {
        var a2 = "Infinite loop on byte: " + e3.charCodeAt(0);
        if (this.options.silent) {
          console.error(a2);
          break;
        }
        throw new Error(a2);
      }
    return i2;
  } }, { key: "inline", value: function(e3) {
    var t2, n2, r2, u2, i2, o2, a2 = e3.length;
    for (t2 = 0; t2 < a2; t2++)
      switch ((o2 = e3[t2]).type) {
        case "paragraph":
        case "text":
        case "heading":
          o2.tokens = [], this.inlineTokens(o2.text, o2.tokens);
          break;
        case "table":
          for (o2.tokens = { header: [], cells: [] }, u2 = o2.header.length, n2 = 0; n2 < u2; n2++)
            o2.tokens.header[n2] = [], this.inlineTokens(o2.header[n2], o2.tokens.header[n2]);
          for (u2 = o2.cells.length, n2 = 0; n2 < u2; n2++)
            for (i2 = o2.cells[n2], o2.tokens.cells[n2] = [], r2 = 0; r2 < i2.length; r2++)
              o2.tokens.cells[n2][r2] = [], this.inlineTokens(i2[r2], o2.tokens.cells[n2][r2]);
          break;
        case "blockquote":
          this.inline(o2.tokens);
          break;
        case "list":
          for (u2 = o2.items.length, n2 = 0; n2 < u2; n2++)
            this.inline(o2.items[n2].tokens);
      }
    return e3;
  } }, { key: "inlineTokens", value: function(e3) {
    var t2, n2, r2, u2, i2, o2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], a2 = arguments.length > 2 && arguments[2] !== void 0 && arguments[2], l2 = arguments.length > 3 && arguments[3] !== void 0 && arguments[3], s2 = e3;
    if (this.tokens.links) {
      var c2 = Object.keys(this.tokens.links);
      if (c2.length > 0)
        for (; (r2 = this.tokenizer.rules.inline.reflinkSearch.exec(s2)) != null; )
          c2.includes(r2[0].slice(r2[0].lastIndexOf("[") + 1, -1)) && (s2 = s2.slice(0, r2.index) + "[" + Vf("a", r2[0].length - 2) + "]" + s2.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (r2 = this.tokenizer.rules.inline.blockSkip.exec(s2)) != null; )
      s2 = s2.slice(0, r2.index) + "[" + Vf("a", r2[0].length - 2) + "]" + s2.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    for (; (r2 = this.tokenizer.rules.inline.escapedEmSt.exec(s2)) != null; )
      s2 = s2.slice(0, r2.index) + "++" + s2.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
    for (; e3; )
      if (u2 || (i2 = ""), u2 = false, t2 = this.tokenizer.escape(e3))
        e3 = e3.substring(t2.raw.length), o2.push(t2);
      else if (t2 = this.tokenizer.tag(e3, a2, l2)) {
        e3 = e3.substring(t2.raw.length), a2 = t2.inLink, l2 = t2.inRawBlock;
        var f2 = o2[o2.length - 1];
        f2 && t2.type === "text" && f2.type === "text" ? (f2.raw += t2.raw, f2.text += t2.text) : o2.push(t2);
      } else if (t2 = this.tokenizer.link(e3))
        e3 = e3.substring(t2.raw.length), t2.type === "link" && (t2.tokens = this.inlineTokens(t2.text, [], true, l2)), o2.push(t2);
      else if (t2 = this.tokenizer.reflink(e3, this.tokens.links)) {
        e3 = e3.substring(t2.raw.length);
        var p2 = o2[o2.length - 1];
        t2.type === "link" ? (t2.tokens = this.inlineTokens(t2.text, [], true, l2), o2.push(t2)) : p2 && t2.type === "text" && p2.type === "text" ? (p2.raw += t2.raw, p2.text += t2.text) : o2.push(t2);
      } else if (t2 = this.tokenizer.emStrong(e3, s2, i2))
        e3 = e3.substring(t2.raw.length), t2.tokens = this.inlineTokens(t2.text, [], a2, l2), o2.push(t2);
      else if (t2 = this.tokenizer.codespan(e3))
        e3 = e3.substring(t2.raw.length), o2.push(t2);
      else if (t2 = this.tokenizer.br(e3))
        e3 = e3.substring(t2.raw.length), o2.push(t2);
      else if (t2 = this.tokenizer.del(e3))
        e3 = e3.substring(t2.raw.length), t2.tokens = this.inlineTokens(t2.text, [], a2, l2), o2.push(t2);
      else if (t2 = this.tokenizer.autolink(e3, Kf))
        e3 = e3.substring(t2.raw.length), o2.push(t2);
      else if (a2 || !(t2 = this.tokenizer.url(e3, Kf))) {
        if (t2 = this.tokenizer.inlineText(e3, l2, Yf))
          e3 = e3.substring(t2.raw.length), t2.raw.slice(-1) !== "_" && (i2 = t2.raw.slice(-1)), u2 = true, (n2 = o2[o2.length - 1]) && n2.type === "text" ? (n2.raw += t2.raw, n2.text += t2.text) : o2.push(t2);
        else if (e3) {
          var h2 = "Infinite loop on byte: " + e3.charCodeAt(0);
          if (this.options.silent) {
            console.error(h2);
            break;
          }
          throw new Error(h2);
        }
      } else
        e3 = e3.substring(t2.raw.length), o2.push(t2);
    return o2;
  } }], [{ key: "rules", get: function() {
    return { block: Gf, inline: Hf };
  } }, { key: "lex", value: function(t2, n2) {
    return new e2(n2).lex(t2);
  } }, { key: "lexInline", value: function(t2, n2) {
    return new e2(n2).inlineTokens(t2);
  } }]), e2;
}();
var Wf = Qc.exports.defaults;
var Jf = kf;
var Qf = yf;
var ep = function() {
  function e2(n2) {
    t(this, e2), this.options = n2 || Wf;
  }
  return r(e2, [{ key: "code", value: function(e3, t2, n2) {
    var r2 = (t2 || "").match(/\S*/)[0];
    if (this.options.highlight) {
      var u2 = this.options.highlight(e3, r2);
      u2 != null && u2 !== e3 && (n2 = true, e3 = u2);
    }
    return e3 = e3.replace(/\n$/, "") + "\n", r2 ? '<pre><code class="' + this.options.langPrefix + Qf(r2, true) + '">' + (n2 ? e3 : Qf(e3, true)) + "</code></pre>\n" : "<pre><code>" + (n2 ? e3 : Qf(e3, true)) + "</code></pre>\n";
  } }, { key: "blockquote", value: function(e3) {
    return "<blockquote>\n" + e3 + "</blockquote>\n";
  } }, { key: "html", value: function(e3) {
    return e3;
  } }, { key: "heading", value: function(e3, t2, n2, r2) {
    return this.options.headerIds ? "<h" + t2 + ' id="' + this.options.headerPrefix + r2.slug(n2) + '">' + e3 + "</h" + t2 + ">\n" : "<h" + t2 + ">" + e3 + "</h" + t2 + ">\n";
  } }, { key: "hr", value: function() {
    return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
  } }, { key: "list", value: function(e3, t2, n2) {
    var r2 = t2 ? "ol" : "ul";
    return "<" + r2 + (t2 && n2 !== 1 ? ' start="' + n2 + '"' : "") + ">\n" + e3 + "</" + r2 + ">\n";
  } }, { key: "listitem", value: function(e3) {
    return "<li>" + e3 + "</li>\n";
  } }, { key: "checkbox", value: function(e3) {
    return "<input " + (e3 ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
  } }, { key: "paragraph", value: function(e3) {
    return "<p>" + e3 + "</p>\n";
  } }, { key: "table", value: function(e3, t2) {
    return t2 && (t2 = "<tbody>" + t2 + "</tbody>"), "<table>\n<thead>\n" + e3 + "</thead>\n" + t2 + "</table>\n";
  } }, { key: "tablerow", value: function(e3) {
    return "<tr>\n" + e3 + "</tr>\n";
  } }, { key: "tablecell", value: function(e3, t2) {
    var n2 = t2.header ? "th" : "td";
    return (t2.align ? "<" + n2 + ' align="' + t2.align + '">' : "<" + n2 + ">") + e3 + "</" + n2 + ">\n";
  } }, { key: "strong", value: function(e3) {
    return "<strong>" + e3 + "</strong>";
  } }, { key: "em", value: function(e3) {
    return "<em>" + e3 + "</em>";
  } }, { key: "codespan", value: function(e3) {
    return "<code>" + e3 + "</code>";
  } }, { key: "br", value: function() {
    return this.options.xhtml ? "<br/>" : "<br>";
  } }, { key: "del", value: function(e3) {
    return "<del>" + e3 + "</del>";
  } }, { key: "link", value: function(e3, t2, n2) {
    if ((e3 = Jf(this.options.sanitize, this.options.baseUrl, e3)) === null)
      return n2;
    var r2 = '<a href="' + Qf(e3) + '"';
    return t2 && (r2 += ' title="' + t2 + '"'), r2 += ">" + n2 + "</a>";
  } }, { key: "image", value: function(e3, t2, n2) {
    if ((e3 = Jf(this.options.sanitize, this.options.baseUrl, e3)) === null)
      return n2;
    var r2 = '<img src="' + e3 + '" alt="' + n2 + '"';
    return t2 && (r2 += ' title="' + t2 + '"'), r2 += this.options.xhtml ? "/>" : ">";
  } }, { key: "text", value: function(e3) {
    return e3;
  } }]), e2;
}();
var tp = function() {
  function e2() {
    t(this, e2);
  }
  return r(e2, [{ key: "strong", value: function(e3) {
    return e3;
  } }, { key: "em", value: function(e3) {
    return e3;
  } }, { key: "codespan", value: function(e3) {
    return e3;
  } }, { key: "del", value: function(e3) {
    return e3;
  } }, { key: "html", value: function(e3) {
    return e3;
  } }, { key: "text", value: function(e3) {
    return e3;
  } }, { key: "link", value: function(e3, t2, n2) {
    return "" + n2;
  } }, { key: "image", value: function(e3, t2, n2) {
    return "" + n2;
  } }, { key: "br", value: function() {
    return "";
  } }]), e2;
}();
var np = function() {
  function e2() {
    t(this, e2), this.seen = {};
  }
  return r(e2, [{ key: "serialize", value: function(e3) {
    return e3.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
  } }, { key: "getNextSafeSlug", value: function(e3, t2) {
    var n2 = e3, r2 = 0;
    if (this.seen.hasOwnProperty(n2)) {
      r2 = this.seen[e3];
      do {
        n2 = e3 + "-" + ++r2;
      } while (this.seen.hasOwnProperty(n2));
    }
    return t2 || (this.seen[e3] = r2, this.seen[n2] = 0), n2;
  } }, { key: "slug", value: function(e3) {
    var t2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n2 = this.serialize(e3);
    return this.getNextSafeSlug(n2, t2.dryrun);
  } }]), e2;
}();
var rp = ep;
var up = tp;
var ip = np;
var op = Qc.exports.defaults;
var ap = Ef;
var lp = Xf;
var sp = function() {
  function e2(n2) {
    t(this, e2), this.options = n2 || op, this.options.renderer = this.options.renderer || new rp(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.textRenderer = new up(), this.slugger = new ip();
  }
  return r(e2, [{ key: "parse", value: function(e3) {
    var t2, n2, r2, u2, i2, o2, a2, l2, s2, c2, f2, p2, h2, D2, g2, d2, v2, A2, y2 = !(arguments.length > 1 && arguments[1] !== void 0) || arguments[1], E2 = "", m2 = e3.length;
    for (t2 = 0; t2 < m2; t2++)
      switch ((c2 = e3[t2]).type) {
        case "space":
          continue;
        case "hr":
          E2 += this.renderer.hr();
          continue;
        case "heading":
          E2 += this.renderer.heading(this.parseInline(c2.tokens), c2.depth, ap(this.parseInline(c2.tokens, this.textRenderer)), this.slugger);
          continue;
        case "code":
          E2 += this.renderer.code(c2.text, c2.lang, c2.escaped);
          continue;
        case "table":
          for (l2 = "", a2 = "", u2 = c2.header.length, n2 = 0; n2 < u2; n2++)
            a2 += this.renderer.tablecell(this.parseInline(c2.tokens.header[n2]), { header: true, align: c2.align[n2] });
          for (l2 += this.renderer.tablerow(a2), s2 = "", u2 = c2.cells.length, n2 = 0; n2 < u2; n2++) {
            for (a2 = "", i2 = (o2 = c2.tokens.cells[n2]).length, r2 = 0; r2 < i2; r2++)
              a2 += this.renderer.tablecell(this.parseInline(o2[r2]), { header: false, align: c2.align[r2] });
            s2 += this.renderer.tablerow(a2);
          }
          E2 += this.renderer.table(l2, s2);
          continue;
        case "blockquote":
          s2 = this.parse(c2.tokens), E2 += this.renderer.blockquote(s2);
          continue;
        case "list":
          for (f2 = c2.ordered, p2 = c2.start, h2 = c2.loose, u2 = c2.items.length, s2 = "", n2 = 0; n2 < u2; n2++)
            d2 = (g2 = c2.items[n2]).checked, v2 = g2.task, D2 = "", g2.task && (A2 = this.renderer.checkbox(d2), h2 ? g2.tokens.length > 0 && g2.tokens[0].type === "text" ? (g2.tokens[0].text = A2 + " " + g2.tokens[0].text, g2.tokens[0].tokens && g2.tokens[0].tokens.length > 0 && g2.tokens[0].tokens[0].type === "text" && (g2.tokens[0].tokens[0].text = A2 + " " + g2.tokens[0].tokens[0].text)) : g2.tokens.unshift({ type: "text", text: A2 }) : D2 += A2), D2 += this.parse(g2.tokens, h2), s2 += this.renderer.listitem(D2, v2, d2);
          E2 += this.renderer.list(s2, f2, p2);
          continue;
        case "html":
          E2 += this.renderer.html(c2.text);
          continue;
        case "paragraph":
          E2 += this.renderer.paragraph(this.parseInline(c2.tokens));
          continue;
        case "text":
          for (s2 = c2.tokens ? this.parseInline(c2.tokens) : c2.text; t2 + 1 < m2 && e3[t2 + 1].type === "text"; )
            s2 += "\n" + ((c2 = e3[++t2]).tokens ? this.parseInline(c2.tokens) : c2.text);
          E2 += y2 ? this.renderer.paragraph(s2) : s2;
          continue;
        default:
          var k2 = 'Token with "' + c2.type + '" type was not found.';
          if (this.options.silent)
            return void console.error(k2);
          throw new Error(k2);
      }
    return E2;
  } }, { key: "parseInline", value: function(e3, t2) {
    t2 = t2 || this.renderer;
    var n2, r2, u2 = "", i2 = e3.length;
    for (n2 = 0; n2 < i2; n2++)
      switch ((r2 = e3[n2]).type) {
        case "escape":
          u2 += t2.text(r2.text);
          break;
        case "html":
          u2 += t2.html(r2.text);
          break;
        case "link":
          u2 += t2.link(r2.href, r2.title, this.parseInline(r2.tokens, t2));
          break;
        case "image":
          u2 += t2.image(r2.href, r2.title, r2.text);
          break;
        case "strong":
          u2 += t2.strong(this.parseInline(r2.tokens, t2));
          break;
        case "em":
          u2 += t2.em(this.parseInline(r2.tokens, t2));
          break;
        case "codespan":
          u2 += t2.codespan(r2.text);
          break;
        case "br":
          u2 += t2.br();
          break;
        case "del":
          u2 += t2.del(this.parseInline(r2.tokens, t2));
          break;
        case "text":
          u2 += t2.text(r2.text);
          break;
        default:
          var o2 = 'Token with "' + r2.type + '" type was not found.';
          if (this.options.silent)
            return void console.error(o2);
          throw new Error(o2);
      }
    return u2;
  } }], [{ key: "parse", value: function(t2, n2) {
    return new e2(n2).parse(t2);
  } }, { key: "parseInline", value: function(t2, n2) {
    return new e2(n2).parseInline(t2);
  } }]), e2;
}();
var cp = zf;
var fp = ep;
var pp = tp;
var hp = np;
var Dp = bf;
var gp = Bf;
var dp = yf;
var vp = Qc.exports.getDefaults;
var Ap = Qc.exports.changeDefaults;
var yp = Qc.exports.defaults;
function Ep(e2, t2, n2) {
  if (e2 == null)
    throw new Error("marked(): input parameter is undefined or null");
  if (typeof e2 != "string")
    throw new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e2) + ", string expected");
  if (typeof t2 == "function" && (n2 = t2, t2 = null), t2 = Dp({}, Ep.defaults, t2 || {}), gp(t2), n2) {
    var r2, u2 = t2.highlight;
    try {
      r2 = lp.lex(e2, t2);
    } catch (e3) {
      return n2(e3);
    }
    var i2 = function(e3) {
      var i3;
      if (!e3)
        try {
          i3 = sp.parse(r2, t2);
        } catch (t3) {
          e3 = t3;
        }
      return t2.highlight = u2, e3 ? n2(e3) : n2(null, i3);
    };
    if (!u2 || u2.length < 3)
      return i2();
    if (delete t2.highlight, !r2.length)
      return i2();
    var o2 = 0;
    return Ep.walkTokens(r2, function(e3) {
      e3.type === "code" && (o2++, setTimeout(function() {
        u2(e3.text, e3.lang, function(t3, n3) {
          if (t3)
            return i2(t3);
          n3 != null && n3 !== e3.text && (e3.text = n3, e3.escaped = true), --o2 === 0 && i2();
        });
      }, 0));
    }), void (o2 === 0 && i2());
  }
  try {
    var a2 = lp.lex(e2, t2);
    return t2.walkTokens && Ep.walkTokens(a2, t2.walkTokens), sp.parse(a2, t2);
  } catch (e3) {
    if (e3.message += "\nPlease report this to https://github.com/markedjs/marked.", t2.silent)
      return "<p>An error occurred:</p><pre>" + dp(e3.message + "", true) + "</pre>";
    throw e3;
  }
}
Ep.options = Ep.setOptions = function(e2) {
  return Dp(Ep.defaults, e2), Ap(Ep.defaults), Ep;
}, Ep.getDefaults = vp, Ep.defaults = yp, Ep.use = function(e2) {
  var t2 = Dp({}, e2);
  if (e2.renderer && function() {
    var n3 = Ep.defaults.renderer || new fp(), r2 = function(t3) {
      var r3 = n3[t3];
      n3[t3] = function() {
        for (var u3 = arguments.length, i2 = new Array(u3), o2 = 0; o2 < u3; o2++)
          i2[o2] = arguments[o2];
        var a2 = e2.renderer[t3].apply(n3, i2);
        return a2 === false && (a2 = r3.apply(n3, i2)), a2;
      };
    };
    for (var u2 in e2.renderer)
      r2(u2);
    t2.renderer = n3;
  }(), e2.tokenizer && function() {
    var n3 = Ep.defaults.tokenizer || new cp(), r2 = function(t3) {
      var r3 = n3[t3];
      n3[t3] = function() {
        for (var u3 = arguments.length, i2 = new Array(u3), o2 = 0; o2 < u3; o2++)
          i2[o2] = arguments[o2];
        var a2 = e2.tokenizer[t3].apply(n3, i2);
        return a2 === false && (a2 = r3.apply(n3, i2)), a2;
      };
    };
    for (var u2 in e2.tokenizer)
      r2(u2);
    t2.tokenizer = n3;
  }(), e2.walkTokens) {
    var n2 = Ep.defaults.walkTokens;
    t2.walkTokens = function(t3) {
      e2.walkTokens(t3), n2 && n2(t3);
    };
  }
  Ep.setOptions(t2);
}, Ep.walkTokens = function(e2, t2) {
  var n2, r2 = s(e2);
  try {
    for (r2.s(); !(n2 = r2.n()).done; ) {
      var u2 = n2.value;
      switch (t2(u2), u2.type) {
        case "table":
          var i2, o2 = s(u2.tokens.header);
          try {
            for (o2.s(); !(i2 = o2.n()).done; ) {
              var a2 = i2.value;
              Ep.walkTokens(a2, t2);
            }
          } catch (e3) {
            o2.e(e3);
          } finally {
            o2.f();
          }
          var l2, c2 = s(u2.tokens.cells);
          try {
            for (c2.s(); !(l2 = c2.n()).done; ) {
              var f2, p2 = s(l2.value);
              try {
                for (p2.s(); !(f2 = p2.n()).done; ) {
                  var h2 = f2.value;
                  Ep.walkTokens(h2, t2);
                }
              } catch (e3) {
                p2.e(e3);
              } finally {
                p2.f();
              }
            }
          } catch (e3) {
            c2.e(e3);
          } finally {
            c2.f();
          }
          break;
        case "list":
          Ep.walkTokens(u2.items, t2);
          break;
        default:
          u2.tokens && Ep.walkTokens(u2.tokens, t2);
      }
    }
  } catch (e3) {
    r2.e(e3);
  } finally {
    r2.f();
  }
}, Ep.parseInline = function(e2, t2) {
  if (e2 == null)
    throw new Error("marked.parseInline(): input parameter is undefined or null");
  if (typeof e2 != "string")
    throw new Error("marked.parseInline(): input parameter is of type " + Object.prototype.toString.call(e2) + ", string expected");
  t2 = Dp({}, Ep.defaults, t2 || {}), gp(t2);
  try {
    var n2 = lp.lexInline(e2, t2);
    return t2.walkTokens && Ep.walkTokens(n2, t2.walkTokens), sp.parseInline(n2, t2);
  } catch (e3) {
    if (e3.message += "\nPlease report this to https://github.com/markedjs/marked.", t2.silent)
      return "<p>An error occurred:</p><pre>" + dp(e3.message + "", true) + "</pre>";
    throw e3;
  }
}, Ep.Parser = sp, Ep.parser = sp.parse, Ep.Renderer = fp, Ep.TextRenderer = pp, Ep.Lexer = lp, Ep.lexer = lp.lex, Ep.Tokenizer = cp, Ep.Slugger = hp, Ep.parse = Ep;
var mp = Ep;
var kp = /\[([\s\d,|-]*)\]/;
var Fp = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
function markdown_esm_default() {
  var t2;
  function n2(e2) {
    var t3 = (e2.querySelector("[data-template]") || e2.querySelector("script") || e2).textContent, n3 = (t3 = t3.replace(new RegExp("__SCRIPT_END__", "g"), "<\/script>")).match(/^\n?(\s*)/)[1].length, r3 = t3.match(/^\n?(\t*)/)[1].length;
    return r3 > 0 ? t3 = t3.replace(new RegExp("\\n?\\t{" + r3 + "}", "g"), "\n") : n3 > 1 && (t3 = t3.replace(new RegExp("\\n? {" + n3 + "}", "g"), "\n")), t3;
  }
  function r2(e2) {
    for (var t3 = e2.attributes, n3 = [], r3 = 0, u2 = t3.length; r3 < u2; r3++) {
      var i2 = t3[r3].name, o3 = t3[r3].value;
      /data\-(markdown|separator|vertical|notes)/gi.test(i2) || (o3 ? n3.push(i2 + '="' + o3 + '"') : n3.push(i2));
    }
    return n3.join(" ");
  }
  function o2(e2) {
    return (e2 = e2 || {}).separator = e2.separator || "\r?\n---\r?\n", e2.notesSeparator = e2.notesSeparator || "notes?:", e2.attributes = e2.attributes || "", e2;
  }
  function a2(e2, t3) {
    t3 = o2(t3);
    var n3 = e2.split(new RegExp(t3.notesSeparator, "mgi"));
    return n3.length === 2 && (e2 = n3[0] + '<aside class="notes">' + mp(n3[1].trim()) + "</aside>"), '<script type="text/template">' + (e2 = e2.replace(/<\/script>/g, "__SCRIPT_END__")) + "<\/script>";
  }
  function l2(e2, t3) {
    t3 = o2(t3);
    for (var n3, r3, u2, i2 = new RegExp(t3.separator + (t3.verticalSeparator ? "|" + t3.verticalSeparator : ""), "mg"), l3 = new RegExp(t3.separator), s3 = 0, c3 = true, f3 = []; n3 = i2.exec(e2); )
      !(r3 = l3.test(n3[0])) && c3 && f3.push([]), u2 = e2.substring(s3, n3.index), r3 && c3 ? f3.push(u2) : f3[f3.length - 1].push(u2), s3 = i2.lastIndex, c3 = r3;
    (c3 ? f3 : f3[f3.length - 1]).push(e2.substring(s3));
    for (var p3 = "", h2 = 0, D2 = f3.length; h2 < D2; h2++)
      f3[h2] instanceof Array ? (p3 += "<section " + t3.attributes + ">", f3[h2].forEach(function(e3) {
        p3 += "<section data-markdown>" + a2(e3, t3) + "</section>";
      }), p3 += "</section>") : p3 += "<section " + t3.attributes + " data-markdown>" + a2(f3[h2], t3) + "</section>";
    return p3;
  }
  function s2(e2) {
    return new Promise(function(t3) {
      var u2 = [];
      [].slice.call(e2.querySelectorAll("section[data-markdown]:not([data-markdown-parsed])")).forEach(function(e3, t4) {
        e3.getAttribute("data-markdown").length ? u2.push(function(e4) {
          return new Promise(function(t5, n3) {
            var r3 = new XMLHttpRequest(), u3 = e4.getAttribute("data-markdown"), i2 = e4.getAttribute("data-charset");
            i2 != null && i2 != "" && r3.overrideMimeType("text/html; charset=" + i2), r3.onreadystatechange = function(e5, r4) {
              r4.readyState === 4 && (r4.status >= 200 && r4.status < 300 || r4.status === 0 ? t5(r4, u3) : n3(r4, u3));
            }.bind(this, e4, r3), r3.open("GET", u3, true);
            try {
              r3.send();
            } catch (e5) {
              console.warn("Failed to get the Markdown file " + u3 + ". Make sure that the presentation and the file are served by a HTTP server and the file can be found there. " + e5), t5(r3, u3);
            }
          });
        }(e3).then(function(t5, n3) {
          e3.outerHTML = l2(t5.responseText, { separator: e3.getAttribute("data-separator"), verticalSeparator: e3.getAttribute("data-separator-vertical"), notesSeparator: e3.getAttribute("data-separator-notes"), attributes: r2(e3) });
        }, function(t5, n3) {
          e3.outerHTML = '<section data-state="alert">ERROR: The attempt to fetch ' + n3 + " failed with HTTP status " + t5.status + ".Check your browser's JavaScript console for more details.<p>Remember that you need to serve the presentation HTML from a HTTP server.</p></section>";
        })) : e3.outerHTML = l2(n2(e3), { separator: e3.getAttribute("data-separator"), verticalSeparator: e3.getAttribute("data-separator-vertical"), notesSeparator: e3.getAttribute("data-separator-notes"), attributes: r2(e3) });
      }), Promise.all(u2).then(t3);
    });
  }
  function c2(e2, t3, n3) {
    var r3, u2, i2 = new RegExp(n3, "mg"), o3 = new RegExp('([^"= ]+?)="([^"]+?)"|(data-[^"= ]+?)(?=[" ])', "mg"), a3 = e2.nodeValue;
    if (r3 = i2.exec(a3)) {
      var l3 = r3[1];
      for (a3 = a3.substring(0, r3.index) + a3.substring(i2.lastIndex), e2.nodeValue = a3; u2 = o3.exec(l3); )
        u2[2] ? t3.setAttribute(u2[1], u2[2]) : t3.setAttribute(u2[3], "");
      return true;
    }
    return false;
  }
  function f2(e2, t3, n3, r3, u2) {
    if (t3 != null && t3.childNodes != null && t3.childNodes.length > 0)
      for (var i2 = t3, o3 = 0; o3 < t3.childNodes.length; o3++) {
        var a3 = t3.childNodes[o3];
        if (o3 > 0)
          for (var l3 = o3 - 1; l3 >= 0; ) {
            var s3 = t3.childNodes[l3];
            if (typeof s3.setAttribute == "function" && s3.tagName != "BR") {
              i2 = s3;
              break;
            }
            l3 -= 1;
          }
        var p3 = e2;
        a3.nodeName == "section" && (p3 = a3, i2 = a3), typeof a3.setAttribute != "function" && a3.nodeType != Node.COMMENT_NODE || f2(p3, a3, i2, r3, u2);
      }
    t3.nodeType == Node.COMMENT_NODE && c2(t3, n3, r3) == 0 && c2(t3, e2, u2);
  }
  function p2() {
    var e2 = t2.getRevealElement().querySelectorAll("[data-markdown]:not([data-markdown-parsed])");
    return [].slice.call(e2).forEach(function(e3) {
      e3.setAttribute("data-markdown-parsed", true);
      var t3 = e3.querySelector("aside.notes"), r3 = n2(e3);
      e3.innerHTML = mp(r3), f2(e3, e3, null, e3.getAttribute("data-element-attributes") || e3.parentNode.getAttribute("data-element-attributes") || "\\.element\\s*?(.+?)$", e3.getAttribute("data-attributes") || e3.parentNode.getAttribute("data-attributes") || "\\.slide:\\s*?(\\S.+?)$"), t3 && e3.appendChild(t3);
    }), Promise.resolve();
  }
  return { id: "markdown", init: function(n3) {
    var r3 = (t2 = n3).getConfig().markdown || {}, o3 = r3.renderer, a3 = r3.animateLists, l3 = i(r3, ["renderer", "animateLists"]);
    return o3 || ((o3 = new mp.Renderer()).code = function(e2, t3) {
      var n4 = "";
      return kp.test(t3) && (n4 = t3.match(kp)[1].trim(), n4 = 'data-line-numbers="'.concat(n4, '"'), t3 = t3.replace(kp, "").trim()), e2 = e2.replace(/([&<>'"])/g, function(e3) {
        return Fp[e3];
      }), "<pre><code ".concat(n4, ' class="').concat(t3, '">').concat(e2, "</code></pre>");
    }), a3 === true && (o3.listitem = function(e2) {
      return '<li class="fragment">'.concat(e2, "</li>");
    }), mp.setOptions(function(t3) {
      for (var n4 = 1; n4 < arguments.length; n4++) {
        var r4 = arguments[n4] != null ? arguments[n4] : {};
        n4 % 2 ? e(Object(r4), true).forEach(function(e2) {
          u(t3, e2, r4[e2]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t3, Object.getOwnPropertyDescriptors(r4)) : e(Object(r4)).forEach(function(e2) {
          Object.defineProperty(t3, e2, Object.getOwnPropertyDescriptor(r4, e2));
        });
      }
      return t3;
    }({ renderer: o3 }, l3)), s2(t2.getRevealElement()).then(p2);
  }, processSlides: s2, convertSlides: p2, slidify: l2, marked: mp };
}

// dep:reveal_js_plugin_markdown_markdown_esm_js
var reveal_js_plugin_markdown_markdown_esm_js_default = markdown_esm_default;
export {
  reveal_js_plugin_markdown_markdown_esm_js_default as default
};
//# sourceMappingURL=reveal_js_plugin_markdown_markdown_esm_js.js.map
