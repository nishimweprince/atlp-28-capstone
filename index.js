let hamburger_menu = document.querySelectorAll(".hamburger-icon");
let responsive_nav = document.querySelector(".responsive-nav");
let close_nav = document.querySelector(".hide-nav");

hamburger_menu[0].addEventListener("click", () => {

    hamburger_menu[0].classList.toggle("is-not-active");
    hamburger_menu[1].classList.toggle("is-not-active");
    responsive_nav.classList.toggle("hide-nav");
    responsive_nav.style.transform = "translateY(0%)";

});

hamburger_menu[1].addEventListener("click", () => {

    hamburger_menu[0].classList.toggle("is-not-active");
    hamburger_menu[1].classList.toggle("is-not-active");
    responsive_nav.classList.toggle("hide-nav");
    close_nav.style.transform = "translateY(-150%)";
});