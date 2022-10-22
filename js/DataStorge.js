export default class DataStorge {
  // get data from json file
  static async JSON_GetData() {
    const respon = await fetch("data.json");
    // console.log(await respon.json());
    const data = await respon.json();

    return data;
  }

  // 1-  get data from lockal storege
  static getData() {
    let products = JSON.parse(localStorage.getItem("products") || "[]");
    return products;
  }

  // 2- if user by somting save  it to localStorage (cart)
  // add data to cart
  static saveData(product) {
    let products = this.getData();

    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
  }

  // 3- if user remove somting delet it from localstorge
  // remove from cart
  static removeData() {}
}
