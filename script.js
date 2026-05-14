let cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log("Page loaded cart:", cart);

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        let productWithQuantity = {
            ...product,
            quantity: 1
        };
        cart.push(productWithQuantity);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log("Updated Cart:", cart);
    alert(product.name + " added to cart");
}

function goBack() {
    window.history.back();
}


function initSlider() {
    const slidesWrapper = document.querySelector('.slides');
    const sliderContainer = document.querySelector('.hero');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');


    if (!slidesWrapper || !sliderContainer || !nextBtn || !prevBtn) {
        console.error("Slider elements missing!");
        return;
    }

    let index = 0;
    const totalSlides = document.querySelectorAll('.slide').length;
    let isPaused = false;

    function updateSlider() {
        slidesWrapper.style.transform = `translateX(-${index * 100}%)`;
    }

    function showNext() {
        index = (index + 1) % totalSlides;
        updateSlider();
    }

    function showPrev() {
        index = (index - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);


    sliderContainer.addEventListener('mouseenter', () => {
        isPaused = true;
    });
    sliderContainer.addEventListener('mouseleave', () => {
        isPaused = false;
    });

    setInterval(() => {
        if (!isPaused) {
            showNext();
        }
    }, 3000);
}

function initContactForm() {


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
}

function loadHeaderFooter() {

    fetch("header.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;
        });

    fetch("footer.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        });

}


document.addEventListener("DOMContentLoaded", function () {
    loadHeaderFooter();
    if (document.querySelector(".slides")) {
        initSlider();
    }
    initContactForm();

})
