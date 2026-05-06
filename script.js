const slides = document.querySelector('.slides');
if (slides) {

    let index = 0;


    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;

    setInterval(function () {
        index++;

        if (index >= totalSlides) {
            index = 0;
        }

        slides.style.transform = "translateX(-" + index * 100 + "%)";
    }, 4000);
}

let form = document.getElementById('contactForm');
if (form) {

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let phone = document.getElementById('phone').value;
        let message = document.getElementById('message').value;

        alert(`${name} with Phone number ${phone} & email ${email} has sent the following message: ${message}`);

        form.reset();
    });
}
//Header
document.addEventListener("DOMContentLoaded", function () {
    fetch("header.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;
        });
});
//Footer
document.addEventListener("DOMContentLoaded", function () {
    fetch("footer.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        });
});
function openProduct(name, price1, price2, img) {

    // single price (null or undefined)
    if (!price2) {
        window.location.href =
            `product-description-page.html?name=${name}&price=${price1}&img=${img}`;
    }

    // sale product
    else {
        window.location.href =
            `product-description-page.html?name=${name}&old=${price1}&new=${price2}&img=${img}`;
    }
}


// ================= LOAD PRODUCT DATA =================
const params = new URLSearchParams(window.location.search);

if (document.getElementById("name")) {

    let name = params.get("name");
    let oldPrice = params.get("old");
    let newPrice = params.get("new");
    let price = params.get("price");
    let img = params.get("img");

    document.getElementById("name").innerText = name;
    document.getElementById("img").src = img;

    let oldEl = document.getElementById("oldPrice");
    let newEl = document.getElementById("newPrice");

    // ===== SALE PRODUCT =====
    if (oldPrice && newPrice) {
        oldEl.innerText = "Rs. " + oldPrice;
        oldEl.style.display = "inline";

        newEl.innerText = "Rs. " + newPrice;
    }

    // ===== SINGLE PRICE =====
    else {
        oldEl.innerText = "";          // remove Rs null
        oldEl.style.display = "none";  // hide old price

        newEl.innerText = "Rs. " + price;
    }
}