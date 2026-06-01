function openSearch() {
    makeSearchBar();
    document.getElementById("xc-search-overlay").classList.add("open");
    document.getElementById("xc-search-input").focus();
}

function closeSearch() {
    document.getElementById("xc-search-overlay").classList.remove("open");
    document.getElementById("xc-search-input").value = "";
    document.getElementById("xc-search-results").innerHTML = "";
}

function makeSearchBar() {
    if (document.getElementById("xc-search-overlay")) return;

    let overlay = document.createElement("div");
    overlay.id = "xc-search-overlay";
    overlay.className = "fixed inset-0 bg-[rgba(0,0,0,0.6)] z-[2000] flex items-start justify-center pt-[100px] opacity-0 pointer-events-none transition-opacity duration-300 ease-in-out";

    overlay.innerHTML = `
        <div class="xc-search-box bg-white w-[600px] max-w-[92vw] rounded-[12px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            <div class="flex items-center p-[16px_20px] gap-[12px] border-b border-[#eee]">
                <i class="fa-solid fa-magnifying-glass text-[#aaa] text-[18px]"></i>
                <input 
                    type="text" 
                    id="xc-search-input" 
                    placeholder="Search products..."
                    oninput="handleSearch(this.value)"
                    class="flex-1 border-none outline-none text-[16px] text-[#333]"
                />
                <button onclick="closeSearch()" class="bg-[#f0f0f0] border-none w-[32px] h-[32px] rounded-full cursor-pointer text-[15px] flex items-center justify-center transition-all duration-200 hover:bg-[#e44d26] hover:text-white">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div id="xc-search-results" class="max-h-[400px] overflow-y-auto py-[8px]"></div>
        </div>
    `;

    overlay.addEventListener("click", function(e) {
        if (e.target === overlay) closeSearch();
    });

    document.body.appendChild(overlay);
}

function handleSearch(query) {
    let results = document.getElementById("xc-search-results");
    query = query.toLowerCase().trim();

    if (query === "") {
        results.innerHTML = "";
        return;
    }

    let matched = products.filter(p =>
        p.name.toLowerCase().includes(query)
    );

    if (matched.length === 0) {
        results.innerHTML = `<p class="text-center p-[30px] text-[#888] text-[14px]">No products found for "<strong>${query}</strong>"</p>`;
        return;
    }

    results.innerHTML = matched.map(p => `
        <a href="product-detail-page.html?id=${p.id}" onclick="closeSearch()" class="xc-result-item flex items-center gap-[14px] px-[20px] py-[12px] no-underline text-inherit transition-all duration-150 hover:bg-[#f9f9f9]">
            <img src="${p.img}" alt="${p.name}" class="w-[55px] h-[65px] object-cover rounded-[6px] bg-[#f5f5f5] shrink-0">
            <div class="flex-1">
                <p class="font-semibold text-[14px] text-[#222] mb-[4px]">${p.name}</p>
                <p>
                    ${p.oldPrice ? `<del class="text-[#bbb] text-[12px] mr-[6px]">Rs. ${p.oldPrice}</del>` : ""}
                    <span class="text-[#e44d26] font-semibold text-[14px]">Rs. ${p.newPrice}</span>
                </p>
            </div>
            <i class="fa-solid fa-arrow-right text-[#ccc] text-[13px]"></i>
        </a>
    `).join("");
}

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") closeSearch();
});