const products = [
    {
        id: 1,
        name: "Paracetamol",
        category: "medicine",
        description: "For temporary relief of common aches and fever.",
        price: 8.99,
        label: "MED"
    },
    {
        id: 2,
        name: "Vitamin C",
        category: "vitamin",
        description: "Daily vitamin C supplement for wellness support.",
        price: 12.50,
        label: "VIT"
    },
    {
        id: 3,
        name: "Multivitamins",
        category: "vitamin",
        description: "Complete daily multivitamin supplement.",
        price: 18.99,
        label: "VIT"
    },
    {
        id: 4,
        name: "First Aid Kit",
        category: "medicine",
        description: "Essential supplies for everyday first aid.",
        price: 24.99,
        label: "AID"
    },
    {
        id: 5,
        name: "Hand Sanitizer",
        category: "personal",
        description: "Gentle hand sanitizer for everyday hygiene.",
        price: 5.99,
        label: "CARE"
    },
    {
        id: 6,
        name: "Face Mask",
        category: "personal",
        description: "Comfortable protective disposable face masks.",
        price: 7.50,
        label: "CARE"
    },
    {
        id: 7,
        name: "Omega 3",
        category: "vitamin",
        description: "Omega 3 supplement for everyday nutrition.",
        price: 21.99,
        label: "VIT"
    },
    {
        id: 8,
        name: "Digital Thermometer",
        category: "personal",
        description: "Easy-to-use digital temperature monitor.",
        price: 14.99,
        label: "CARE"
    }
];


let cart = [];

let currentCategory = "all";


const productGrid = document.getElementById("productGrid");
const noProducts = document.getElementById("noProducts");
const searchInput = document.getElementById("searchInput");


function displayProducts(list) {

    productGrid.innerHTML = "";

    if (list.length === 0) {
        noProducts.style.display = "block";
        return;
    }

    noProducts.style.display = "none";

    list.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image">
                ${product.label}
            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <p>
                    ${product.description}
                </p>

                <div class="product-bottom">

                    <span class="price">
                        $${product.price.toFixed(2)}
                    </span>

                    <button
                        class="add-btn"
                        onclick="addToCart(${product.id})"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>
        `;

        productGrid.appendChild(card);
    });
}


function filterProducts(category) {

    currentCategory = category;

    document.querySelectorAll(".category-card").forEach(card => {
        card.classList.remove("active");
    });

    event.currentTarget.classList.add("active");

    applyFilters();
}


function searchProducts() {

    applyFilters();
}


function applyFilters() {

    const searchValue = searchInput.value.toLowerCase().trim();

    let filtered = products.filter(product => {

        const matchesCategory =
            currentCategory === "all" ||
            product.category === currentCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchValue) ||
            product.description.toLowerCase().includes(searchValue);

        return matchesCategory && matchesSearch;
    });

    displayProducts(filtered);
}


function addToCart(productId) {

    const product = products.find(
        product => product.id === productId
    );

    const existingItem = cart.find(
        item => item.id === productId
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    openCart();
}


function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                Your cart is empty.
            </div>
        `;

    } else {

        cart.forEach(item => {

            const cartItem = document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `

                <div class="cart-item-image">
                    ${item.label}
                </div>

                <div>

                    <h4>${item.name}</h4>

                    <span class="cart-item-price">
                        $${item.price.toFixed(2)}
                    </span>

                    <div class="quantity-controls">

                        <button onclick="changeQuantity(${item.id}, -1)">
                            -
                        </button>

                        <span>${item.quantity}</span>

                        <button onclick="changeQuantity(${item.id}, 1)">
                            +
                        </button>

                    </div>

                </div>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>
            `;

            cartItems.appendChild(cartItem);
        });
    }


    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    cartCount.textContent = totalQuantity;

    cartTotal.textContent =
        `$${totalPrice.toFixed(2)}`;
}


function changeQuantity(productId, change) {

    const item = cart.find(
        item => item.id === productId
    );

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(
            item => item.id !== productId
        );
    }

    updateCart();
}


function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    updateCart();
}


function openCart() {

    document
        .getElementById("cartSidebar")
        .classList.add("open");

    document
        .getElementById("cartOverlay")
        .classList.add("show");
}


function closeCart() {

    document
        .getElementById("cartSidebar")
        .classList.remove("open");

    document
        .getElementById("cartOverlay")
        .classList.remove("show");
}


function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    alert(
        "Order placed successfully. Thank you for shopping with MediCare Pharmacy."
    );

    cart = [];

    updateCart();

    closeCart();
}


function toggleMenu() {

    document
        .getElementById("navMenu")
        .classList.toggle("show");
}


displayProducts(products);

updateCart();