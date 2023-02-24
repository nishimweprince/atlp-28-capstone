import {createNav, createFooter, createResponsiveNav, formValidations} from "./main.js";

// CREATE NAVBAR AND FOOTER

let heroNav = document.querySelector(".hero-nav");

heroNav.insertBefore(createNav(), heroNav.firstChild);
createFooter();
createResponsiveNav();
formValidations();

// UNIVERSAL VARIABLES
let boxContainer = document.querySelectorAll(".box-container");
let boxes = document.querySelectorAll(".box");

let skillsContainer = document.querySelector(".skills-container");
let skillBoxes = document.querySelectorAll(".skill-box");
let dotsContainer = document.querySelectorAll(".carousel-dots");

// CAROUSEL BUTTONS
let carouselLeft = Array.from(document.querySelectorAll(".carousel-left"));
let carouselRight = Array.from(document.querySelectorAll(".carousel-right"));

let currentSlide = 0;

// CREATE DOTS
const createDots = (arr) => {
  let dotsArray = [];

  for (let i = 0; i < arr.length; i++) {
    let dot = document.createElement("span");
    dot.classList.add("dot");
    if (i == 0) {
      dot.classList.add("dot-fill");
    }
    dotsArray.push(dot);
  }

  return dotsArray;
};

// SHOW SKILL

let showSlide = (boxContainer, dotsContainer, slide) => {
  Array.from(boxContainer.children).forEach((child, index) => {
      child.style.display = "none";
      if (index == slide) {
          child.style.display = "flex";
      }
  });

  Array.from(dotsContainer.children).forEach((dot, index) => {
      dot.classList.remove("dot-fill");
      if (index == slide) {
          dot.classList.add("dot-fill");
      }
  });
};

// CAROUSEL NAVIGATION

carouselLeft.forEach((left, index) => {

    left.addEventListener("click", (e) => {
        e.preventDefault();
        const targetCarousel = e.target.closest(".section").getAttribute("data-carousel");
        const targetBoxContainer = document.querySelector(`[data-carousel="${targetCarousel}"] .carousel-container .box-container`);
        const targetDotsContainer = document.querySelector(`[data-carousel="${targetCarousel}"] .carousel-dots`);
        console.log(targetDotsContainer);

        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = targetBoxContainer.children.length - 1;
        }
        showSlide(targetBoxContainer, targetDotsContainer, currentSlide);
    });

});

carouselRight.forEach((right, index) => {

  right.addEventListener("click", (e) => {
    e.preventDefault();

    const targetCarousel = e.target.closest(".section").getAttribute("data-carousel");
    const targetBoxContainer = document.querySelector(`[data-carousel="${targetCarousel}"] .carousel-container .box-container`);
    const targetDotsContainer = document.querySelector(`[data-carousel="${targetCarousel}"] .carousel-dots`);

    currentSlide++;
    if (currentSlide > targetBoxContainer.children.length - 1) {
      currentSlide = 0;
    }
    showSlide(targetBoxContainer, targetDotsContainer, currentSlide);
  });
});

window.onload = () => {
  Array.from(boxContainer).forEach((box, index) => {
    dotsContainer[index].append(...createDots(box.children));
  });
};