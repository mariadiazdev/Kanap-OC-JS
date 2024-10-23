const API_URL = 'http://localhost:3000/api/products/';
let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

// fetch data from the backend
function getData(productId) {
  return fetch(`${API_URL}${productId}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .catch(error => console.error('Error fetching product:', error));
}

// populate cart and calculate totals
async function populateCart() {
  let total = {
    price: 0,
    quantity: 0
  };

  // Clear the existing cart items
  const cartContainer = document.getElementById("cart__items");
  cartContainer.innerHTML = '';

  // Iterate over each item in the cart
  for (const item of cart) {
    const itemDetails = await getData(item.id);
    total.quantity += item.quantity;
    total.price += itemDetails.price * item.quantity;
    displayItem(itemDetails, item);
  }

  populateCartPrice(total);
}

// Function to display each item in the cart
function displayItem(itemDetails, item) {
  const cartContainer = document.getElementById("cart__items");
  const cartElement = document.createElement('article');
  cartElement.classList.add('cart__item');
  cartElement.dataset.id = item.id;
  cartElement.dataset.color = item.color;

  cartElement.innerHTML = `
    <div class="cart__item__img">
      <img src="${itemDetails.imageUrl}" alt="${itemDetails.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${itemDetails.name}</h2>
        <p>${item.color}</p>
        <p>${itemDetails.price}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Quantity: </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Delete</p>
        </div>
      </div>
    </div>
  `;

  cartContainer.appendChild(cartElement);
}

// Function to populate total price and quantity in the DOM
function populateCartPrice(total) {
  document.getElementById('totalQuantity').textContent = total.quantity;
  document.getElementById('totalPrice').textContent = total.price.toFixed(2);
}

// Function to delete an item from the cart
function deleteItem(cartItemElement) {
  const itemId = cartItemElement.dataset.id;
  const itemColor = cartItemElement.dataset.color;

  // Filter out the item from the cart array
  cart = cart.filter(item => !(item.id === itemId && item.color === itemColor));

  // Update localStorage
  localStorage.setItem('shoppingCart', JSON.stringify(cart));

  // Remove the item element from the DOM
  cartItemElement.remove();

  // Recalculate totals
  populateCart();
}

// Set up event listeners for delete buttons and quantity changes
function setupCartEventListeners() {
  document.getElementById('cart__items').addEventListener('click', event => {
    if (event.target.classList.contains('deleteItem')) {
      const cartItemElement = event.target.closest('.cart__item');
      deleteItem(cartItemElement);
    }
  });

  document.getElementById('cart__items').addEventListener('change', event => {
    if (event.target.classList.contains('itemQuantity')) {
      const cartItemElement = event.target.closest('.cart__item');
      const itemId = cartItemElement.dataset.id;
      const itemColor = cartItemElement.dataset.color;
      const newQuantity = parseInt(event.target.value);

      if (newQuantity <= 0) {
        alert('Quantity must be at least 1');
        event.target.value = 1;
        return;
      }

      // Update the quantity in the cart array
      const itemToUpdate = cart.find(item => item.id === itemId && item.color === itemColor);
      itemToUpdate.quantity = newQuantity;

      // Update localStorage
      localStorage.setItem('shoppingCart', JSON.stringify(cart));

      // Recalculate totals
      populateCart();
    }
  });
}

// Initial call to populate the cart
populateCart();

// Set up event listeners for cart actions
setupCartEventListeners();
