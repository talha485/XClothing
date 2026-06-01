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
function changeQty(productId, movement) {
    let cart = getCart();
    let item = cart.find(i => i.id === productId);
    if (!item) return;
    if (movement === "add") {
        item.quantity += 1;
    }
    if (movement === "reduce") {
        item.quantity -= 1;
    }
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
        <div class="flex items-center justify-between px-[24px] py-[20px] bg-[#1F6F5F] text-white shrink-0">
            <h2 class="text-[18px] font-semibold flex items-center gap-[10px] normal-case tracking-normal">
                <i class="fa-solid fa-bag-shopping"></i> Your Cart
            </h2>
            <button class="bg-[rgba(255,255,255,0.15)] border-none text-white w-[36px] h-[36px] rounded-full cursor-pointer text-[18px] flex items-center justify-center transition-all duration-200 hover:bg-[rgba(255,255,255,0.3)]" onclick="closeCartSidebar()">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
        <div id="xc-sidebar-body" class="flex-1 overflow-y-auto p-[16px]"></div>
        <div id="xc-sidebar-footer" class="p-[20px_24px] border-t border-[#eee] bg-[#fafafa] shrink-0"></div>
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
            <div class="text-center py-[60px] px-[20px] text-[#999]">
                <i class="fa-solid fa-bag-shopping text-[56px] text-[#ddd] mb-[16px] block"></i>
                <p class="text-[16px] mb-[20px] text-[#666]">Your cart is empty</p>
                <a href="index.html" onclick="closeCartSidebar()" class="text-[#1F6F5F] font-semibold no-underline">Continue Shopping</a>
            </div>`;
        footer.innerHTML = "";
        return;
    }

    body.innerHTML = cart.map(item => `
        <div class="flex gap-[12px] py-[14px] border-b border-[#eee] items-start">
            <img src="${item.img}" alt="${item.name}" class="w-[75px] h-[90px] object-cover rounded-[6px] shrink-0 bg-[#f5f5f5]">
            <div class="flex-1">
                <p class="font-semibold text-[14px] mb-[4px] text-[#222]">${item.name}</p>
                <p class="text-[13px] mb-[10px]">
                    ${item.oldPrice ? `<span class="line-through text-[#999] mr-[6px] text-[12px]">Rs. ${item.oldPrice}</span>` : ""}
                    <span class="text-[#e44d26] font-semibold">Rs. ${item.newPrice}</span>
                </p>
                <div class="flex items-center gap-[10px]">
                    <button class="bg-[#f0f0f0] border-none w-[28px] h-[28px] rounded-full cursor-pointer text-[11px] flex items-center justify-center transition-all duration-200 hover:bg-[#1F6F5F] hover:text-white" onclick="changeQty(${item.id}, 'reduce')">
                        <i class="fa-solid fa-minus"></i>
                    </button>
                    <span class="font-semibold text-[15px] min-w-[20px] text-center">${item.quantity}</span>
                    <button class="bg-[#f0f0f0] border-none w-[28px] h-[28px] rounded-full cursor-pointer text-[11px] flex items-center justify-center transition-all duration-200 hover:bg-[#1F6F5F] hover:text-white" onclick="changeQty(${item.id}, 'add')">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
            <button class="bg-transparent border-none text-[#ccc] cursor-pointer text-[16px] p-[4px] transition-all duration-200 hover:text-[#e44d26] shrink-0" onclick="removeFromCart(${item.id})">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `).join("");

    let total = cart.reduce((sum, i) => sum + i.newPrice * i.quantity, 0);
    footer.innerHTML = `
        <div class="flex justify-between text-[18px] font-bold mb-[16px] text-[#222]">
            <span>Total</span>
            <span>Rs. ${total.toLocaleString()}</span>
        </div>
        <a href="cart.html" class="w-full no-underline text-center font-semibold py-[10px] px-[20px] text-[16px] inline-block cursor-pointer mb-[12px] bg-white text-[#1F6F5F] border-2 border-[#1F6F5F] rounded-[4px] hover:bg-[#2FA084] hover:text-[#EEEEEE] hover:scale-[0.98]" onclick="closeCartSidebar()">View Full Cart</a>
        <button class="w-full font-semibold py-[10px] px-[20px] text-[16px]  inline-block cursor-pointer bg-[#6FCF97] text-[#1F6F5F] border-none rounded-[4px] hover:bg-[#2FA084] hover:text-[#EEEEEE] hover:transform scale-[0.98]">Proceed to Checkout</button>
    `;
}
document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
});
