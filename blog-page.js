import { api_url, date } from "./index.js";
let posts = localStorage.getItem("posts")
  ? JSON.parse(localStorage.getItem("posts"))
  : [];

console.log(posts);

// COMMENTS CONTAINER
let comments_container = document.getElementById("comments-container");

// MANIPULATE TAB URL
const url = window.location.href;


// LIKES BUTTON
const like_button = document.getElementById("like-icon");    
const likes_count = document.getElementById("likes-number");
let count_number = likes_count.innerText;

// BLOG LOADER
const blog_loader = document.getElementById("loader-container");

// DOTS CONTAINER
const dots_container = document.querySelectorAll(".carousel-dots");

// API URL
// const api_url = "https://angry-leotard-frog.cyclic.app/api";

// CATCH BLOG ID FROM LOCAL STORAGE
let blogId = localStorage.getItem("blogId");
console.log(blogId);

// FETCH SINGLE BLOG

fetch(`${api_url}/blogs/${blogId}`, {
    method: "GET",
})
.then((response) => response.json())
.then((data) => {
    const result = data.data;
    console.log(result)
    blog_loader.style.display = "none";
    renderSingleBlog(result);
    renderComments(result.comments);
    renderLikes(result.likes);
    dots_container[0].append(...createDots(result.comments));

    document.title = `${result.title}`;

    console.log(result.title);

    // MANIPULATE TAB URL
    const newUrl = url + '/' + result.title.toLowerCase().split(" ").join("-");

    window.history.pushState({ path: newUrl }, result.title, newUrl);
});


// SINGLE BLOG PAGE

let paginationLeft = document.querySelector(".direction-left");
let paginationRight = document.querySelector(".direction-right");

let blog_title = document.querySelector(".blog-title");

let blog_text = document.querySelector(".blog-text-container");

let blog_image = document.querySelector(".blog-image");

let author_profile = document.querySelector(".author-profile");

let renderSingleBlog = (blog) => {

    // BLOG AUTHOR

    let blog_author = document.createElement("p");
    blog_author.innerText = blog.author_name;
    author_profile.insertBefore(blog_author, author_profile.childNodes[0]);

  // BLOG HEADING
  let blog_heading = document.createElement("h1");
  let blog_date = document.createElement("p");
  blog_date.innerText = blog.createdAt.split("T")[0].split("-").reverse().join("/");
  blog_heading.innerText = blog.title;

  blog_title.appendChild(blog_heading);
  blog_title.appendChild(blog_date);

  //BLOG IMAGE
    let blog_picture = document.createElement("img");
    blog_picture.src = blog.image;
    blog_image.appendChild(blog_picture);


  // BLOG TEXT
  let blog_body = document.createElement("p");
  blog_body.innerText = blog.body;
    blog_text.appendChild(blog_body);
};

// CREATE COMMENT SECTION

let comment_name = document.getElementById("comment-name");
let comment_email = document.getElementById("comment-email");
let comment_body = document.getElementById("comment-body");
let comment_submit = document.getElementById("comment-submit");

let commentObj = {

    name: "",
    email: "",
    body: "",
    date: date()

}

// CREATE COMMENT
const createComment = (e) => {

    e.preventDefault();
    commentObj.name = comment_name.value;
    commentObj.email = comment_email.value;
    commentObj.body = comment_body.value;

    fetch(`${api_url}/blogs/${blogId}/comment`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(commentObj),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        
        setTimeout(() => {
            window.location.href = url;
        }, 1500);

        comment_name.value = "";
        comment_email.value = "";
        comment_body.value = "";
    });



};

// RENDER COMMENTS

let renderComments = (arr) => {

    // console.log(arr)

    arr.forEach((comment) => {

    const date = new Date(comment.createdAt);

    // console.log(date);

    let comment_box = document.createElement("div");
    comment_box.classList.add("comment-box");

        let comment_heading = document.createElement("p");
        comment_heading.setAttribute("id", "comment-heading");
        comment_heading.innerText = `${comment.name} says...`;

        let comment_text = document.createElement("p");
        comment_text.setAttribute("id", "comment-text");
        comment_text.innerText = comment.body;

        let comment_date = document.createElement("p");
        comment_date.setAttribute("id", "comment-date");
        comment_date.innerText = String(date).split("GMT")[0];

        comment_box.appendChild(comment_heading);
        comment_box.appendChild(comment_text);
        comment_box.appendChild(comment_date);

        comments_container.appendChild(comment_box);
    });

}


// CREATE LIKES
like_button.addEventListener("click", (e) => {
    e.preventDefault();

    const liked = like_button.getAttribute("liked");

    if (!liked || liked == "false"){
        fetch(`${api_url}/blogs/${blogId}/like`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            like_button.setAttribute("fill", "#58287F");
            like_button.setAttribute("liked", true);
            count_number = data.data.likes;
            likes_count.innerText = count_number;
            console.log(data, "liked");
        })
    }
    else {
        like_button.setAttribute("fill", "#ffff");
        like_button.setAttribute("liked", false);
        count_number = Number(count_number) - 1;
        likes_count.innerText = count_number;

        console.log("unliked");
    }

});

// RENDER LIKES COUNT

const renderLikes = (number) => {
    likes_count.innerText = number;
};

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

  // SHOW CURRENT COMMENT 

  let showSlide = (slide) => {
    Array.from(comments_container.children).forEach((child, index) => {
        child.style.display = "none";
      if (index == slide) {
          child.style.display = "flex";
      }
    });
};

// CAROUSEL BUTTONS
let carouselLeft = Array.from(document.querySelectorAll(".carousel-left"));
let carouselRight = Array.from(document.querySelectorAll(".carousel-right"));
let slide = 0;

carouselLeft.forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        if (slide > 0) {
            slide--;
            showSlide(slide);
        }
        else {
            slide = comments_container.children.length - 1;
            showSlide(slide);
        }
    });
});

carouselRight.forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        if (slide < comments_container.children.length - 1) {
            slide++;
            showSlide(slide);
        }
        else {
            slide = 0;
            showSlide(slide);
        }
    });
});

comment_submit.addEventListener("click", createComment);