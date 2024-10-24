const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId')
console.log(`orderId:`,orderId);
document.getElementById('orderId').innerHTML = orderId;