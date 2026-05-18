function openSearch() {
    ensureSearchExists();
    document.getElementById("xc-search-overlay").classList.add("open");
    document.getElementById("xc-search-input").focus();
}

function closeSearch() {
    document.getElementById("xc-search-overlay").classList.remove("open");
    document.getElementById("xc-search-input").value = "";
    document.getElementById("xc-search-results").innerHTML = "";
}

function ensureSearchExists() {
    if (document.getElementById("xc-search-overlay")) return;

    let overlay = document.createElement("div");
    overlay.id = "xc-search-overlay";
    overlay.innerHTML = `
        <div class="xc-search-box">
            <div class="xc-search-top">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input 
                    type="text" 
                    id="xc-search-input" 
                    placeholder="Search products..."
                    oninput="handleSearch(this.value)"
                />
                <button onclick="closeSearch()">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div id="xc-search-results"></div>
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
        results.innerHTML = `<p class="xc-no-results">No products found for "<strong>${query}</strong>"</p>`;
        return;
    }

    results.innerHTML = matched.map(p => `
        <a href="product-detail-page.html?id=${p.id}" onclick="closeSearch()" class="xc-result-item">
            <img src="${p.img}" alt="${p.name}">
            <div class="xc-result-info">
                <p class="xc-result-name">${p.name}</p>
                <p class="xc-result-price">
                    ${p.oldPrice ? `<del>Rs. ${p.oldPrice}</del>` : ""}
                    <span>Rs. ${p.newPrice}</span>
                </p>
            </div>
            <i class="fa-solid fa-arrow-right"></i>
        </a>
    `).join("");
}

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") closeSearch();
});