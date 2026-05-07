document.addEventListener("DOMContentLoaded", function () {
    let index = 0;
    let slides = document.querySelector(".slides");
    let totalSlides = document.querySelectorAll(".slide").length;
    let nextSlide = document.querySelector(".arrow-next");
    let prevSlide = document.querySelector(".arrow-prev");
    let sliderInterval;


    function moveSlider() {
        if (!slides) return;
        if (index >= totalSlides)
            index = 0;
        if (index < 0)
            index = totalSlides - 1;

        slides.style.transform = `translateX(-${index * 100}%)`;
    }

    function initSlider() {
        sliderInterval = setInterval(function () {
            index++;
            moveSlider();
        }, 2000);
    }
    function stopSlider() {
        clearInterval(sliderInterval);
    }
    slides.addEventListener("mouseenter", stopSlider);
    slides.addEventListener("mouseleave", initSlider);

    function initContactForm() {
        let form = document.getElementById("contactForm");

        if (form) {
            form.addEventListener("submit", function (e) {
                e.preventDefault();
                alert("Form submitted");
                form.reset();
            });
        }
    }

    function loadHeaderFooter() {
        fetch("header.html")
            .then(res => res.text())
            .then(data => {
                document.getElementById("header").innerHTML = data;
                initSliderButtons();
            });

        fetch("footer.html")
            .then(res => res.text())
            .then(data => {
                document.getElementById("footer").innerHTML = data;
            });
    }

    function initSliderButtons() {

        if (nextSlide && prevSlide) {

            nextSlide.addEventListener("click", function () {
                index++;
                moveSlider();
            });

            prevSlide.addEventListener("click", function () {
                index--;
                moveSlider();
            });


        }

    }
    initSlider();
    initContactForm();
    loadHeaderFooter();

});