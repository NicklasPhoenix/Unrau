// Add a new product
function addProduct(product_name, description, price, image_url, stock_quantity) {
    fetch('/add-product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ product_name, description, price, image_url, stock_quantity })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => console.error('Error:', error));
}

// Fetch a specific product by ID
function fetchProduct(id) {
    fetch(`/product/${id}`)
    .then(response => response.json())
    .then(product => {
        // Display product details
        // This is just a placeholder; customize how you want to display the product
        const productSection = document.getElementById('product');
        productSection.innerHTML = JSON.stringify(product);
    })
    .catch(error => console.error('Error:', error));
}

// Update a product
function updateProduct(id, product_name, description, price, image_url, stock_quantity) {
    fetch(`/update-product/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ product_name, description, price, image_url, stock_quantity })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => console.error('Error:', error));
}

// Delete a product
function deleteProduct(id) {
    fetch(`/delete-product/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => console.error('Error:', error));
}
const productForm = document.getElementById('add-product-form');

productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const product_name = e.target.product_name.value;
    const description = e.target.description.value;
    const price = parseFloat(e.target.price.value);
    const image_url = e.target.image_url.value;
    const stock_quantity = parseInt(e.target.stock_quantity.value);
    
    addProduct(product_name, description, price, image_url, stock_quantity);
});

// Remember to bind these functions to appropriate buttons/forms in your HTML using event listeners.
