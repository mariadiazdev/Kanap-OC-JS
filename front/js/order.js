const ORDER_API_URL = `http://localhost:3000/api/products/order`;

// post order data to the backend
function postOrder(contact, products) {
    console.log('Posting order:', { contact, products });
    const orderData = {
        contact: contact, 
        products: products // Array of product IDs
    };

    fetch(ORDER_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    })
    .then(response => {
        if (!response.ok) {
            alert('Your order was not submitted. Please try again');
            console.log('Error:', response.status);
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Order successful:', data);
        // localStorage.setItem("shoppingCart", "[]")
        console.log('Your cart is now empty')
        window.location.replace(`./confirmation.html?orderId=${data.orderId}`);
        
    })
    .catch(error => console.error('Error:', error));
}

// Event listener for form submission
document.querySelector('.cart__order__form').addEventListener('submit', function(event) {
    // Prevent default submission
    event.preventDefault();


    // const emailInput = document.getElementById('email');
    // const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // if (!emailPattern.test(emailInput.value)) {
    //     alert('Please enter a valid email address.');
    //     console.log('Valid Email is required');
    //     return; 
    // }

    const contact = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        email: document.getElementById('email').value,
    };

    // array of product IDs from the cart
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const products = cart.map(item => item.id);

    // Check if there are products in the cart
    if (products.length === 0) {
        alert('Your cart is empty');
        return;
    }

    

    // Call the postOrder function with the collected data
    postOrder(contact, products);
});
