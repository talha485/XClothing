let index = 0;

const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;

setInterval(function () {
    index++;

    if (index >= totalSlides) {
        index = 0;
    }

    slides.style.transform = "translateX(-" + index * 100 + "%)";
}, 2000);

let form = document.getElementById('contactForm');

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let message = document.getElementById('message').value;

    alert(`${name} with Phone number ${phone} & email ${email} has sent the following message: ${message}`);

    form.reset();
});
