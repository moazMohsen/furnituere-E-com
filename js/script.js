import App from "../js/App.js";

// toggle btn
const depart_nav_btn = document.querySelector(".depart-nav"),
  depart_list = document.querySelector(".depart-list"),
  category_btn = document.querySelector(".category-btn"),
  category_list = document.querySelector(".category-list");

depart_nav_btn.addEventListener("click", (e) => {
  e.stopPropagation();
  depart_list.classList.toggle("show");
});
category_btn.addEventListener("click", (e) => {
  e.stopPropagation();
  category_list.classList.toggle("show");
});
document.addEventListener("click", (e) => {
  depart_list.classList.remove("show");
  category_list.classList.remove("show");
});

// show cart
const cart_btn = document.querySelector(".cart-icon"),
  cart_box = document.querySelector(".cart-box");
cart_box.addEventListener("click", (e) => {
  e.stopPropagation();
});
cart_btn.addEventListener("click", (e) => {
  e.stopPropagation();
  cart_box.classList.toggle("show");
});
document.addEventListener("click", (e) => {
  cart_box.classList.remove("show");
});

// slick
$(document).ready(function () {
  $(".happy-client-box").slick({
    centerMode: true,
    centerPadding: "0rem",
    slidesToShow: 3,
    arrows: false,
    responsive: [

      {
        breakpoint: 426,
        settings: {
          centerMode: true,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerMode: true,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 991,
        settings: {
          centerMode: true,
          slidesToShow: 2,
        },
      },

    ],

  });
});

// mega-nav-togle
document.querySelector(".mega-nav-togle").addEventListener("click", (e) => {
  e.stopPropagation();
  document.querySelector(".sub-mega-nav").classList.toggle('sub-mega-nav-active');
});
document.addEventListener("click", (e) => {
  document.querySelector(".sub-mega-nav").classList.remove('sub-mega-nav-active');
});

const root = document.querySelector("body");
const app = new App(root);
