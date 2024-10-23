const ORDER_API_URL = `http://localhost:3000/api/products/order`;

// Function to post order data to the backend
function postOrder(orderData) {
    console.log(`URL:${ORDER_API_URL}`)
    fetch(ORDER_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    })
    .then(response => {
        console.log(`response:${response.status}`)
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Order successful:', data);
        alert('Your order was successfully posted!'); // Display success message to the user
        // Additional actions like redirecting or clearing the cart can be done here
    })
    .catch(error => console.error('Error:', error));
}

// Event listener for form submission
document.querySelector('.cart__order__form').addEventListener('submit', function(event) {
    // Email validation using regex
    const emailInput = document.getElementById('email');
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailPattern.test(emailInput.value)) {
        event.preventDefault(); // Prevent form submission if email is invalid
        alert('Please enter a valid email address.');
        console.log('Valid Email is required');
        return; // Exit the function early if email is invalid
    }

    // Collect order data if email is valid
    const orderData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        email: document.getElementById('email').value,
        cart: JSON.parse(localStorage.getItem('shoppingCart'))
    };

    console.log('Posting order:', orderData);

    // Call the postOrder function with the collected data
    postOrder(orderData);
});
