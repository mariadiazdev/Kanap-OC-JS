const API_URL = 'http://localhost:3000/api/products/';

// Function to fetch data from the backend
/**
 * Fetch data from API 
 * @param {String} productId 
 * @returns {Promise<Object>} - product data
 */
function getData(productId) {
    return fetch(`${API_URL}${productId}`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json(); // Parse the JSON response
        })
        .catch(error => console.error('Error fetching product:', error));
}

/**
 * Inserts product information into the HTML elements using innerHTML.
 * 
 * @param {Object} product - The product object containing details like name, price, image, etc.
 * @param {string} product.imageUrl - URL of the product image.
 * @param {string} product.altTxt - Alt text for the product image.
 * @param {string} product.name - Name of the product.
 * @param {number} product.price - Price of the product.
 * @param {string} product.description - Description of the product.
 * @param {Array} product.colors - Array of available colors for the product.
 */
function insertProductInfo(product) {
    const imageContainer = document.querySelector('.item__img');
    imageContainer.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    document.getElementById('price').innerHTML = product.price;
    document.getElementById('title').innerHTML = product.name;
    document.getElementById('description').innerHTML = product.description;
    const colorSelect = document.getElementById('colors');
    product.colors.forEach(color => {
        const option = document.createElement('option');
        option.textContent = color;
        colorSelect.appendChild(option);
    });
}

function addToCart() {
    console.log(`adding items to cart${productId}`);
    
    const quantity = parseInt(document.getElementById('quantity').value);
    const color = document.getElementById('colors').value
    if( !color || quantity <= 0){
        alert('Color and quantity are required to update cart.');
    }
    else{
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    console.log(cart)
    let product = {
        id: productId,
        quantity: quantity,
        color: color
    };
    console.log(color)
    
    const existingProduct = cart.find(item => item.id === product.id && item.color === product.color);
    if(existingProduct != null){
        console.log(`Product already in cart. Increasing quantity by ${product.quantity}`)
            existingProduct.quantity = existingProduct.quantity + product.quantity;
    }
    else {
        cart.push(product)
    }
    
    console.log("ADDING TO CART")
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    alert("Succesfully added item!")
    }
}



const productId = new URLSearchParams(window.location.search).get('id');
console.log(productId);

// Fetch data and then insert it into the DOM
getData(productId).then(product => {
    if (product) {
        insertProductInfo(product);
    }
});

//populate cart
document.getElementById('addToCart').addEventListener('click', addToCart);
