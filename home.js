import { api_url } from "./index.js";

// WRAP TEXT
const wrapText = (text) => {
  let wordCount = 15;
  let words = text.split(" ");
  let truncatedText = "";
  if (words.length > wordCount) {
      truncatedText = words.slice(0, wordCount).join(" ");
  }
  else {
      truncatedText = words.join(" ");
  }

  return truncatedText + "...";
}

// UNIVERSAL VARIABLES
let boxContainer = document.querySelectorAll(".box-container");
let boxes = document.querySelectorAll(".box");

let skillsContainer = document.querySelector(".skills-container");
let skillBoxes = document.querySelectorAll(".skill-box");
let dotsContainer = document.querySelectorAll(".carousel-dots");

// BLOGS CONTAINER
let blogContainer = document.querySelector(".blogs-container");

// CAROUSEL BUTTONS
let carouselLeft = Array.from(document.querySelectorAll(".carousel-left"));
let carouselRight = Array.from(document.querySelectorAll(".carousel-right"));

let currentSlide = 0;

// FETCH BLOGS

fetch(`${api_url}/blogs`, {
  method: "GET",
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    renderBlogs(data.data);
  })

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

function loadBlog(id) {
  localStorage.setItem("blogId", id);
  window.location.href = "./blog-page.html";
}

const renderBlogs = (blogs) => {

  for (let i = 0; i < 3; i++) {
    const blog_box = document.createElement("div");
    blog_box.classList.add("blog-box");
    blog_box.classList.add("box");

    console.log(`${blogs[i]._id}`)

    blog_box.innerHTML = `

    <img src=${blogs[i].image} alt="Blog Image">

                    <div class="blog-text">
                        <h1>
                            ${wrapText(blogs[i].title)}
                        </h1>
                        <p>
                            ${wrapText(blogs[i].body)}
                        </p>
                    </div>

    `
const blog_cta = document.createElement("div");
blog_cta.classList.add("blog-cta");
const blog_cta_link = document.createElement("a");
blog_cta_link.setAttribute("href", "#");
blog_cta_link.textContent = "Read More";
blog_cta_link.addEventListener("click", (e) => {
  e.preventDefault();
  loadBlog(blogs[i]._id);
});

blog_cta.appendChild(blog_cta_link);
blog_box.appendChild(blog_cta);

    blogContainer.appendChild(blog_box);
  };

};

export {createDots}