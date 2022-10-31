// Constantes.
const REGULAR_TYPE = 21;
const LOWER_TYPE = 4;
const EXEMPT_TYPE = 0;

// Entrada.
var products = [
  {
    description: "Goma de borrar",
    price: 0.25,
    tax: LOWER_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: "Lápiz H2",
    price: 0.4,
    tax: LOWER_TYPE,
    stock: 5,
    units: 0,
  },
  {
    description: "Cinta rotular",
    price: 9.3,
    tax: REGULAR_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: "Papelera plástico",
    price: 2.75,
    tax: REGULAR_TYPE,
    stock: 5,
    units: 0,
  },
  {
    description: "Escuadra",
    price: 8.4,
    tax: REGULAR_TYPE,
    stock: 3,
    units: 0,
  },
  {
    description: "Pizarra blanca",
    price: 5.95,
    tax: REGULAR_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: "Afilador",
    price: 1.2,
    tax: LOWER_TYPE,
    stock: 10,
    units: 0,
  },
  {
    description: "Libro ABC",
    price: 19,
    tax: EXEMPT_TYPE,
    stock: 2,
    units: 0,
  },
];

var printProductCart = () => {
  for (var producto of products) {
    printHTML(producto);
  }
};

var printHTML = (producto) => {
  var productList = document.getElementById("product-list");
  let list = document.createElement("li");
  list.classList.add("product-item-container");

  let div = document.createElement("div");
  div.classList.add("product-item");
  div.innerHTML = `
  <span> ${producto.description} </span>
  <span> ${producto.price}€ </span>
  `;

  var input = document.createElement("input");
  input.setAttribute("class", "input-product-unit");
  input.setAttribute("type", "number");
  input.setAttribute("min", 0);
  input.setAttribute("max", producto.stock);
  input.setAttribute("value", 0);
  input.addEventListener("change", (event) => {
    producto.units = event.target.valueAsNumber;
    enableBtnCalc();
  });
  productList.appendChild(list);
  list.appendChild(div);
  div.appendChild(input);
};

var resumeCalc = () => {
  var subTotal = 0;
  var tax = 0;
  var totalCart = 0;
  for (let producto of products) {
    subTotal += producto.price * producto.units;
    tax += producto.price * producto.units * (producto.tax / 100);
  }
  totalCart = subTotal + tax;
  printResult(subTotal, tax, totalCart);
}

var printResult = (subTotal, tax, totalCart) => {
    document.getElementById("subTotal").innerText = subTotal + "€";
    document.getElementById("tax").innerText = tax + "€";
    document.getElementById("totalCart").innerText = totalCart + "€";
}

var enableBtnCalc = () => {
  var hayUnidades = false;
  let i = 0;
  while (i < products.length && !hayUnidades) {
    hayUnidades = products[i].units != 0;
    i++;
  }

  hayUnidades
    ? (document.getElementById("button-calc").disabled = false)
    : (document.getElementById("button-calc").disabled = true);
}

printProductCart();
enableBtnCalc();
document.getElementById("button-calc").addEventListener = ("click", () => {resumeCalc()});
