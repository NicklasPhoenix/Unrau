document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
});

function displayProducts() {
    const productsSection = document.getElementById('products');

    // This is just dummy data for now
    const products = [
        { id: 1, name: 'Product 1', price: '$100' },
        { id: 2, name: 'Product 2', price: '$150' }
    ];

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <h2>${product.name}</h2>
            <p>Price: ${product.price}</p>
            <button>Add to Cart</button>
        `;

        productsSection.appendChild(productDiv);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    initializeSwiper();
});

function displayProducts() {
    // ... (your existing code for displayProducts)
}

function initializeSwiper() {
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}
document.querySelector("#shopping-basket").addEventListener('click', () => {
    window.location.href = 'cart.html';
});

document.querySelector("#login-button").addEventListener('click', () => {
    // Insert your login functionality or redirect to a login page.
});
