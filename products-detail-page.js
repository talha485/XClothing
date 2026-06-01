if (typeof products !== "undefined") {

    const productId = new URLSearchParams(window.location.search).get('id');

    const product = products.find(p => p.id === Number(productId));

    const container = document.getElementById('detail-content');


    if (product) {
        container.innerHTML = `
            <div class="detail-wrapper flex p-[50px] gap-[50px] max-w-[1200px] mx-auto ">
                <div class="image-box flex-1">
                    <img src="${product.img}" alt="${product.name}" class="w-auto h-auto rounded-[10px]">
                </div>
               <div class="info-box flex-1">

    <p class="detail-product-name">${product.name}</p>

    <p class="category text-[#888]">
        Category: ${product.category}
    </p>

    <div class="price text-[24px] my-[20px] ">
        ${product.oldPrice ? `<span class="old-price line-through text-[grey] mr-[10px]">Rs. ${product.oldPrice}</span>` : ''}
        <span class="new-price text-[red] font-normal">Rs. ${product.newPrice}</span>
    </div>

    <p class="detail-description">
        High quality ${product.name} from X Clothing's latest collection.
    </p>

    <button class="btn-add-cart mt-[30px] py-5 bg-[#6FCF97] text-[#1F6F5F] border-none cursor-pointer w-full text-[18px] hover:bg-[#2FA084] hover:text-[#EEEEEE] hover:scale-[0.98] transition-all duration-300">
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

