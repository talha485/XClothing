if (typeof products !== "undefined") {

    const productId = new URLSearchParams(window.location.search).get('id');

    const product = products.find(p => p.id === Number(productId));

    const container = document.getElementById('detail-content');


    if (product) {
        container.innerHTML = `
            <div class="detail-wrapper">
                <div class="image-box">
                    <img src="${product.img}" alt="${product.name}">
                </div>
               <div class="info-box">

    <p class="detail-product-name">${product.name}</p>

    <p class="category">
        Category: ${product.category}
    </p>

    <div class="price">
        ${product.oldPrice ? `<span class="old-price">Rs. ${product.oldPrice}</span>` : ''}
        <span class="new-price">Rs. ${product.newPrice}</span>
    </div>

    <p class="detail-description">
        High quality ${product.name} from X Clothing's latest collection.
    </p>

    <button class="btn-add-cart">
        ADD TO CART
    </button>

</div>

        `;
        const btn = document.querySelector(".btn-add-cart");

        btn.addEventListener("click", () => {
            addToCart(product);
        });
    }
    else {
        container.innerHTML = "<h2>Product Not Found</h2><a href='index.html'>Back to Home</a>";
    }
}

