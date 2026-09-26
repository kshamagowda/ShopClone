let cart = JSON.parse(localStorage.getItem("shopCart")) || [];

const buttons = document.querySelectorAll(".product-card button");

const cartCountElement = document.getElementById("cart-count");
const cartItemsElement = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");

const searchInput = document.getElementById("search-input");
const productCards = document.querySelectorAll(".product-card");


// Add Product to Cart

buttons.forEach(function (button) {

    button.addEventListener("click", function () {

        const productCard = button.parentElement;

        const productName = productCard.querySelector("h3").textContent;

        const productPrice = Number(
            productCard.querySelector("p").textContent.replace("Rs. ", "")
        );

        cart.push({
            name: productName,
            price: productPrice
        });

        saveCart();
        updateCart();

    });

});


// Save Cart

function saveCart() {

    localStorage.setItem("shopCart", JSON.stringify(cart));

}


// Update Cart

function updateCart() {

    cartItemsElement.innerHTML = "";

    let total = 0;

    cart.forEach(function (product, index) {

        total += product.price;

        const item = document.createElement("div");

        item.innerHTML = `
            <p>
                ${product.name} - Rs. ${product.price}
                <button onclick="removeFromCart(${index})">
                    Remove
                </button>
            </p>
        `;

        cartItemsElement.appendChild(item);

    });

    cartCountElement.textContent = cart.length;

    cartTotalElement.textContent = total;

    if (cart.length === 0) {
        cartItemsElement.innerHTML = "<p>Your cart is empty.</p>";
    }

}


// Remove Product

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();
    updateCart();

}


// Product Search

searchInput.addEventListener("input", function () {

    const searchText = searchInput.value.toLowerCase();

    productCards.forEach(function (card) {

        const productName = card
            .querySelector("h3")
            .textContent
            .toLowerCase();

        if (productName.includes(searchText)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});


// Load Saved Cart

updateCart();