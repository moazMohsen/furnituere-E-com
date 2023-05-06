// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var View = /*#__PURE__*/_createClass(function View(root) {
  var _this = this;
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    onCartAdd = _ref.onCartAdd;
  _classCallCheck(this, View);
  // create html
  _defineProperty(this, "create_HTML", function (dataStorge) {
    //data extraction (category)
    var category = Object.keys(dataStorge.product);

    // data extraction  (product obj) & (brand)
    var product = [];
    var brand = new Set();
    for (var i = 0; i < category.length; i++) {
      var catitem = dataStorge.product[category[i]][1].catitem;
      for (var _i = 0; _i < catitem.length; _i++) {
        product.push(catitem[_i]);
        brand.add(catitem[_i]["brand-name"]);
      }
    }

    // create midel shop nav
    _this.HTML_createShopNav_medial(category, brand);
    // create bootom shop nav
    _this.HTML_createShopNav_bootom(category);
    // create slider nav shop by department
    _this.HTML_departmentSlider(product);
    // create slider deal-of-the-day
    _this.HTML_dealSlider(product);

    // create new-arrivals slider
    _this.HTML_newArrivals(product);
    // create best-seller slider
    _this.HTML_bestSeller(product);
    // create our-client slider
    _this.HTML_ourClient(product);
    // create best-product slider
    _this.HTML_bestProduct(product);
  });
  // create midel shop nav
  _defineProperty(this, "HTML_createShopNav_medial", function (category, brand) {
    var shopNav = _this.root.querySelector(".sub-mega-nav");

    // category link medil nav
    var ul_mega_cat = document.createElement("ul");
    ul_mega_cat.classList.add("mega-nav-cat");
    var li_mega_cat = "";
    category.forEach(function (cat) {
      li_mega_cat += "<li> ".concat(cat, "</li>");
    });
    ul_mega_cat.insertAdjacentHTML("beforeend", li_mega_cat);
    shopNav.appendChild(ul_mega_cat);

    // brand link
    var ul_mega_brand = document.createElement("ul");
    ul_mega_brand.classList.add("mega-nav-brand");
    var li_mega_brand = "";
    brand.forEach(function (brand) {
      li_mega_brand += "<li>".concat(brand, "</li>");
    });
    ul_mega_brand.insertAdjacentHTML("beforeend", li_mega_brand);
    shopNav.appendChild(ul_mega_brand);
  });
  // create bootom shop nav
  _defineProperty(this, "HTML_createShopNav_bootom", function (category) {
    // category link bottom nav
    var categoryNav = _this.root.querySelector(".category-list");
    var categoryNav_li = "";
    category.forEach(function (cat) {
      categoryNav_li += " <li><a href=\"#\">".concat(cat, "</a></li>");
    });
    categoryNav.insertAdjacentHTML("beforeend", categoryNav_li);
  });
  // create slider nav shop by department
  _defineProperty(this, "HTML_departmentSlider", function (product) {
    var shopByBox = _this.root.querySelector(".shop-by-box");
    var div_contnent = "";
    product.forEach(function (pro) {
      div_contnent += "\n     <div class=\"itme flex\">\n      <div>\n        <a href=\"#\">\n          <img src=\"".concat(pro.img, "\" alt=\"\" />\n        </a>\n      </div>\n      <div>\n        <a href=\"#\">\n          <h1>").concat(pro.name, "</h1>\n        </a>\n      </div>\n     </div>\n      ");
    });
    shopByBox.innerHTML = div_contnent;

    // slick slider
    $(document).ready(function () {
      $(".shop-by-box").slick({
        centerMode: true,
        centerPadding: "0",
        slidesToShow: 5,
        nextArrow: ".right-dep",
        prevArrow: ".left-dep",
        responsive: [{
          breakpoint: 768,
          settings: {
            centerMode: true,
            slidesToShow: 1
          }
        }, {
          breakpoint: 1024,
          settings: {
            centerMode: true,
            slidesToShow: 3
          }
        }]
      });
    });
  });
  // create slider deal-of-the-day
  _defineProperty(this, "HTML_dealSlider", function (product) {
    var productBox = document.querySelector(".deal-of-the-day .broduct-box");
    var productItem = "";
    product.forEach(function (product) {
      productItem += "\n        <div class=\"broduct-item\" data-id=\"".concat(product.id, "\">\n        <div class=\"broduct-reviews\">\n          <div class=\"star\">\n            <i class=\"fa-solid fa-star\"></i>\n            <i class=\"fa-solid fa-star\"></i>\n            <i class=\"fa-solid fa-star\"></i>\n            <i class=\"fa-solid fa-star\"></i>\n            <i class=\"fa-solid fa-star\"></i>\n            <i class=\"fa-solid fa-star\"></i>\n          </div>\n          <div class=\"rate\">(").concat(product.reviews, " reviews)</div>\n        </div>\n        <div class=\"broduct-header\">\n          <a href=\"#\"> <h1>").concat(product.name, " </h1> </a>\n          <div class=\"broduct-prices\">\n            <span class=\"pefore\">").concat(product.price, "</span>\n            <span class=\"after\">").concat(product.price, "</span>\n          </div>\n        </div>\n        <div class=\"broduct-img\">\n          <a href=\"#\">\n            <img src=\"").concat(product.img, "\" alt=\"\" />\n          </a>\n          <div class=\"img-control\">\n            <i class=\"fa-solid fa-heart\"></i>\n            <i class=\"fa-solid fa-cart-shopping cartBtn\"></i>\n            <i class=\"fa-solid fa-headset\"></i>\n          </div>\n          <div class=\"img-descover\">\n            <i class=\"fa-solid fa-magnifying-glass\"></i>\n          </div>\n        </div>\n        <div class=\"broduct-info\">\n          <div class=\"progres\">\n            <span style=\"width:").concat(product.reviews, "%\"></span>\n          </div>\n          <div class=\"status\">\n            <div>\n              <h5>avliable: <span>").concat(product.avliable, "</span></h5>\n            </div>\n            <div>\n              <h5>sold: <span>").concat(product.sold, "</span></h5>\n            </div>\n          </div>\n        </div>\n      </div>\n        ");
    });
    productBox.innerHTML = productItem;
    $(document).ready(function () {
      $(".broduct-box").slick({
        centerMode: true,
        centerPadding: "0rem",
        slidesToShow: 4,
        nextArrow: ".right",
        prevArrow: ".left",
        responsive: [{
          breakpoint: 375,
          settings: {
            slidesToShow: 1
          }
        }, {
          breakpoint: 426,
          settings: {
            slidesToShow: 2
          }
        }, {
          breakpoint: 991,
          settings: {
            slidesToShow: 3
          }
        }]
      });
    });
    var cartBtn = _this.root.querySelectorAll(".cartBtn");
    _this._addProductCart(cartBtn);
  });
  // create new-arrivals slider
  _defineProperty(this, "HTML_newArrivals", function (product) {
    var newArrivalsBox = document.querySelector(".new-arrivals-img-box");
    var broductItemBoxTop = document.createElement("div");
    broductItemBoxTop.classList.add("broduct-item-box-top");
    var broductItemBoxBottom = document.createElement("div");
    broductItemBoxBottom.classList.add("broduct-item-box-bottom");
    var newArrivalsContentTop = "";
    product.slice().reverse().forEach(function (pro) {
      newArrivalsContentTop += "\n      <div class=\"broduct-item\" data-id=\"".concat(pro.id, "\">\n      <div class=\"broduct-img\">\n        <a href=\"#\">\n          <img src=\"").concat(pro.img, "\"></a>\n        <div class=\"img-offer\">\n          <span>").concat(pro.descount, "%</span>\n        </div>\n        <div class=\"img-love\">\n          <i class=\"fa-solid fa-heart\"></i>\n        </div>\n      </div>\n      <div class=\"broduct-reviews\">\n        <div class=\"star\">\n          <i class=\"fa-solid fa-star\"></i>\n          <i class=\"fa-solid fa-star\"></i>\n          <i class=\"fa-solid fa-star\"></i>\n          <i class=\"fa-solid fa-star\"></i>\n          <i class=\"fa-solid fa-star\"></i>\n          <i class=\"fa-solid fa-star\"></i>\n        </div>\n        <div class=\"rate\">(").concat(pro.reviews, "reviews)</div>\n      </div>\n      <div class=\"broduct-header\">\n        <a href=\"#\"> <h1>").concat(pro.name, "</h1> </a>\n        <div class=\"broduct-prices\">\n          <span class=\"pefore\">$").concat(Math.floor(pro.price / pro.descount * 100), "</span>\n          <span class=\"after\">$").concat(pro.price, "</span>\n        </div>\n      </div>\n      <div class=\"broduct-control\">\n      <i class=\"fa-solid fa-heart\"></i>\n      <i class=\"fa-solid fa-cart-shopping cartBtn\"></i>\n      <i class=\"fa-solid fa-headset\"></i>\n      </div>\n    </div>\n     ");
    });
    var newArrivalsContentBottom = "";
    product.forEach(function (pro) {
      newArrivalsContentBottom += "\n    <div class=\"broduct-item\" data-id=\"".concat(pro.id, "\">\n        <div class=\"broduct-img\">\n          <a href=\"#\">\n            <img src=\"").concat(pro.img, "\"></a>\n          <div class=\"img-offer\">\n            <span>").concat(pro.descount, "%</span>\n          </div>\n          <div class=\"img-love\">\n            <i class=\"fa-solid fa-heart\"></i>\n          </div>\n        </div>\n\n        <div class=\"broduct-reviews\">\n          <div class=\"star\">\n            <i class=\"fa-solid fa-star\"></i>\n            <i class=\"fa-solid fa-star\"></i>\n            <i class=\"fa-solid fa-star\"></i>\n            <i class=\"fa-solid fa-star\"></i>\n            <i class=\"fa-solid fa-star\"></i>\n            <i class=\"fa-solid fa-star\"></i>\n          </div>\n          <div class=\"rate\">(").concat(pro.reviews, " reviews)</div>\n        </div>\n\n        <div class=\"broduct-header\">\n          <a href=\"#\"> <h1>").concat(pro.name, "</h1> </a>\n          <div class=\"broduct-prices\">\n            <span class=\"pefore\">$").concat(Math.floor(pro.price / pro.descount * 100), "</span>\n            <span class=\"after\">$").concat(pro.price, "</span>\n          </div>\n        </div>\n        <div class=\"broduct-control\">\n        <i class=\"fa-solid fa-heart\"></i>\n        <i class=\"fa-solid fa-cart-shopping cartBtn\"></i>\n        <i class=\"fa-solid fa-headset\"></i>\n        </div>\n\n\n    </div>\n   \n     ");
    });
    broductItemBoxTop.insertAdjacentHTML("beforeend", newArrivalsContentTop);
    broductItemBoxBottom.insertAdjacentHTML("beforeend", newArrivalsContentBottom);
    newArrivalsBox.appendChild(broductItemBoxTop);
    newArrivalsBox.appendChild(broductItemBoxBottom);
    $(document).ready(function () {
      $(".broduct-item-box-bottom").slick({
        centerMode: true,
        centerPadding: "0rem",
        slidesToShow: 3,
        arrows: false,
        responsive: [{
          breakpoint: 768,
          settings: {
            centerMode: true,
            slidesToShow: 1
          }
        }, {
          breakpoint: 991,
          settings: {
            centerMode: true,
            slidesToShow: 2
          }
        }]
      });
      $(".broduct-item-box-top").slick({
        centerMode: true,
        centerPadding: "0rem",
        slidesToShow: 3,
        arrows: false,
        responsive: [{
          breakpoint: 768,
          settings: {
            centerMode: true,
            slidesToShow: 1
          }
        }, {
          breakpoint: 991,
          settings: {
            centerMode: true,
            slidesToShow: 2
          }
        }]
      });
    });
    var cartBtn = _this.root.querySelectorAll(".cartBtn");
    _this._addProductCart(cartBtn);
  });
  // create best-seller slider
  _defineProperty(this, "HTML_bestSeller", function (product) {
    var bestSellerBox = _this.root.querySelector(".best-seller-img-box");
    var broductItemBoxTop = document.createElement("div");
    broductItemBoxTop.classList.add("broduct-item-box-top2");
    var broductItemBoxBottom = document.createElement("div");
    broductItemBoxBottom.classList.add("broduct-item-box-bottom2");
    var bestSelleContentTop = "";
    product.slice().reverse().forEach(function (pro) {
      bestSelleContentTop += "\n        <div class=\"broduct-item\" data-id=\"".concat(product.id, "\">\n        <div class=\"broduct-img\">\n          <a href=\"#\">\n            <img src=\"").concat(pro.img, "\" alt=\"\" />\n          </a>\n          <div class=\"img-offer\">\n            <span>").concat(pro.descount, "%</span>\n          </div>\n          <div class=\"img-love\">\n            <i class=\"fa-solid fa-heart\"></i>\n          </div>\n        </div>\n        <div class=\"broduct-reviews\">\n          <div class=\"star\">\n            <i class=\"fa-solid fa-star\"></i>\n            <i class=\"fa-solid fa-star\"></i>\n            <i class=\"fa-solid fa-star\"></i>\n            <i class=\"fa-solid fa-star\"></i>\n            <i class=\"fa-solid fa-star\"></i>\n            <i class=\"fa-solid fa-star\"></i>\n          </div>\n          <div class=\"rate\">(").concat(pro.reviews, " reviews)</div>\n        </div>\n        <div class=\"broduct-header\">\n          <a href=\"#\"> <h1>").concat(pro.name, "</h1> </a>\n          <div class=\"broduct-prices\">\n            <span class=\"pefore\">$").concat(pro.price, "</span>\n            <span class=\"after\">$").concat(Math.floor(pro.price / pro.descount * 100), "</span>\n          </div>\n        </div>\n        <div class=\"broduct-control\">\n        <i class=\"fa-solid fa-heart\"></i>\n        <i class=\"fa-solid fa-cart-shopping\"></i>\n        <i class=\"fa-solid fa-headset\"></i>\n        </div>\n      </div>\n        ");
    });
    var bestSelleContentbottom = "";
    product.forEach(function (pro) {
      bestSelleContentbottom += "\n      <div class=\"broduct-item\" data-id=\"".concat(product.id, "\">\n      <div class=\"broduct-img\">\n        <a href=\"#\">\n          <img src=\"").concat(pro.img, "\" alt=\"\" />\n        </a>\n        <div class=\"img-offer\">\n          <span>").concat(pro.descount, "%</span>\n        </div>\n        <div class=\"img-love\">\n          <i class=\"fa-solid fa-heart\"></i>\n        </div>\n      </div>\n      <div class=\"broduct-reviews\">\n        <div class=\"star\">\n          <i class=\"fa-solid fa-star\"></i>\n          <i class=\"fa-solid fa-star\"></i>\n          <i class=\"fa-solid fa-star\"></i>\n          <i class=\"fa-solid fa-star\"></i>\n          <i class=\"fa-solid fa-star\"></i>\n          <i class=\"fa-solid fa-star\"></i>\n        </div>\n        <div class=\"rate\">(").concat(pro.reviews, " reviews)</div>\n      </div>\n      <div class=\"broduct-header\">\n        <a href=\"#\"> <h1>").concat(pro.name, "</h1> </a>\n        <div class=\"broduct-prices\">\n          <span class=\"pefore\">$").concat(pro.price, "</span>\n          <span class=\"after\">$").concat(Math.floor(pro.price / pro.descount * 100), "</span>\n        </div>\n      </div>\n      <div class=\"broduct-control\">\n      <i class=\"fa-solid fa-heart\"></i>\n      <i class=\"fa-solid fa-cart-shopping\"></i>\n      <i class=\"fa-solid fa-headset\"></i>\n      </div>\n    </div>\n      ");
    });
    broductItemBoxTop.insertAdjacentHTML("beforeend", bestSelleContentTop);
    broductItemBoxBottom.insertAdjacentHTML("beforeend", bestSelleContentbottom);
    bestSellerBox.appendChild(broductItemBoxTop);
    bestSellerBox.appendChild(broductItemBoxBottom);
    $(document).ready(function () {
      $(".broduct-item-box-bottom2").slick({
        centerMode: true,
        centerPadding: "0rem",
        slidesToShow: 3,
        arrows: false,
        responsive: [{
          breakpoint: 426,
          settings: {
            centerMode: true,
            slidesToShow: 1
          }
        }, {
          breakpoint: 768,
          settings: {
            centerMode: true,
            slidesToShow: 2
          }
        }, {
          breakpoint: 991,
          settings: {
            centerMode: true,
            slidesToShow: 2
          }
        }]
      });
      $(".broduct-item-box-top2").slick({
        centerMode: true,
        centerPadding: "0rem",
        slidesToShow: 3,
        arrows: false,
        responsive: [{
          breakpoint: 426,
          settings: {
            centerMode: true,
            slidesToShow: 1
          }
        }, {
          breakpoint: 768,
          settings: {
            centerMode: true,
            slidesToShow: 2
          }
        }, {
          breakpoint: 991,
          settings: {
            centerMode: true,
            slidesToShow: 2
          }
        }]
      });
    });
  });
  // create our-client slider
  _defineProperty(this, "HTML_ourClient", function (product) {
    var ourClinent = _this.root.querySelector(".our-client");
    var ourClinentContent = "";
    product.forEach(function (product) {
      ourClinentContent += "\n   <div class=\"clinent-logo\" >\n   <img src=\"".concat(product["brand-img"], "\" alt=\"\" />\n    </div>");
    });
    ourClinent.innerHTML = ourClinentContent;
    $(".our-client").slick({
      centerMode: true,
      centerPadding: "0rem",
      slidesToShow: 6,
      arrows: false,
      responsive: [{
        breakpoint: 768,
        settings: {
          centerMode: true,
          slidesToShow: 2
        }
      }, {
        breakpoint: 480,
        settings: {
          centerMode: true,
          slidesToShow: 2
        }
      }]
    });
  });
  // create best-product slider
  _defineProperty(this, "HTML_bestProduct", function (product) {
    var bestBroductBox = _this.root.querySelector(".best-broduct-box");
    var broductItemBoxTop = document.createElement("div");
    broductItemBoxTop.classList.add("broduct-item-box-top3");
    var broductItemBoxBottom = document.createElement("div");
    broductItemBoxBottom.classList.add("broduct-item-box-bottom3");
    var bestBroductContentTop = "";
    product.forEach(function (pro) {
      bestBroductContentTop += "\n      <div class=\"broduct\" data-id=\"".concat(product.id, "\">\n            <div class=\"broduct-img\">\n              <img src=\"").concat(pro.img, "\" alt=\"\" />\n            </div>\n            <div class=\"broduct-contnet\">\n              <div class=\"broduct-reviews\">\n                <div class=\"star\">\n                  <i class=\"fa-solid fa-star\"></i>\n                  <i class=\"fa-solid fa-star\"></i>\n                  <i class=\"fa-solid fa-star\"></i>\n                  <i class=\"fa-solid fa-star\"></i>\n                  <i class=\"fa-solid fa-star\"></i>\n                  <i class=\"fa-solid fa-star\"></i>\n                </div>\n                <div class=\"rate\">(").concat(pro.reviews, " reviews)</div>\n              </div>\n              <div class=\"broduct-header\">\n                <a href=\"#\"> <h1>").concat(pro.name, " </h1> </a>\n                <div class=\"broduct-prices\">\n                  <span>").concat(pro.price, "</span>\n                </div>\n              </div>\n              <div class=\"broduct-control\">\n                <i class=\"fa-solid fa-arrow-right-arrow-left\"></i>\n                <i class=\"fa-solid fa-cart-shopping\"></i>\n              </div>\n            </div>\n          </div>\n      ");
    });
    var bestBroductContentBottom = "";
    product.slice().reverse().forEach(function (pro) {
      bestBroductContentBottom += "\n      <div class=\"broduct\" data-id=\"".concat(product.id, "\">\n            <div class=\"broduct-img\">\n              <img src=\"").concat(pro.img, "\" alt=\"\" />\n            </div>\n            <div class=\"broduct-contnet\">\n              <div class=\"broduct-reviews\">\n                <div class=\"star\">\n                  <i class=\"fa-solid fa-star\"></i>\n                  <i class=\"fa-solid fa-star\"></i>\n                  <i class=\"fa-solid fa-star\"></i>\n                  <i class=\"fa-solid fa-star\"></i>\n                  <i class=\"fa-solid fa-star\"></i>\n                  <i class=\"fa-solid fa-star\"></i>\n                </div>\n                <div class=\"rate\">(").concat(pro.reviews, " reviews)</div>\n              </div>\n              <div class=\"broduct-header\">\n                <a href=\"#\"> <h1>").concat(pro.name, " </h1> </a>\n                <div class=\"broduct-prices\">\n                  <span>").concat(pro.price, "</span>\n                </div>\n              </div>\n              <div class=\"broduct-control\">\n                <i class=\"fa-solid fa-arrow-right-arrow-left\"></i>\n                <i class=\"fa-solid fa-cart-shopping\"></i>\n              </div>\n            </div>\n          </div>\n      ");
    });
    broductItemBoxTop.insertAdjacentHTML("beforeend", bestBroductContentTop);
    broductItemBoxBottom.insertAdjacentHTML("beforeend", bestBroductContentBottom);
    bestBroductBox.appendChild(broductItemBoxTop);
    bestBroductBox.appendChild(broductItemBoxBottom);
    $(document).ready(function () {
      $(".broduct-item-box-bottom3").slick({
        centerMode: true,
        centerPadding: "0rem",
        slidesToShow: 3,
        arrows: false,
        responsive: [{
          breakpoint: 426,
          settings: {
            centerMode: true,
            slidesToShow: 1
          }
        }, {
          breakpoint: 768,
          settings: {
            centerMode: true,
            slidesToShow: 2
          }
        }, {
          breakpoint: 991,
          settings: {
            centerMode: true,
            slidesToShow: 2
          }
        }]
      });
      $(".broduct-item-box-top3").slick({
        centerMode: true,
        centerPadding: "0rem",
        slidesToShow: 3,
        arrows: false,
        responsive: [{
          breakpoint: 426,
          settings: {
            centerMode: true,
            slidesToShow: 1
          }
        }, {
          breakpoint: 768,
          settings: {
            centerMode: true,
            slidesToShow: 2
          }
        }, {
          breakpoint: 991,
          settings: {
            centerMode: true,
            slidesToShow: 2
          }
        }]
      });
    });
  });
  //create cart html
  _defineProperty(this, "HTML_cartProduct", function (products) {
    var cartBox = _this.root.querySelector(".cart-box"),
      cartCount = _this.root.querySelector(".cart-count");
    var cartContent = "";
    if (products.length > 0) {
      cartBox.innerHTML = "";
    }
    products.forEach(function (pro) {
      cartContent += "\n        <div class=\"cart-content\">\n        <div class=\"cart-img\">\n          <img src=\"".concat(pro[0].img, "\" alt=\"\" />\n        </div>\n        <div class=\"cart-info\">\n          <h1>").concat(pro[0].name, "</h1>\n          <span>$").concat(pro[0].price, "</span>\n        </div>\n        <div class=\"cart-delet\">\n          <i class=\"fa-solid fa-x\"></i>\n        </div>\n        </div>\n        ");
    });
    cartCount.innerText = products.length;
    cartBox.insertAdjacentHTML("beforeend", cartContent);
  });
  _defineProperty(this, "_addProductCart", function (cartBtn) {
    cartBtn.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        _this.onCartAdd(btn.closest(".broduct-item").dataset.id);
        _this._changeCartIcon(btn);
      });
    });
  });
  _defineProperty(this, "_changeCartIcon", function (btn) {
    btn.classList.remove("fa-cart-shopping");
    btn.classList.add("fa-check");
    btn.style.pointerEvents = " none";
  });
  this.root = root;
  this.onCartAdd = onCartAdd;
});
exports.default = View;
},{}],"js/DataStorge.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var DataStorge = /*#__PURE__*/function () {
  function DataStorge() {
    _classCallCheck(this, DataStorge);
  }
  _createClass(DataStorge, null, [{
    key: "JSON_GetData",
    value: // get data from json file
    function () {
      var _JSON_GetData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var respon, data;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetch("data.json");
            case 2:
              respon = _context.sent;
              _context.next = 5;
              return respon.json();
            case 5:
              data = _context.sent;
              return _context.abrupt("return", data);
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function JSON_GetData() {
        return _JSON_GetData.apply(this, arguments);
      }
      return JSON_GetData;
    }() // 1-  get data from lockal storege
  }, {
    key: "getData",
    value: function getData() {
      var products = JSON.parse(localStorage.getItem("products") || "[]");
      return products;
    }

    // 2- if user by somting save  it to localStorage (cart)
    // add data to cart
  }, {
    key: "saveData",
    value: function saveData(product) {
      var products = this.getData();
      products.push(product);
      localStorage.setItem("products", JSON.stringify(products));
    }

    // 3- if user remove somting delet it from localstorge
    // remove from cart
  }, {
    key: "removeData",
    value: function removeData() {}
  }]);
  return DataStorge;
}();
exports.default = DataStorge;
},{}],"js/App.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _view = _interopRequireDefault(require("../js/view.js"));
var _DataStorge = _interopRequireDefault(require("../js/DataStorge.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var App = /*#__PURE__*/function () {
  function App(root) {
    var _this = this;
    _classCallCheck(this, App);
    // get data from api
    _defineProperty(this, "getProduct_data", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var respons;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _DataStorge.default.JSON_GetData();
          case 2:
            respons = _context.sent;
            _this.setData(respons);
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    })));
    // send data from api to function to create product html
    _defineProperty(this, "setData", function (respons) {
      _this.product = respons;
      _this.view.create_HTML(_this.product);
    });
    // data extraction  (product obj)
    _defineProperty(this, "_dataExtraction", function () {
      //data extraction (category)
      var category = Object.keys(_this.product.product);

      // data extraction  (product obj)
      var product = [];
      for (var i = 0; i < category.length; i++) {
        var catitem = _this.product.product[category[i]][1].catitem;
        for (var _i = 0; _i < catitem.length; _i++) {
          product.push(catitem[_i]);
        }
      }
      return product;
    });
    _defineProperty(this, "_handeler", function () {
      return {
        onCartAdd: function onCartAdd(id) {
          // console.log(id);
          var productCart = _this._dataExtraction().filter(function (product) {
            return product.id === id;
          });
          _DataStorge.default.saveData(productCart);
          _this._refreshCart();
        }
      };
    });
    this.root = root;
    this.view = new _view.default(root, this._handeler());
    this.getProduct_data();
    // this._refreshCart();
  }
  _createClass(App, [{
    key: "_refreshCart",
    value:
    // send data from localstorge to view to create cart html
    function _refreshCart() {
      var products = _DataStorge.default.getData();
      this.view.HTML_cartProduct(products);
    }
  }]);
  return App;
}();
exports.default = App;
},{"../js/view.js":"js/view.js","../js/DataStorge.js":"js/DataStorge.js"}],"js/script.js":[function(require,module,exports) {
"use strict";

var _App = _interopRequireDefault(require("../js/App.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// toggle btn
var depart_nav_btn = document.querySelector(".depart-nav"),
  depart_list = document.querySelector(".depart-list"),
  category_btn = document.querySelector(".category-btn"),
  category_list = document.querySelector(".category-list");
depart_nav_btn.addEventListener("click", function (e) {
  e.stopPropagation();
  depart_list.classList.toggle("show");
});
category_btn.addEventListener("click", function (e) {
  e.stopPropagation();
  category_list.classList.toggle("show");
});
document.addEventListener("click", function (e) {
  depart_list.classList.remove("show");
  category_list.classList.remove("show");
});

// show cart
var cart_btn = document.querySelector(".cart-icon"),
  cart_box = document.querySelector(".cart-box");
cart_box.addEventListener("click", function (e) {
  e.stopPropagation();
});
cart_btn.addEventListener("click", function (e) {
  e.stopPropagation();
  cart_box.classList.toggle("show");
});
document.addEventListener("click", function (e) {
  cart_box.classList.remove("show");
});

// slick
$(document).ready(function () {
  $(".happy-client-box").slick({
    centerMode: true,
    centerPadding: "0rem",
    slidesToShow: 3,
    arrows: false,
    responsive: [{
      breakpoint: 426,
      settings: {
        centerMode: true,
        slidesToShow: 1
      }
    }, {
      breakpoint: 768,
      settings: {
        centerMode: true,
        slidesToShow: 2
      }
    }, {
      breakpoint: 991,
      settings: {
        centerMode: true,
        slidesToShow: 2
      }
    }]
  });
});

// mega-nav-togle
document.querySelector(".mega-nav-togle").addEventListener("click", function (e) {
  e.stopPropagation();
  document.querySelector(".sub-mega-nav").classList.toggle('sub-mega-nav-active');
});
document.addEventListener("click", function (e) {
  document.querySelector(".sub-mega-nav").classList.remove('sub-mega-nav-active');
});
var root = document.querySelector("body");
var app = new _App.default(root);
},{"../js/App.js":"js/App.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63003" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/script.js"], null)
//# sourceMappingURL=/script.d573be0b.js.map