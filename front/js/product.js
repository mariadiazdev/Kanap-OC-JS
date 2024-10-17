
const API_URL = 'http://localhost:3000/api/products/';

// Get element in the page where products will be inserted
const articleHolder = document.getElementById('items');

// Function to fetch data from the backend
function getData(productId) {
    // console.log(API_URL+productId)
    fetch(`${API_URL}${productId}`)
        .then(res => {
            if (!res.ok) {
                throw new Error("HTTP error! status: ${res.status}");
            }
            return res.json(); // Parse the JSON response

        })
        .then(product => insertProductInfo(product))
        .catch(error => console.error('Error fetching products:', error));
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

const productId = new URLSearchParams(window.location.search).get('id');
console.log(productId);

getData(productId)