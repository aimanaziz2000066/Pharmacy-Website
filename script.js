/* =========================================================
MEDICARE PHARMACY
PRODUCTS + CART + AUTHENTICATION
========================================================= */

/* =========================================================
PRODUCTS
========================================================= */

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
},

{
    id: 13,
    name: "Ibuprofen",
    category: "medicine",
    description: "Helps relieve pain, inflammation, and fever.",
    price: 6.99,
    label: "MED",
    image: "images/ibuprofen.jpg"
},

{
    id: 14,
    name: "Diclofenac",
    category: "medicine",
    description: "Used for temporary relief of pain and inflammation.",
    price: 7.99,
    label: "MED",
    image: "images/diclofenac.jpg"
},

{
    id: 15,
    name: "Omeprazole",
    category: "medicine",
    description: "Helps reduce stomach acid and relieve heartburn.",
    price: 9.99,
    label: "MED",
    image: "images/omeprazole.jpg"
},

{
    id: 16,
    name: "Allergy Tablets",
    category: "medicine",
    description: "Helps relieve common allergy symptoms.",
    price: 10.99,
    label: "MED",
    image: "images/allergy-tablets.jpg"
}


];

/* =========================================================
CART VARIABLES
========================================================= */

let cart = [];

let currentCategory = "all";

/* =========================================================
DOM ELEMENTS
========================================================= */

const productGrid =
document.getElementById("productGrid");

const noProducts =
document.getElementById("noProducts");

const searchInput =
document.getElementById("searchInput");

/* =========================================================
DISPLAY PRODUCTS
========================================================= */

function displayProducts(list) {


productGrid.innerHTML = "";

if (list.length === 0) {

    noProducts.style.display = "block";

    return;
}

noProducts.style.display = "none";


list.forEach(product => {

    const card =
        document.createElement("div");

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

/* =========================================================
FILTER PRODUCTS
========================================================= */

function filterProducts(category, button) {


currentCategory = category;


document
    .querySelectorAll(".category-card")
    .forEach(card => {

        card.classList.remove("active");

    });


if (button) {

    button.classList.add("active");

}


applyFilters();


}

/* =========================================================
SEARCH
========================================================= */

function searchProducts() {


applyFilters();


}

/* =========================================================
APPLY FILTERS
========================================================= */

function applyFilters() {


const searchValue =
    searchInput.value
        .toLowerCase()
        .trim();


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

/* =========================================================
ADD TO CART
========================================================= */

function addToCart(productId) {


const product =
    products.find(
        product => product.id === productId
    );


if (!product) {
    return;
}


const existingItem =
    cart.find(
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

/* =========================================================
UPDATE CART
========================================================= */

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


        cartItem.className =
            "cart-item";


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

/* =========================================================
CHANGE QUANTITY
========================================================= */

function changeQuantity(productId, change) {


const item =
    cart.find(
        item => item.id === productId
    );


if (!item) {
    return;
}


item.quantity += change;


if (item.quantity <= 0) {

    cart =
        cart.filter(
            item => item.id !== productId
        );

}


updateCart();


}

/* =========================================================
REMOVE FROM CART
========================================================= */

function removeFromCart(productId) {


cart =
    cart.filter(
        item => item.id !== productId
    );


updateCart();


}

/* =========================================================
OPEN CART
========================================================= */

function openCart() {


const cartSidebar =
    document.getElementById("cartSidebar");

const cartOverlay =
    document.getElementById("cartOverlay");


cartSidebar.classList.add("open");

cartOverlay.classList.add("show");


}

/* =========================================================
CLOSE CART
========================================================= */

function closeCart() {


const cartSidebar =
    document.getElementById("cartSidebar");

const cartOverlay =
    document.getElementById("cartOverlay");


cartSidebar.classList.remove("open");

cartOverlay.classList.remove("show");


}

/* =========================================================
CHECKOUT
========================================================= */

function checkout() {


if (cart.length === 0) {

    alert("Your cart is empty.");

    return;
}


const loggedInUser =
    JSON.parse(
        localStorage.getItem("medicareLoggedInUser")
    );


if (!loggedInUser) {

    alert(
        "Please Sign In before proceeding to checkout."
    );

    openAuthModal("signin");

    return;
}


alert(
    "Order placed successfully. Thank you for shopping with MediCare Pharmacy."
);


cart = [];

updateCart();

closeCart();


}

/* =========================================================
MOBILE MENU
========================================================= */

function toggleMenu() {


const navMenu =
    document.getElementById("navMenu");


navMenu.classList.toggle("show");

}

/* =========================================================
AUTH MODAL
========================================================= */

function openAuthModal(type = "signin") {


const authModal =
    document.getElementById("authModal");

const authOverlay =
    document.getElementById("authOverlay");


authModal.classList.add("show");

authOverlay.classList.add("show");

document.body.classList.add("modal-open");


switchAuth(type);

}

/* =========================================================
CLOSE AUTH MODAL
========================================================= */

function closeAuthModal() {


const authModal =
    document.getElementById("authModal");

const authOverlay =
    document.getElementById("authOverlay");


authModal.classList.remove("show");

authOverlay.classList.remove("show");

document.body.classList.remove("modal-open");


}

/* =========================================================
SWITCH SIGN IN / SIGN UP
========================================================= */

function switchAuth(type) {


const signinBox =
    document.getElementById("signinFormBox");

const signupBox =
    document.getElementById("signupFormBox");


if (type === "signup") {

    signinBox.style.display = "none";

    signupBox.style.display = "block";

} else {

    signupBox.style.display = "none";

    signinBox.style.display = "block";

}


}

/* =========================================================
SIGN UP
========================================================= */

document
.getElementById("signupForm")
.addEventListener("submit", function(event) {


    event.preventDefault();


    const name =
        document
            .getElementById("signupName")
            .value
            .trim();


    const email =
        document
            .getElementById("signupEmail")
            .value
            .trim()
            .toLowerCase();


    const password =
        document
            .getElementById("signupPassword")
            .value;


    const confirmPassword =
        document
            .getElementById("signupConfirmPassword")
            .value;


    if (password !== confirmPassword) {

        alert(
            "Passwords do not match."
        );

        return;
    }


    const existingUser =
        JSON.parse(
            localStorage.getItem("medicareUser")
        );


    if (
        existingUser &&
        existingUser.email === email
    ) {

        alert(
            "An account with this email already exists. Please Sign In."
        );

        switchAuth("signin");

        document
            .getElementById("signinEmail")
            .value = email;

        return;
    }


    const user = {

        name: name,

        email: email,

        password: password

    };


    localStorage.setItem(
        "medicareUser",
        JSON.stringify(user)
    );


    alert(
        "Account created successfully! Please Sign In."
    );


    this.reset();


    switchAuth("signin");


    document
        .getElementById("signinEmail")
        .value = email;

});


/* =========================================================
SIGN IN
========================================================= */

document
.getElementById("signinForm")
.addEventListener("submit", function(event) {


    event.preventDefault();


    const email =
        document
            .getElementById("signinEmail")
            .value
            .trim()
            .toLowerCase();


    const password =
        document
            .getElementById("signinPassword")
            .value;


    const savedUser =
        JSON.parse(
            localStorage.getItem("medicareUser")
        );


    if (!savedUser) {

        alert(
            "No account found. Please Sign Up first."
        );

        switchAuth("signup");

        return;
    }


    if (
        email !== savedUser.email ||
        password !== savedUser.password
    ) {

        alert(
            "Invalid email or password."
        );

        return;
    }


    localStorage.setItem(
        "medicareLoggedInUser",
        JSON.stringify(savedUser)
    );


    alert(
        `Welcome back, ${savedUser.name}!`
    );


    document
        .getElementById("signinForm")
        .reset();


    closeAuthModal();

    updateAuthUI();

});


/* =========================================================
UPDATE AUTH UI
========================================================= */

function updateAuthUI() {


const authButtons =
    document.getElementById("authButtons");

const userArea =
    document.getElementById("userArea");

const welcomeUser =
    document.getElementById("welcomeUser");


const loggedInUser =
    JSON.parse(
        localStorage.getItem("medicareLoggedInUser")
    );


if (loggedInUser) {

    authButtons.style.display = "none";

    userArea.style.display = "flex";

    welcomeUser.textContent =
        `Hi, ${loggedInUser.name}`;

} else {

    authButtons.style.display = "flex";

    userArea.style.display = "none";

}


}

/* =========================================================
LOGOUT
========================================================= */

function logoutUser() {


localStorage.removeItem(
    "medicareLoggedInUser"
);


updateAuthUI();


alert(
    "You have been logged out successfully."
);


}

/* =========================================================
CLOSE MOBILE MENU AFTER NAV CLICK
========================================================= */

document
.querySelectorAll("#navMenu a")
.forEach(link => {


    link.addEventListener("click", () => {

        document
            .getElementById("navMenu")
            .classList.remove("show");

    });

});


/* =========================================================
ESC KEY
========================================================= */

document.addEventListener(
"keydown",
function(event) {


    if (event.key === "Escape") {

        closeAuthModal();

        closeCart();

    }

}


);

/* =========================================================
INITIAL LOAD
========================================================= */

displayProducts(products);

updateCart();

updateAuthUI();
