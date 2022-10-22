import View from "../js/view.js";
import DataStorge from "../js/DataStorge.js";

export default class App {
  constructor(root) {
    this.root = root;

    this.view = new View(root, this._handeler());

    this.getProduct_data();
    // this._refreshCart();
  }

  // get data from api
  getProduct_data = async () => {
    // receive data from data storge json file
    const respons = await DataStorge.JSON_GetData();
    this.setData(respons);
  };

  // send data from api to function to create product html
  setData = (respons) => {
    this.product = respons;
    this.view.create_HTML(this.product);
  };

  // data extraction  (product obj)
  _dataExtraction = () => {
    //data extraction (category)
    const category = Object.keys(this.product.product);

    // data extraction  (product obj)
    let product = [];

    for (let i = 0; i < category.length; i++) {
      let catitem = this.product.product[category[i]][1].catitem;
      for (let i = 0; i < catitem.length; i++) {
        product.push(catitem[i]);
      }
    }
    return product;
  };

  // send data from localstorge to view to create cart html
  _refreshCart() {
    let products = DataStorge.getData();
    this.view.HTML_cartProduct(products);
  }

  _handeler = () => {
    return {
      onCartAdd: (id) => {
        // console.log(id);
        let productCart = this._dataExtraction().filter(
          (product) => product.id === id
        );
        DataStorge.saveData(productCart);
        this._refreshCart();
      },
    };
  };
}
