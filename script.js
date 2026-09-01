const products = [
    {
        id: 1,
        name: "Paracetamol",
        category: "medicine",
        description: "For temporary relief of common aches and fever.",
        price: 8.99,
        label: "MED",
        image: "images/paracetamol.jpg"
    },

    {
        id: 2,
        name: "Vitamin C",
        category: "vitamin",
        description: "Daily vitamin C supplement for wellness support.",
        price: 12.50,
        label: "VIT",
        image: "images/vitamin-c.jpg"
    },

    {
        id: 3,
        name: "Multivitamins",
        category: "vitamin",
        description: "Complete daily multivitamin supplement.",
        price: 18.99,
        label: "VIT",
        image: "images/multivitamins.jpg"
    },

    {
        id: 4,
        name: "First Aid Kit",
        category: "medicine",
        description: "Essential supplies for everyday first aid.",
        price: 24.99,
        label: "AID",
        image: "images/first-aid.jpg"
    },

    {
        id: 5,
        name: "Hand Sanitizer",
        category: "personal",
        description: "Gentle hand sanitizer for everyday hygiene.",
        price: 5.99,
        label: "CARE",
        image: "images/sanitizer.jpg"
    },

    {
        id: 6,
        name: "Face Mask",
        category: "personal",
        description: "Comfortable protective disposable face masks.",
        price: 7.50,
        label: "CARE",
        image: "images/face-mask.jpg"
    },

    {
        id: 7,
        name: "Omega 3",
        category: "vitamin",
        description: "Omega 3 supplement for everyday nutrition.",
        price: 21.99,
        label: "VIT",
        image: "images/omega-3.jpg"
    },

    {
        id: 8,
        name: "Digital Thermometer",
        category: "personal",
        description: "Easy-to-use digital temperature monitor.",
        price: 14.99,
        label: "CARE",
        image: "images/thermometer.jpg"
    },
    // =========================
    // NEW PRODUCTS
    // =========================
    {
        id: 9,
        name: "Cough Syrup",
        category: "medicine",
        description: "Soothing cough syrup for temporary cough relief.",
        price: 9.99,
        label: "MED",
        image: "images/cough-syrup.jpg"
    },
    {
        id: 10,
        name: "Blood Pressure Monitor",
        category: "personal",
        description: "Digital monitor for convenient blood pressure tracking.",
        price: 39.99,
        label: "CARE",
        image: "images/blood-pressure-monitor.jpg"
    },

    {
        id: 11,
        name: "Bandages",
        category: "medicine",
        description: "Comfortable adhesive bandages for minor cuts and wounds.",
        price: 6.99,
        label: "AID",
        image: "images/bandage.jpg"
    },
     {
        id: 12,
        name: "Antiseptic",
        category: "medicine",
        description: "Antiseptic solution for cleaning minor cuts and wounds.",
        price: 8.49,
        label: "MED",
        image: "images/antiseptic.jpg"
    }
];


/* =========================
   CART & FILTER VARIABLES
========================= */

let cart = [];
let currentCategory = "all";


/* =========================
   DOM ELEMENTS
========================= */

const productGrid = document.getElementById("productGrid");
const noProducts = document.getElementById("noProducts");
const searchInput = document.getElementById("searchInput");


/* =========================
   DISPLAY PRODUCTS
========================= */

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

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    onerror="this.style.display='none'; this.parentElement.innerHTML='<span>${product.label}</span>';"
                >

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>


                <h3>
                    ${product.name}
                </h3>


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
                        type="button"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        `;


        productGrid.appendChild(card);

    });

}


/* =========================
   FILTER PRODUCTS
========================= */

function filterProducts(category) {

    currentCategory = category;


    document
        .querySelectorAll(".category-card")
        .forEach(card => {

            card.classList.remove("active");

        });


    if (typeof event !== "undefined" && event.currentTarget) {

        event.currentTarget.classList.add("active");

    }


    applyFilters();

}


/* =========================
   SEARCH PRODUCTS
========================= */

function searchProducts() {

    applyFilters();

}


/* =========================
   APPLY SEARCH + CATEGORY
========================= */

function applyFilters() {

    const searchValue =
        searchInput.value.toLowerCase().trim();


    const filteredProducts =
        products.filter(product => {

            const matchesCategory =
                currentCategory === "all" ||
                product.category === currentCategory;


            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchValue)

                ||

                product.description
                    .toLowerCase()
                    .includes(searchValue);


            return matchesCategory && matchesSearch;

        });


    displayProducts(filteredProducts);

}


/* =========================
   ADD TO CART
========================= */

function addToCart(productId) {

    const product = products.find(
        product => product.id === productId
    );


    if (!product) {
        return;
    }


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


/* =========================
   UPDATE CART
========================= */

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">
                Your cart is empty.
            </div>

        `;

    } else {

        cart.forEach(item => {

            const cartItem =
                document.createElement("div");


            cartItem.className = "cart-item";


            cartItem.innerHTML = `

                <div class="cart-item-image">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                        onerror="this.style.display='none'; this.parentElement.innerHTML='<span>${item.label}</span>';"
                    >

                </div>


                <div>

                    <h4>
                        ${item.name}
                    </h4>


                    <span class="cart-item-price">
                        $${item.price.toFixed(2)}
                    </span>


                    <div class="quantity-controls">

                        <button
                            onclick="changeQuantity(${item.id}, -1)"
                            type="button"
                        >
                            −
                        </button>


                        <span>
                            ${item.quantity}
                        </span>


                        <button
                            onclick="changeQuantity(${item.id}, 1)"
                            type="button"
                        >
                            +
                        </button>

                    </div>

                </div>


                <button
                    class="remove-btn"
                    onclick="removeFromCart(${item.id})"
                    type="button"
                >
                    Remove
                </button>

            `;


            cartItems.appendChild(cartItem);

        });

    }


    const totalQuantity =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const totalPrice =
        cart.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        );


    cartCount.textContent =
        totalQuantity;


    cartTotal.textContent =
        `$${totalPrice.toFixed(2)}`;

}


/* =========================
   CHANGE QUANTITY
========================= */

function changeQuantity(productId, change) {

    const item = cart.find(
        item => item.id === productId
    );


    if (!item) {
        return;
    }


    item.quantity += change;


    if (item.quantity <= 0) {

        cart = cart.filter(
            item => item.id !== productId
        );

    }


    updateCart();

}


/* =========================
   REMOVE FROM CART
========================= */

function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );


    updateCart();

}


/* =========================
   OPEN CART
========================= */

function openCart() {

    const cartSidebar =
        document.getElementById("cartSidebar");

    const cartOverlay =
        document.getElementById("cartOverlay");


    cartSidebar.classList.add("open");

    cartOverlay.classList.add("show");

}


/* =========================
   CLOSE CART
========================= */

function closeCart() {

    const cartSidebar =
        document.getElementById("cartSidebar");

    const cartOverlay =
        document.getElementById("cartOverlay");


    cartSidebar.classList.remove("open");

    cartOverlay.classList.remove("show");

}


/* =========================
   CHECKOUT
========================= */

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


/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {

    const navMenu =
        document.getElementById("navMenu");


    navMenu.classList.toggle("show");

}


/* =========================
   CLOSE MOBILE MENU
   AFTER CLICKING LINK
========================= */

document
    .querySelectorAll("#navMenu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            document
                .getElementById("navMenu")
                .classList.remove("show");

        });

    });


/* =========================
   INITIAL LOAD
========================= */

displayProducts(products);

updateCart();