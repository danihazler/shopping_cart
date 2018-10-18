'use strict';
// ****** VARIABLES ******
const productList = [
  {name:"Beer", price: 3.25, image:"beer.svg", qty: 20},
  {name:"Champagne", price: 4.25, image:"champagne.svg", qty: 20},
  {name:"Cocktail", price: 8.50, image:"cocktail.svg", qty: 25},
  {name:"Cola", price: 0.90, image:"cola.svg", qty: 10},
  {name:"Dessert Wine", price: 4.25, image:"dessert-wine.svg", qty: 15},
  {name:"Energy Drink", price: 4, image:"energy-drink.svg", qty: 25}
];
const products = document.getElementById('products');


/* ***** PRODUCT DIV ******
**************************** */
productList.map(product => {
  let output = `<div class="product">
  <img class="product__image" src="img/products/${product.image}" alt="${product.name}">
  <h2 class="product__name">${product.name}</h2>
  <h3 class="product__price">${product.price}</h3>
  <button class="btn btn--primary" data-action="ADD_TO_CART">Add To Cart</button>
  </div>`
  products.innerHTML += output;
});
