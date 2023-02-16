//NAVBAR

let hamburger_menu = document.querySelectorAll(".hamburger-icon");
let responsive_nav = document.querySelector(".navbar");

hamburger_menu[0].addEventListener("click", () => {

    hamburger_menu[0].classList.toggle("is-not-active");
    hamburger_menu[1].classList.toggle("is-not-active");
    responsive_nav.classList.toggle("hide-nav");

});

hamburger_menu[1].addEventListener("click", () => {

    hamburger_menu[0].classList.toggle("is-not-active");
    hamburger_menu[1].classList.toggle("is-not-active");
    responsive_nav.classList.toggle("hide-nav");

});

