if (sessionStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = './login.html';
}

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

// <---- CREATE BLOGS ---->

let posts = localStorage.getItem("posts") ? JSON.parse(localStorage.getItem("posts")) : [];

// BLOG VARIABLES

let postObj = {
    title: "",
    body: "",
    image: "",
    author_name: "",
    author_twitter: "",
    author_linkedin: "",
    author_github: ""
}

const url = "https://angry-leotard-frog.cyclic.app/api";

// CREATE BLOG

let blog_submit = document.getElementById("blog-submit");

blog_submit.addEventListener("click", (e) => {

    e.preventDefault();


    let blog_title = document.getElementById("blog-title");
    let blog_body = document.getElementById("blog-body");
    let blog_image = document.getElementById("blog-image").files[0];
    let author_name = document.getElementById("author-name");
    let author_twitter = document.getElementById("author-twitter");
    let author_linkedin = document.getElementById("author-linkedin");
    let author_github = document.getElementById("author-github");

    let image = document.getElementById("display-image");

    const reader = new FileReader();
    reader.readAsDataURL(blog_image);
    reader.onload = () => {
        postObj.image = reader.result;
        postObj.title = blog_title.value;
        postObj.body = blog_body.value;
        postObj.author_name = author_name.value;
        postObj.author_twitter = author_twitter.value;
        postObj.author_linkedin = author_linkedin.value;
        postObj.author_github = author_github.value;

        posts.push(postObj);
        localStorage.setItem("posts", JSON.stringify(posts));

        const cookie = document.cookie.split('=')[1]; //
        console.log(cookie);

        fetch(`${url}/blogs`, {
            method: "POST",
            headers: { "Content-Type": "application/json",
            "credentials": `${cookie}`
        },
            body: JSON.stringify(postObj)
        })
        .then(res => res.json())
        .then(data => console.log(data))

        console.log(posts);
        blog_title.value = "";
        blog_body.value = "";
    }

});