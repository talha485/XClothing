
function renderCartPage() {
    let cart = getCart();
    let body = document.getElementById("cart-page-body");
    let summary = document.getElementById("cart-summary-body");
    let countEl = document.getElementById("cart-item-count");

    if (!body) return;

    let totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
    if (countEl) countEl.textContent = totalItems + " item" + (totalItems !== 1 ? "s" : "");

    if (cart.length === 0) {
        body.innerHTML = `
            <div class="cart-empty-state">
                <i class="fa-solid fa-bag-shopping"></i>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything yet.</p>
                <a href="index.html" class="btn-shop-now">Start Shopping</a>
            </div>`;
        if (summary) summary.parentElement.style.display = "none";
        return;
    }

    if (summary) summary.parentElement.style.display = "";

    body.innerHTML = `
        <div class="cart-table-header">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
            <span></span>
        </div>
        ${cart.map(item => `
        <div class="cart-table-row">
            <div class="cart-product-cell">
                <a href="product-detail-page.html?id=${item.id}">
                    <img src="${item.img}" alt="${item.name}">
                </a>
                <div class="cart-product-info">
                    <p class="cart-product-name">${item.name}</p>
                    ${item.oldPrice ? `<p class="cart-was-price">Was: <del>Rs. ${item.oldPrice.toLocaleString()}</del></p>` : ""}
                </div>
            </div>
            <div class="cart-price-cell">Rs. ${item.newPrice.toLocaleString()}</div>
            <div class="cart-qty-cell">
                <div class="qty-control">
                    <button onclick="changeQty(${item.id}, 'reduce'); renderCartPage();" title="Decrease">
                        <i class="fa-solid fa-minus"></i>
                    </button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQty(${item.id}, 'add'); renderCartPage();" title="Increase">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
            <div class="cart-subtotal-cell">Rs. ${(item.newPrice * item.quantity).toLocaleString()}</div>
            <div class="cart-remove-cell">
                <button class="remove-btn" onclick="removeFromCart(${item.id}); renderCartPage();" title="Remove item">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
        `).join("")}
    `;

    let subtotal = cart.reduce((sum, i) => sum + i.newPrice * i.quantity, 0);
    let shipping = subtotal >= 5000 ? 0 : 299;
    let total = subtotal + shipping;

    if (summary) {
        summary.innerHTML = `
            <div class="summary-line">
                <span>Subtotal</span>
                <span>Rs. ${subtotal.toLocaleString()}</span>
            </div>
            <div class="summary-line">
                <span>Shipping</span>
                <span>${shipping === 0
            ? '<span class="free-shipping">FREE</span>'
            : `Rs. ${shipping}`}</span>
            </div>
            ${shipping > 0 ? `<p class="free-shipping-note">Add Rs. ${(5000 - subtotal).toLocaleString()} more for free shipping!</p>` : ""}
            <div class="summary-line summary-total">
                <span>Total</span>
                <span>Rs. ${total.toLocaleString()}</span>
            </div>
            <button class="btn-checkout">
                <i class="fa-solid fa-lock"></i> Secure Checkout
            </button>
            <div class="payment-icons">
                <i class="fa-brands fa-cc-visa"></i>
                <i class="fa-brands fa-cc-mastercard"></i>
                <i class="fa-solid fa-money-bill-wave"></i>
            </div>
            <p class="payment-note"><i class="fa-solid fa-shield-halved"></i> Secure & encrypted payment</p>
        `;
    }
}

document.addEventListener("DOMContentLoaded", renderCartPage);
