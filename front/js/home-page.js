
const API_URL = 'http://localhost:3000/api/products';

// Get element in the page where products will be inserted
const articleHolder = document.getElementById('items');

// Function to fetch data from the backend
function getData() {
  fetch(API_URL)
    .then(res => {
      if (!res.ok) {
        throw new Error("HTTP error! status: ${res.status}");
      }
      return res.json(); // Parse the JSON response
    })
    .then(products => insertProducts(products))
    .catch(error => console.error('Error fetching products:', error));
}

// Function to insert products into the page

/**
 * Inserts products to home page
 * 
 * @param {[object]} products - array of product info
 */
function insertProducts(products) {
  products.forEach(product => {
    console.log("Loading", product._id);
    // Create a new card element for each product
    const productCard = document.createElement('a');
    productCard.href = `./product.html?id=${product._id}`;
    productCard.innerHTML = `
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
               <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
    `;

    // Append the new card to the article holder on the page
    articleHolder.appendChild(productCard);
  });
}

// Call the function to fetch and display products
getData();
console.log("Done");
