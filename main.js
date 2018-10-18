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
const cartDOM = document.querySelector('.cart');

let cart = [];

/* ***** PRODUCT DIV ******
**************************** */
productList.map(product => {
  let output = `
    <div class="product">
      <img class="product__image" src="img/products/${product.image}" alt="${product.name}">
      <h2 class="product__name">${product.name}</h2>
      <h3 class="product__price">${product.price}</h3>
      <button class="btn btn--primary" data-action="ADD_TO_CART">Add To Cart</button>
    </div>`
  products.innerHTML += output;
});

/* ***** ADD TO CART BUTTON ******
**************************** */

/* this variable needs to be created after the creation
of the HTML elements, that's why it's not on the top */
const addToCartButtonsDOM = document.querySelectorAll("[data-action='ADD_TO_CART']");

addToCartButtonsDOM.forEach(addToCartButtonsDOM => {
  addToCartButtonsDOM.addEventListener("click", () => {
    const productDOM = addToCartButtonsDOM.parentNode
    const product = {
      image: productDOM.querySelector(".product__image").getAttribute("src"),
      name: productDOM.querySelector(".product__name").innerText,
      price: productDOM.querySelector(".product__price").innerText,
      quantity: 1
    };

    const addedToCart = (cart.filter(cartItem => (cartItem.name === product.name)).length > 0);

    if (!addedToCart) {
      cartDOM.insertAdjacentHTML('beforeend', `
        <div class="cart__item">
          <img class="cart__item__image" src="${product.image}" alt="${product.name}">
          <h3 class="cart__item__name">${product.name}</h3>
          <h3 class="cart__item__price">${product.price}</h3>
          <button class="btn btn--primary btn--small" data-action="DECREASE_ITEM">&minus;</button>
          <h3 class="cart__item__quantity">${product.quantity}</h3>
          <button class="btn btn--primary btn--small" data-action="INCREASE_ITEM">&plus;</button>
          <button class="btn btn--danger btn--small" data-action="REMOVE_ITEM">&minus;</button>
        </div>`
      );
      cart.push(product);
      addToCartButtonsDOM.innerText = 'In Cart';

      const cartItemsDOM = cartDOM.querySelectorAll('.cart__item');
      cartItemsDOM.forEach(cartItemDOM => {
        if (cartItemDOM.querySelector('.cart__item__name').innerText === product.name) {
        /* ***** INCREASE PRODUCT QTY (IN THE CART) ****** */
          cartItemDOM.querySelector('[data-action="INCREASE_ITEM"]').addEventListener('click', () => {
            cart.forEach(cartItem => {
              if (cartItem.name === product.name) {
                cartItemDOM.querySelector('.cart__item__quantity').innerText = ++cartItem.quantity;
              }
            });
          });
          /* ***** DECREASE PRODUCT QTY (IN THE CART) ****** */
          cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').addEventListener('click', () => {
            cart.forEach(cartItem => {
              if (cartItem.name === product.name) {
                if (cartItem.quantity > 1) {
                  cartItemDOM.querySelector('.cart__item__quantity').innerText = --cartItem.quantity;
                } else {
                  // add a class that contains an animation to the element
                  cartItemDOM.classList.add('cart__item--removed');
                  /* if qty is less than 1, it'll be deleted from the cart DOM,
                  and a delay was added due to the animation added */
                  setTimeout(() => cartItemDOM.remove(), 250);
                  // here deletes from the cart array
                  cart = cart.filter(cartItem => cartItem.name !== product.name);
                  addToCartButtonsDOM.innerText = "Add To Cart";
                }
              }
            });
          });
          /* ***** REMOVE PRODUCT QTY (IN THE CART) ****** */
          cartItemDOM.querySelector('[data-action="REMOVE_ITEM"]').addEventListener('click', () => {
            cart.forEach(cartItem => {
              if (cartItem.name === product.name) {
                // add a class that contains an animation to the element
                cartItemDOM.classList.add('cart__item--removed');
                /* if qty is less than 1, it'll be deleted from the cart DOM,
                and a delay was added due to the animation added */
                setTimeout(() => cartItemDOM.remove(), 250);
                // here deletes from the cart array
                cart = cart.filter(cartItem => cartItem.name !== product.name);
                addToCartButtonsDOM.innerText = "Add To Cart";
              }
            });
          });
        }
      });
    }
  });
});
