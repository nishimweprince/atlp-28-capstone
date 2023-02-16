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

let showSlide = (slide) => {
  
    Array.from(boxContainer).forEach((box, index) => {
        Array.from(box.children).forEach((child, index) => {
            child.style.display = "none";
            if (index == slide) {
                child.style.display = "flex";
            }
        });
        Array.from(dotsContainer[index].children).forEach((dot, index) => {
            dot.classList.remove("dot-fill");
            if (index == slide) {
                dot.classList.add("dot-fill");
            }
        });
    });

};

// CAROUSEL NAVIGATION

carouselLeft.forEach((left, index) => {
  left.addEventListener("click", (e) => {
    e.preventDefault();
    currentSlide--;
    if (currentSlide < 0) {
      currentSlide = boxes.length - 1;
    }
    showSlide(currentSlide);
  });
});

carouselRight.forEach((right, index) => {

  right.addEventListener("click", (e) => {
    e.preventDefault();
    currentSlide++;
    if (currentSlide > boxes.length - 1) {
      currentSlide = 0;
    }
    showSlide(currentSlide);
  });
});

window.onload = () => {
  Array.from(boxContainer).forEach((box, index) => {
    dotsContainer[index].append(...createDots(box.children));
  });
};

// SHOW THE FIRST SKILL
showSlide(currentSlide);
