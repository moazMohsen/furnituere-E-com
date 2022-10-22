export default class View {
  constructor(root, { onCartAdd } = {}) {
    this.root = root;
    this.onCartAdd = onCartAdd;
  }

  // create html
  create_HTML = (dataStorge) => {
    //data extraction (category)
    const category = Object.keys(dataStorge.product);

    // data extraction  (product obj) & (brand)
    let product = [];
    let brand = new Set();
    for (let i = 0; i < category.length; i++) {
      let catitem = dataStorge.product[category[i]][1].catitem;
      for (let i = 0; i < catitem.length; i++) {
        product.push(catitem[i]);
        brand.add(catitem[i]["brand-name"]);
      }
    }

    // create midel shop nav
    this.HTML_createShopNav_medial(category, brand);
    // create bootom shop nav
    this.HTML_createShopNav_bootom(category);
    // create slider nav shop by department
    this.HTML_departmentSlider(product);
    // create slider deal-of-the-day
    this.HTML_dealSlider(product);

    // create new-arrivals slider
    this.HTML_newArrivals(product);
    // create best-seller slider
    this.HTML_bestSeller(product);
    // create our-client slider
    this.HTML_ourClient(product);
    // create best-product slider
    this.HTML_bestProduct(product);
  };
  // create midel shop nav
  HTML_createShopNav_medial = (category, brand) => {
    let shopNav = this.root.querySelector(".sub-mega-nav");

    // category link medil nav
    let ul_mega_cat = document.createElement("ul");
    ul_mega_cat.classList.add("mega-nav-cat");
    let li_mega_cat = "";

    category.forEach((cat) => {
      li_mega_cat += `<li> ${cat}</li>`;
    });
    ul_mega_cat.insertAdjacentHTML("beforeend", li_mega_cat);
    shopNav.appendChild(ul_mega_cat);

    // brand link
    let ul_mega_brand = document.createElement("ul");
    ul_mega_brand.classList.add("mega-nav-brand");
    let li_mega_brand = "";

    brand.forEach((brand) => {
      li_mega_brand += `<li>${brand}</li>`;
    });
    ul_mega_brand.insertAdjacentHTML("beforeend", li_mega_brand);
    shopNav.appendChild(ul_mega_brand);
  };
  // create bootom shop nav
  HTML_createShopNav_bootom = (category) => {
    // category link bottom nav
    let categoryNav = this.root.querySelector(".category-list");

    let categoryNav_li = "";
    category.forEach((cat) => {
      categoryNav_li += ` <li><a href="#">${cat}</a></li>`;
    });
    categoryNav.insertAdjacentHTML("beforeend", categoryNav_li);
  };

  // create slider nav shop by department
  HTML_departmentSlider = (product) => {
    let shopByBox = this.root.querySelector(".shop-by-box");

    let div_contnent = "";
    product.forEach((pro) => {
      div_contnent += `
     <div class="itme flex">
      <div>
        <a href="#">
          <img src="${pro.img}" alt="" />
        </a>
      </div>
      <div>
        <a href="#">
          <h1>${pro.name}</h1>
        </a>
      </div>
     </div>
      `;
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

        responsive: [
          {
            breakpoint: 768,
            settings: {
              centerMode: true,

              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              centerMode: true,

              slidesToShow: 1,
            },
          },
        ],
      });
    });
  };
  // create slider deal-of-the-day
  HTML_dealSlider = (product) => {
    let productBox = document.querySelector(".deal-of-the-day .broduct-box");
    let productItem = "";
    product.forEach((product) => {
      productItem += `
        <div class="broduct-item" data-id="${product.id}">
        <div class="broduct-reviews">
          <div class="star">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <div class="rate">(${product.reviews} reviews)</div>
        </div>
        <div class="broduct-header">
          <a href="#"> <h1>${product.name} </h1> </a>
          <div class="broduct-prices">
            <span class="pefore">${product.price}</span>
            <span class="after">${product.price}</span>
          </div>
        </div>
        <div class="broduct-img">
          <a href="#">
            <img src="${product.img}" alt="" />
          </a>
          <div class="img-control">
            <i class="fa-solid fa-heart"></i>
            <i class="fa-solid fa-cart-shopping cartBtn"></i>
            <i class="fa-solid fa-headset"></i>
          </div>
          <div class="img-descover">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <div class="broduct-info">
          <div class="progres">
            <span style="width:${product.reviews}%"></span>
          </div>
          <div class="status">
            <div>
              <h5>avliable: <span>${product.avliable}</span></h5>
            </div>
            <div>
              <h5>sold: <span>${product.sold}</span></h5>
            </div>
          </div>
        </div>
      </div>
        `;
    });
    productBox.innerHTML = productItem;

    $(document).ready(function () {
      $(".broduct-box").slick({
        centerMode: true,
        centerPadding: "0rem",
        slidesToShow: 4,
        nextArrow: ".right",
        prevArrow: ".left",

        responsive: [
          {
            breakpoint: 768,
            settings: {
              centerMode: true,

              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              centerMode: true,

              slidesToShow: 1,
            },
          },
        ],
      });
    });

    let cartBtn = this.root.querySelectorAll(".cartBtn");
    this._addProductCart(cartBtn);
  };

  // create new-arrivals slider
  HTML_newArrivals = (product) => {
    let newArrivalsBox = document.querySelector(".new-arrivals-img-box");
    let broductItemBoxTop = document.createElement("div");
    broductItemBoxTop.classList.add("broduct-item-box-top");
    let broductItemBoxBottom = document.createElement("div");
    broductItemBoxBottom.classList.add("broduct-item-box-bottom");
    let newArrivalsContentTop = "";
    product
      .slice()
      .reverse()
      .forEach((pro) => {
        newArrivalsContentTop += `
      <div class="broduct-item" data-id="${pro.id}">
      <div class="broduct-img">
        <a href="#">
          <img src="${pro.img}"></a>
        <div class="img-offer">
          <span>${pro.descount}%</span>
        </div>
        <div class="img-love">
          <i class="fa-solid fa-heart"></i>
        </div>
      </div>
      <div class="broduct-reviews">
        <div class="star">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="rate">(${pro.reviews}reviews)</div>
      </div>
      <div class="broduct-header">
        <a href="#"> <h1>${pro.name}</h1> </a>
        <div class="broduct-prices">
          <span class="pefore">$${Math.floor(
            (pro.price / pro.descount) * 100
          )}</span>
          <span class="after">$${pro.price}</span>
        </div>
      </div>
      <div class="broduct-control">
      <i class="fa-solid fa-heart"></i>
      <i class="fa-solid fa-cart-shopping cartBtn"></i>
      <i class="fa-solid fa-headset"></i>
      </div>
    </div>
     `;
      });
    let newArrivalsContentBottom = "";
    product.forEach((pro) => {
      newArrivalsContentBottom += `
    <div class="broduct-item" data-id="${pro.id}">
        <div class="broduct-img">
          <a href="#">
            <img src="${pro.img}"></a>
          <div class="img-offer">
            <span>${pro.descount}%</span>
          </div>
          <div class="img-love">
            <i class="fa-solid fa-heart"></i>
          </div>
        </div>

        <div class="broduct-reviews">
          <div class="star">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <div class="rate">(${pro.reviews} reviews)</div>
        </div>

        <div class="broduct-header">
          <a href="#"> <h1>${pro.name}</h1> </a>
          <div class="broduct-prices">
            <span class="pefore">$${Math.floor(
              (pro.price / pro.descount) * 100
            )}</span>
            <span class="after">$${pro.price}</span>
          </div>
        </div>
        <div class="broduct-control">
        <i class="fa-solid fa-heart"></i>
        <i class="fa-solid fa-cart-shopping cartBtn"></i>
        <i class="fa-solid fa-headset"></i>
        </div>


    </div>
   
     `;
    });
    broductItemBoxTop.insertAdjacentHTML("beforeend", newArrivalsContentTop);
    broductItemBoxBottom.insertAdjacentHTML(
      "beforeend",
      newArrivalsContentBottom
    );
    newArrivalsBox.appendChild(broductItemBoxTop);
    newArrivalsBox.appendChild(broductItemBoxBottom);
    $(document).ready(function () {
      $(".broduct-item-box-bottom").slick({
        centerMode: true,
        centerPadding: "0rem",
        slidesToShow: 3,
        arrows: false,

        responsive: [
          {
            breakpoint: 768,
            settings: {
              centerMode: true,

              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              centerMode: true,

              slidesToShow: 1,
            },
          },
        ],
      });
      $(".broduct-item-box-top").slick({
        centerMode: true,
        centerPadding: "0rem",
        slidesToShow: 3,
        arrows: false,

        responsive: [
          {
            breakpoint: 768,
            settings: {
              centerMode: true,

              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              centerMode: true,

              slidesToShow: 1,
            },
          },
        ],
      });
    });

    let cartBtn = this.root.querySelectorAll(".cartBtn");
    this._addProductCart(cartBtn);
  };
  // create best-seller slider
  HTML_bestSeller = (product) => {
    let bestSellerBox = this.root.querySelector(".best-seller-img-box");
    let broductItemBoxTop = document.createElement("div");
    broductItemBoxTop.classList.add("broduct-item-box-top2");
    let broductItemBoxBottom = document.createElement("div");
    broductItemBoxBottom.classList.add("broduct-item-box-bottom2");
    let bestSelleContentTop = "";
    product
      .slice()
      .reverse()
      .forEach((pro) => {
        bestSelleContentTop += `
        <div class="broduct-item" data-id="${product.id}">
        <div class="broduct-img">
          <a href="#">
            <img src="${pro.img}" alt="" />
          </a>
          <div class="img-offer">
            <span>${pro.descount}%</span>
          </div>
          <div class="img-love">
            <i class="fa-solid fa-heart"></i>
          </div>
        </div>
        <div class="broduct-reviews">
          <div class="star">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <div class="rate">(${pro.reviews} reviews)</div>
        </div>
        <div class="broduct-header">
          <a href="#"> <h1>${pro.name}</h1> </a>
          <div class="broduct-prices">
            <span class="pefore">$${pro.price}</span>
            <span class="after">$${Math.floor(
              (pro.price / pro.descount) * 100
            )}</span>
          </div>
        </div>
        <div class="broduct-control">
        <i class="fa-solid fa-heart"></i>
        <i class="fa-solid fa-cart-shopping"></i>
        <i class="fa-solid fa-headset"></i>
        </div>
      </div>
        `;
      });

    let bestSelleContentbottom = "";
    product.forEach((pro) => {
      bestSelleContentbottom += `
      <div class="broduct-item" data-id="${product.id}">
      <div class="broduct-img">
        <a href="#">
          <img src="${pro.img}" alt="" />
        </a>
        <div class="img-offer">
          <span>${pro.descount}%</span>
        </div>
        <div class="img-love">
          <i class="fa-solid fa-heart"></i>
        </div>
      </div>
      <div class="broduct-reviews">
        <div class="star">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="rate">(${pro.reviews} reviews)</div>
      </div>
      <div class="broduct-header">
        <a href="#"> <h1>${pro.name}</h1> </a>
        <div class="broduct-prices">
          <span class="pefore">$${pro.price}</span>
          <span class="after">$${Math.floor(
            (pro.price / pro.descount) * 100
          )}</span>
        </div>
      </div>
      <div class="broduct-control">
      <i class="fa-solid fa-heart"></i>
      <i class="fa-solid fa-cart-shopping"></i>
      <i class="fa-solid fa-headset"></i>
      </div>
    </div>
      `;
    });
    broductItemBoxTop.insertAdjacentHTML("beforeend", bestSelleContentTop);
    broductItemBoxBottom.insertAdjacentHTML(
      "beforeend",
      bestSelleContentbottom
    );
    bestSellerBox.appendChild(broductItemBoxTop);
    bestSellerBox.appendChild(broductItemBoxBottom);
    $(document).ready(function () {
      $(".broduct-item-box-bottom2").slick({
        centerMode: true,
        centerPadding: "0rem",
        slidesToShow: 3,
        arrows: false,

        responsive: [
          {
            breakpoint: 768,
            settings: {
              centerMode: true,

              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              centerMode: true,

              slidesToShow: 1,
            },
          },
        ],
      });
      $(".broduct-item-box-top2").slick({
        centerMode: true,
        centerPadding: "0rem",
        slidesToShow: 3,
        arrows: false,

        responsive: [
          {
            breakpoint: 768,
            settings: {
              centerMode: true,

              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              centerMode: true,

              slidesToShow: 1,
            },
          },
        ],
      });
    });
  };
  // create our-client slider
  HTML_ourClient = (product) => {
    let ourClinent = this.root.querySelector(".our-client");
    let ourClinentContent = "";
    product.forEach((product) => {
      ourClinentContent += `
   <div class="clinent-logo" >
   <img src="${product["brand-img"]}" alt="" />
    </div>`;
    });
    ourClinent.innerHTML = ourClinentContent;
    $(".our-client").slick({
      centerMode: true,
      centerPadding: "0rem",
      slidesToShow: 5,
      arrows: false,

      responsive: [
        {
          breakpoint: 768,
          settings: {
            centerMode: true,

            slidesToShow: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            centerMode: true,

            slidesToShow: 1,
          },
        },
      ],
    });
  };
  // create best-product slider
  HTML_bestProduct = (product) => {
    let bestBroductBox = this.root.querySelector(".best-broduct-box");
    let broductItemBoxTop = document.createElement("div");
    broductItemBoxTop.classList.add("broduct-item-box-top3");
    let broductItemBoxBottom = document.createElement("div");
    broductItemBoxBottom.classList.add("broduct-item-box-bottom3");
    let bestBroductContentTop = "";
    product.forEach((pro) => {
      bestBroductContentTop += `
      <div class="broduct" data-id="${product.id}">
            <div class="broduct-img">
              <img src="${pro.img}" alt="" />
            </div>
            <div class="broduct-contnet">
              <div class="broduct-reviews">
                <div class="star">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </div>
                <div class="rate">(${pro.reviews} reviews)</div>
              </div>
              <div class="broduct-header">
                <a href="#"> <h1>${pro.name} </h1> </a>
                <div class="broduct-prices">
                  <span>${pro.price}</span>
                </div>
              </div>
              <div class="broduct-control">
                <i class="fa-solid fa-arrow-right-arrow-left"></i>
                <i class="fa-solid fa-cart-shopping"></i>
              </div>
            </div>
          </div>
      `;
    });

    let bestBroductContentBottom = "";
    product
      .slice()
      .reverse()
      .forEach((pro) => {
        bestBroductContentBottom += `
      <div class="broduct" data-id="${product.id}">
            <div class="broduct-img">
              <img src="${pro.img}" alt="" />
            </div>
            <div class="broduct-contnet">
              <div class="broduct-reviews">
                <div class="star">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </div>
                <div class="rate">(${pro.reviews} reviews)</div>
              </div>
              <div class="broduct-header">
                <a href="#"> <h1>${pro.name} </h1> </a>
                <div class="broduct-prices">
                  <span>${pro.price}</span>
                </div>
              </div>
              <div class="broduct-control">
                <i class="fa-solid fa-arrow-right-arrow-left"></i>
                <i class="fa-solid fa-cart-shopping"></i>
              </div>
            </div>
          </div>
      `;
      });

    broductItemBoxTop.insertAdjacentHTML("beforeend", bestBroductContentTop);
    broductItemBoxBottom.insertAdjacentHTML(
      "beforeend",
      bestBroductContentBottom
    );
    bestBroductBox.appendChild(broductItemBoxTop);
    bestBroductBox.appendChild(broductItemBoxBottom);

    $(document).ready(function () {
      $(".broduct-item-box-bottom3").slick({
        centerMode: true,
        centerPadding: "0rem",
        slidesToShow: 3,
        arrows: false,

        responsive: [
          {
            breakpoint: 768,
            settings: {
              centerMode: true,

              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              centerMode: true,

              slidesToShow: 1,
            },
          },
        ],
      });
      $(".broduct-item-box-top3").slick({
        centerMode: true,
        centerPadding: "0rem",
        slidesToShow: 3,
        arrows: false,

        responsive: [
          {
            breakpoint: 768,
            settings: {
              centerMode: true,

              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              centerMode: true,

              slidesToShow: 1,
            },
          },
        ],
      });
    });
  };

  //create cart html
  HTML_cartProduct = (products) => {
    let cartBox = this.root.querySelector(".cart-box"),
      cartCount = this.root.querySelector(".cart-count");

    let cartContent = "";

    if (products.length > 0) {
      cartBox.innerHTML = "";
    }
    products.forEach((pro) => {
      cartContent += `
        <div class="cart-content">
        <div class="cart-img">
          <img src="${pro[0].img}" alt="" />
        </div>
        <div class="cart-info">
          <h1>${pro[0].name}</h1>
          <span>$${pro[0].price}</span>
        </div>
        <div class="cart-delet">
          <i class="fa-solid fa-x"></i>
        </div>
        </div>
        `;
    });
    cartCount.innerText = products.length;
    cartBox.insertAdjacentHTML("beforeend", cartContent);
  };

  _addProductCart = (cartBtn) => {
    cartBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.onCartAdd(btn.closest(".broduct-item").dataset.id);
        this._changeCartIcon(btn);
      });
    });
  };
  _changeCartIcon = (btn) => {
    btn.classList.remove("fa-cart-shopping");
    btn.classList.add("fa-check");
    btn.style.pointerEvents = " none";
  };
}
