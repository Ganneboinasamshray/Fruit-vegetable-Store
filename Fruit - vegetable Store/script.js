// Array of products
const products = [
    { name: "Apple", price: 100, category: "Fruits", image: "apple.jpg" },
    { name: "Banana", price: 80, category: "Fruits", image: "banana.jpg" },
    { name: "Pineapple", price: 120, category: "Fruits", image: "pineapple.jpg" },
    { name: "Custardapple", price: 130, category: "Fruits", image: "custard apple.jpg" },
    { name: "Guava", price: 120, category: "Fruits", image: "guava.jpg" },
    { name: "Kiwi", price: 200, category: "Fruits", image: "kiwi.jpg" },
    { name: "Grapes", price: 150, category: "Fruits", image: "grapes.jpg" },
    { name: "Dragonfruit", price: 250, category: "Fruits", image: "dragon fruit.jpeg" },
    { name: "Mango", price: 150, category: "Fruits", image: "mango.jpg" },
    { name: "Strawberries", price: 250, category: "Fruits", image: "strawberry.jpeg" },
    { name: "Carrot", price: 100, category: "Vegetables", image: "carrot.jpg" },
    { name: "Broccoli", price: 200, category: "Vegetables", image: "broccoli.jpg" },
    { name: "Tomato", price: 70, category: "Vegetables", image: "tomato.jpeg" },
    { name: "Brinjal", price: 80, category: "Vegetables", image: "brinjal.jpeg" },
    { name: "Cabbage", price: 50, category: "Vegetables", image: "cabbage.jpg" },
    { name: "Cauliflower", price: 60, category: "Vegetables", image: "cauliflower.jpg" },
    { name: "Lady's Finger", price: 80, category: "Vegetables", image: "ladys-finger.jpeg" },
    { name: "BitterGourd", price: 100, category: "Vegetables", image: "bittergourd.jpg" },
    { name: "BottleGuard", price: 120, category: "Vegetables", image: "bottle-gourd.jpg" },
    { name: "Potato", price: 40, category: "Vegetables", image: "potato.jpg" }
];

// Display products in a list
function displayProducts(productList) {
    const productContainer = document.getElementById('product-list') || document.getElementById('search-results');
    
    if (!productContainer) return;

    productContainer.innerHTML = productList.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: ₹${product.price}/kg</p>
            <input type="number" min="1" value="1">
            <button class="add-to-cart" data-product="${product.name}" data-price="${product.price}">Add to Cart</button>
        </div>
    `).join('');
}

// Add to Cart functionality
function addToCart(e) {
    if (!e.target.classList.contains('add-to-cart')) return;

    const productName = e.target.getAttribute('data-product');
    const productPrice = parseFloat(e.target.getAttribute('data-price'));
    const quantityInput = e.target.previousElementSibling;
    const quantity = parseInt(quantityInput.value);

    if (isNaN(quantity) || quantity <= 0) {
        alert('Please enter a valid quantity.');
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Display the cart items and total
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cartItemsContainer && cartTotalContainer) {
        cartItemsContainer.innerHTML = cart.map(item => 
            `<li>${item.name} - ₹${item.price} x ${item.quantity}</li>`
        ).join('');
        
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        cartTotalContainer.textContent = total.toFixed(2);
    }
}

// Search Functionality
function handleSearch() {
    const queryString = new URLSearchParams(window.location.search);
    const searchQuery = queryString.get('query');

    if (searchQuery) {
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        document.getElementById('search-query').textContent = searchQuery;
        const searchResultsContainer = document.getElementById('search-results');

        if (filteredProducts.length > 0) {
            displayProducts(filteredProducts);
        } else {
            searchResultsContainer.innerHTML = `<p>No products found for "${searchQuery}".</p>`;
        }
    } else {
        // Display all products if no query
        displayProducts(products);
    }
}

// Event listener for cart functionality
document.body.addEventListener('click', addToCart);
document.addEventListener('DOMContentLoaded', () => {
    handleSearch();
    updateCartDisplay();
});
