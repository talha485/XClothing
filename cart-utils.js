function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
    let cart = getCart();
    let existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            img: product.img || "",
            oldPrice: product.oldPrice || null,
            newPrice: product.newPrice,
            quantity: 1
        });
    }

    saveCart(cart);
    updateCartCount();
    openCartSidebar();
}
function removeFromCart(productId) {
    let cart = getCart().filter(item => item.id !== productId);
    saveCart(cart);
    updateCartCount();
    renderCartSidebar();
}
function changeQty(productId, delta) {
    let cart = getCart();
    let item = cart.find(i => i.id === productId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== productId);
    }
    saveCart(cart);
    updateCartCount();
    renderCartSidebar();
}
function clearCart() {
    saveCart([]);
    updateCartCount();
    renderCartSidebar();
}
function updateCartCount() {
    let cart = getCart();
    let count = cart.reduce((total, item) => total + item.quantity, 0);
    let countEl = document.getElementById("cart-count");
    if (countEl) {
        countEl.innerText = count;
        countEl.style.display = count > 0 ? "flex" : "none";
    }
}
function openCartSidebar() {
    ensureSidebarExists();
    document.getElementById("xc-cart-sidebar").classList.add("open");
    document.getElementById("xc-sidebar-overlay").classList.add("open");
    renderCartSidebar();
}
function closeCartSidebar() {
    let sidebar = document.getElementById("xc-cart-sidebar");
    let overlay = document.getElementById("xc-sidebar-overlay");
    if (sidebar) sidebar.classList.remove("open");
    if (overlay) overlay.classList.remove("open");
}
function openCart() {
    if (window.location.pathname.endsWith("cart.html")) return;
    openCartSidebar();
}

function ensureSidebarExists() {
    if (document.getElementById("xc-cart-sidebar")) return;

    let overlay = document.createElement("div");
    overlay.id = "xc-sidebar-overlay";
    overlay.onclick = closeCartSidebar;
    document.body.appendChild(overlay);

    let sidebar = document.createElement("div");
    sidebar.id = "xc-cart-sidebar";
    sidebar.innerHTML = `
        <div class="xc-sidebar-header">
            <h2><i class="fa-solid fa-bag-shopping"></i> Your Cart</h2>
            <button class="xc-close-btn" onclick="closeCartSidebar()">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
        <div id="xc-sidebar-body" class="xc-sidebar-body"></div>
        <div id="xc-sidebar-footer" class="xc-sidebar-footer"></div>
    `;
    document.body.appendChild(sidebar);
}

function renderCartSidebar() {
    let body = document.getElementById("xc-sidebar-body");
    let footer = document.getElementById("xc-sidebar-footer");
    if (!body) return;

    let cart = getCart();

    if (cart.length === 0) {
        body.innerHTML = `
            <div class="xc-empty-cart">
                <i class="fa-solid fa-bag-shopping"></i>
                <p>Your cart is empty</p>
                <a href="index.html" onclick="closeCartSidebar()">Continue Shopping</a>
            </div>`;
        footer.innerHTML = "";
        return;
    }

    body.innerHTML = cart.map(item => `
        <div class="xc-cart-item">
            <img src="${item.img}" alt="${item.name}">
            <div class="xc-item-info">
                <p class="xc-item-name">${item.name}</p>
                <p class="xc-item-price">
                    ${item.oldPrice ? `<span class="xc-old">Rs. ${item.oldPrice}</span>` : ""}
                    <span class="xc-new">Rs. ${item.newPrice}</span>
                </p>
                <div class="xc-qty-row">
                    <button onclick="changeQty(${item.id}, -1)"><i class="fa-solid fa-minus"></i></button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQty(${item.id}, 1)"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
            <button class="xc-remove-btn" onclick="removeFromCart(${item.id})">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `).join("");

    let total = cart.reduce((sum, i) => sum + i.newPrice * i.quantity, 0);
    footer.innerHTML = `
        <div class="xc-total">
            <span>Total</span>
            <span>Rs. ${total.toLocaleString()}</span>
        </div>
        <a href="cart.html" class="xc-view-cart-btn" onclick="closeCartSidebar()">View Full Cart</a>
        <button class="xc-checkout-btn">Proceed to Checkout</button>
    `;
}
document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
});
