
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
            <div class="cart-empty-state items-center py-[80px] px-[20px] bg-[#fff] rounded-[10px]">
                <i class="fa-solid fa-bag-shopping text-[72px] text-[#e0e0e0] block mb-[20px]"></i>
                <h2 class="text-[24px] text-[#333] mb-[10px] font-[Poppins] font-bold normal-case tracking-normal">Your cart is empty</h2>
                <p class="text-[#888] mb-[28px]">Looks like you haven't added anything yet.</p>
                <a href="index.html" class="btn-shop-now py-[10px] px-[20px] text-[16px] w-auto inline-block cursor-pointer bg-[#6FCF97] text-[#1F6F5F] border-none no-underline mt-2 rounded-[4px] hover:bg-[#2FA084] hover:text-[#EEEEEE] hover:transform scale-[0.98] ">Start Shopping</a>
            </div>`;
        if (summary) summary.parentElement.style.display = "none";
        return;
    }

    if (summary) summary.parentElement.style.display = "";

    body.innerHTML = `
        <div class="cart-table-header grid gap-[12px] p-[12px_16px] bg-[#1F6F5F] text-white rounded-t-[8px] text-[13px] font-semibold uppercase tracking-[0.5px]" style="grid-template-columns: 2.5fr 1fr 1.2fr 1fr 40px;">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
            <span></span>
        </div>
        ${cart.map(item => `
        <div class="cart-table-row grid gap-[12px] py-[18px] px-[16px] border-b border-[#eee] items-center bg-white transition-all duration-150 hover:bg-[#f9f9f9]" style="grid-template-columns: 2.5fr 1fr 1.2fr 1fr 40px;">
            <div class="cart-product-cell flex gap-[14px] items-center">
                <a href="product-detail-page.html?id=${item.id}">
                    <img src="${item.img}" alt="${item.name}" class="w-[72px] h-[85px] object-cover rounded-[6px] bg-[#f5f5f5] shrink-0">
                </a>
                <div class="cart-product-info">
                    <p class="cart-product-name font-semibold text-[14px] text-[#222] mb-[4px]">${item.name}</p>
                    ${item.oldPrice ? `<p class="cart-was-price text-[12px] text-[#999]">Was: <del>Rs. ${item.oldPrice.toLocaleString()}</del></p>` : ""}
                </div>
            </div>
            <div class="cart-price-cell font-semibold text-[#333] text-[14px]">Rs. ${item.newPrice.toLocaleString()}</div>
            <div class="cart-qty-cell">
                <div class="qty-control flex items-center gap-[10px] border border-[#ddd] rounded-[6px] py-[4px] px-[8px] w-fit">
                    <button class="bg-transparent border-none cursor-pointer text-[12px] text-[#555] w-[22px] h-[22px] flex items-center justify-center transition-all duration-200 hover:text-[#1F6F5F]" onclick="changeQty(${item.id}, 'reduce'); renderCartPage();" title="Decrease">
                        <i class="fa-solid fa-minus"></i>
                    </button>
                    <span>${item.quantity}</span>
                    <button class="bg-transparent border-none cursor-pointer text-[12px] text-[#555] w-[22px] h-[22px] flex items-center justify-center transition-all duration-200 hover:text-[#1F6F5F]" onclick="changeQty(${item.id}, 'add'); renderCartPage();" title="Increase">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
            <div class="cart-subtotal-cell font-semibold text-[#333] text-[14px]">Rs. ${(item.newPrice * item.quantity).toLocaleString()}</div>
            <div class="cart-remove-cell">
                <button class="remove-btn bg-transparent border-none text-[#ccc] cursor-pointer text-[18px] flex items-center justify-center w-[32px] h-[32px] rounded-full transition-all duration-200 hover:text-[#e44d26] hover:bg-[#fff0ec]" onclick="removeFromCart(${item.id}); renderCartPage();" title="Remove item">
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
            <div class="summary-line flex justify-between text-[14px] text-[#555] py-[10px] border-b border-[#f5f5f5]">
                <span>Subtotal</span>
                <span>Rs. ${subtotal.toLocaleString()}</span>
            </div>
            <div class="summary-line flex justify-between text-[14px] text-[#555] py-[10px] border-b border-[#f5f5f5]">
                <span>Shipping</span>
                <span>${shipping === 0
            ? '<span class="free-shipping text-[#1F6F5F] font-bold text-[13px]">FREE</span>'
            : `Rs. ${shipping}`}</span>
            </div>
            ${shipping > 0 ? `<p class="free-shipping-note text-[12px] text-[#e44d26] mt-[8px] text-center bg-[#fff8f6] p-[8px] rounded-[6px]">Add Rs. ${(5000 - subtotal).toLocaleString()} more for free shipping!</p>` : ""}
            <div class="summary-line summary-total text-[18px] font-bold text-[#222] border-b-0 mt-[8px] pt-[16px]">
                <span>Total</span>
                <span>Rs. ${total.toLocaleString()}</span>
            </div>
            <button class="btn-checkout py-[10px] px-[20px] text-[16px] w-full inline-block cursor-pointer bg-[#6FCF97] text-[#1F6F5F] border-none mt-2 rounded-[4px] hover:bg-[#2FA084] hover:text-[#EEEEEE] hover:transform scale-[0.98]">
                <i class="fa-solid fa-lock"></i> Secure Checkout
            </button>
            <div class="payment-icons flex justify-center gap-[14px] mt-[32px] text-[28px] text-[#888]">
                <i class="fa-brands fa-cc-visa"></i>
                <i class="fa-brands fa-cc-mastercard"></i>
                <i class="fa-solid fa-money-bill-wave"></i>
            </div>
            <p class="payment-note  text-center text-[12px] text-[#bbb] mt-[10px] flex items-center justify-center gap-[6px]"><i class="fa-solid fa-shield-halved"></i> Secure & encrypted payment</p>
        `;
    }
}

document.addEventListener("DOMContentLoaded", renderCartPage);
