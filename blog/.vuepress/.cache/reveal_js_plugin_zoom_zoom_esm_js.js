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

// dep:reveal_js_plugin_zoom_zoom_esm_js
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

// ../../node_modules/reveal.js/plugin/zoom/zoom.esm.js
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
var e = { id: "zoom", init: function(e2) {
  e2.getRevealElement().addEventListener("mousedown", function(o) {
    var n = /Linux/.test(window.navigator.platform) ? "ctrl" : "alt", i = (e2.getConfig().zoomKey ? e2.getConfig().zoomKey : n) + "Key", d = e2.getConfig().zoomLevel ? e2.getConfig().zoomLevel : 2;
    o[i] && !e2.isOverview() && (o.preventDefault(), t.to({ x: o.clientX, y: o.clientY, scale: d, pan: false }));
  });
} };
var t = function() {
  var e2 = 1, o = 0, n = 0, i = -1, d = -1, s = "WebkitTransform" in document.body.style || "MozTransform" in document.body.style || "msTransform" in document.body.style || "OTransform" in document.body.style || "transform" in document.body.style;
  function r(t2, o2) {
    var n2 = y();
    if (t2.width = t2.width || 1, t2.height = t2.height || 1, t2.x -= (window.innerWidth - t2.width * o2) / 2, t2.y -= (window.innerHeight - t2.height * o2) / 2, s)
      if (o2 === 1)
        document.body.style.transform = "", document.body.style.OTransform = "", document.body.style.msTransform = "", document.body.style.MozTransform = "", document.body.style.WebkitTransform = "";
      else {
        var i2 = n2.x + "px " + n2.y + "px", d2 = "translate(" + -t2.x + "px," + -t2.y + "px) scale(" + o2 + ")";
        document.body.style.transformOrigin = i2, document.body.style.OTransformOrigin = i2, document.body.style.msTransformOrigin = i2, document.body.style.MozTransformOrigin = i2, document.body.style.WebkitTransformOrigin = i2, document.body.style.transform = d2, document.body.style.OTransform = d2, document.body.style.msTransform = d2, document.body.style.MozTransform = d2, document.body.style.WebkitTransform = d2;
      }
    else
      o2 === 1 ? (document.body.style.position = "", document.body.style.left = "", document.body.style.top = "", document.body.style.width = "", document.body.style.height = "", document.body.style.zoom = "") : (document.body.style.position = "relative", document.body.style.left = -(n2.x + t2.x) / o2 + "px", document.body.style.top = -(n2.y + t2.y) / o2 + "px", document.body.style.width = 100 * o2 + "%", document.body.style.height = 100 * o2 + "%", document.body.style.zoom = o2);
    e2 = o2, document.documentElement.classList && (e2 !== 1 ? document.documentElement.classList.add("zoomed") : document.documentElement.classList.remove("zoomed"));
  }
  function m() {
    var t2 = 0.12 * window.innerWidth, i2 = 0.12 * window.innerHeight, d2 = y();
    n < i2 ? window.scroll(d2.x, d2.y - 14 / e2 * (1 - n / i2)) : n > window.innerHeight - i2 && window.scroll(d2.x, d2.y + (1 - (window.innerHeight - n) / i2) * (14 / e2)), o < t2 ? window.scroll(d2.x - 14 / e2 * (1 - o / t2), d2.y) : o > window.innerWidth - t2 && window.scroll(d2.x + (1 - (window.innerWidth - o) / t2) * (14 / e2), d2.y);
  }
  function y() {
    return { x: window.scrollX !== void 0 ? window.scrollX : window.pageXOffset, y: window.scrollY !== void 0 ? window.scrollY : window.pageYOffset };
  }
  return s && (document.body.style.transition = "transform 0.8s ease", document.body.style.OTransition = "-o-transform 0.8s ease", document.body.style.msTransition = "-ms-transform 0.8s ease", document.body.style.MozTransition = "-moz-transform 0.8s ease", document.body.style.WebkitTransition = "-webkit-transform 0.8s ease"), document.addEventListener("keyup", function(o2) {
    e2 !== 1 && o2.keyCode === 27 && t.out();
  }), document.addEventListener("mousemove", function(t2) {
    e2 !== 1 && (o = t2.clientX, n = t2.clientY);
  }), { to: function(o2) {
    if (e2 !== 1)
      t.out();
    else {
      if (o2.x = o2.x || 0, o2.y = o2.y || 0, o2.element) {
        var n2 = o2.element.getBoundingClientRect();
        o2.x = n2.left - 20, o2.y = n2.top - 20, o2.width = n2.width + 40, o2.height = n2.height + 40;
      }
      o2.width !== void 0 && o2.height !== void 0 && (o2.scale = Math.max(Math.min(window.innerWidth / o2.width, window.innerHeight / o2.height), 1)), o2.scale > 1 && (o2.x *= o2.scale, o2.y *= o2.scale, r(o2, o2.scale), o2.pan !== false && (i = setTimeout(function() {
        d = setInterval(m, 1e3 / 60);
      }, 800)));
    }
  }, out: function() {
    clearTimeout(i), clearInterval(d), r({ x: 0, y: 0 }, 1), e2 = 1;
  }, magnify: function(e3) {
    this.to(e3);
  }, reset: function() {
    this.out();
  }, zoomLevel: function() {
    return e2;
  } };
}();
function zoom_esm_default() {
  return e;
}

// dep:reveal_js_plugin_zoom_zoom_esm_js
var reveal_js_plugin_zoom_zoom_esm_js_default = zoom_esm_default;
export {
  reveal_js_plugin_zoom_zoom_esm_js_default as default
};
/*!
 * reveal.js Zoom plugin
 */
//# sourceMappingURL=reveal_js_plugin_zoom_zoom_esm_js.js.map
