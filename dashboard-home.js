if (sessionStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "./login.html";
}
const url = "https://angry-leotard-frog.cyclic.app/api";

// <--- FORM ELEMENTS --->

// SUBMIT BUTTON
let blog_submit = document.getElementById("blog-submit");

// FORM INPUTS
let blog_title = document.getElementById("blog-title");
let blog_body = document.getElementById("blog-body");
let blog_image = document.getElementById("blog-image");
let author_name = document.getElementById("author-name");
let author_twitter = document.getElementById("author-twitter");
let author_linkedin = document.getElementById("author-linkedin");
let author_github = document.getElementById("author-github");
let file = null;

// CREATE BLOG FEEDBACK

const create_blog_error = document.getElementById("create-blog-error");
const create_blog_success = document.getElementById("create-blog-success");
const create_blog_loader = document.getElementById("create-blog-loader");
const validate_error = document.getElementById("validation-error");
const create_blog_lagging = document.getElementById("create-blog-lagging");

// HANDLING IMAGE UPLOAD
blog_image.addEventListener("change", (e) => {
  let temp = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(temp);
  reader.onload = () => {
    file = reader.result;
  };
});

blog_submit.addEventListener("click", (e) => {
  e.preventDefault();

  let postObj = {
    title: blog_title.value,
    body: blog_body.value,
    image: file,
    author_name: author_name.value,
    author_twitter: author_twitter.value,
    author_linkedin: author_linkedin.value,
    author_github: author_github.value,
  };

  if (
    validateSocials(
      author_twitter.value,
      author_linkedin.value,
      author_github.value
    )
  ) {
    console.log("Valid socials");
    create_blog_loader.style.display = "block";
    validate_error.style.display = "none";

    setTimeout(() => {
      create_blog_loader.style.display = "none";
      create_blog_lagging.style.display = "block";
    }, 5000);

    const cookie = document.cookie.split("=")[1];
    console.log(cookie);

    fetch(`${url}/blogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json", credentials: `${cookie}` },
      body: JSON.stringify(postObj),
    })
      .then((res) => res.json())
      .then((data) => {
        create_blog_loader.style.display = "none";
        create_blog_success.style.display = "block";
        create_blog_error.style.display = "none";
        validate_error.style.display = "none";
        create_blog_lagging.style.display = "none";

        setTimeout(() => {
          window.location.href = "/dashboard-blogs.html";
        }, 1500);

        console.log(data.data);
      })
      .catch((err) => {
        create_blog_loader.style.display = "none";
        create_blog_success.style.display = "none";
        create_blog_error.style.display = "block";
        create_blog_lagging.style.display = "none";
        validate_error.style.display = "none";
      });
  } else {
    console.log("Invalid socials");
    validate_error.style.display = "block";
  }
});

const validateSocials = (twitter, linkedin, github) => {
  let linkedinRegex =
    /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)\/([-a-zA-Z0-9]+)\/*/gm;
  const linkedinValid = linkedinRegex.test(linkedin);

  let twitterRegex =
    /(https:\/\/twitter.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/g;
  const twitterValid = twitterRegex.test(twitter);

  let githubRegex =
    /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_]{1,25}$/gim;
  const githubValid = githubRegex.test(github);

  return linkedinValid && twitterValid && githubValid;
};

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

// LOGOUT BUTTON
const logout = document.getElementById("dashboard-logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
  sessionStorage.setItem("isLoggedIn", false);
  console.log("Logged out");
  setTimeout(() => {
    window.location.href = "./login.html";
  }, 1000);
});
