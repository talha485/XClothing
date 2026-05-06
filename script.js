function initSlider() {

    let slides = document.querySelector('.slides');
    if (slides) {

        let index = 0;


        let totalSlides = document.querySelectorAll('.slide').length;

        setInterval(function () {
            index++;

            if (index >= totalSlides) {
                index = 0;
            }

            slides.style.transform = "translateX(-" + index * 100 + "%)";
        }, 2000);
    }
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
document.addEventListener("DOMContentLoaded", function() {
    initSlider();
    initContactForm();
    loadHeaderFooter();
})