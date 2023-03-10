let posts = localStorage.getItem("posts")
  ? JSON.parse(localStorage.getItem("posts"))
  : [];

console.log(posts);

// LIKES BUTTON
const like_button = document.getElementById("like-icon");    
const likes_count = document.getElementById("likes-number");
let count_number = likes_count.innerText;

// API URL
const api_url = "https://angry-leotard-frog.cyclic.app/api";

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
    renderSingleBlog(result);
    renderComments(result.comments);
    renderLikes(result.likes);
    createPages(result.comments);
    console.log(result.comments);
});


// SINGLE BLOG PAGE

let paginationLeft = document.querySelector(".direction-left");
let paginationRight = document.querySelector(".direction-right");

let blog_title = document.querySelector(".blog-title");

let blog_text = document.querySelector(".blog-text-container");

let blog_image = document.querySelector(".blog-image");

let renderSingleBlog = (blog) => {

    // BLOG AUTHOR

    let blog_author = document.createElement("p");

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
let comments_container = document.querySelector(".comments-container");


let comments = localStorage.getItem("comments") ? JSON.parse(localStorage.getItem("comments")) : [];

const date = () => {
  const now = new Date(Date.now());
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = now.getDate();
  const monthIndex = now.getMonth();
  const year = now.getFullYear();

  const formattedDate = `${day} ${months[monthIndex]} ${year}`;

  return formattedDate;
};

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

    comments.push(commentObj);

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
    });

    localStorage.setItem("comments", JSON.stringify(comments));

    comment_name.value = "";
    comment_email.value = "";
    comment_body.value = "";

    console.log(comment_submit);

};

// RENDER COMMENTS

let renderComments = (arr) => {

    console.log(arr)

    arr.forEach((comment) => {

    const date = new Date(comment.createdAt);

    console.log(date);

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

// <---- PAGINATION ---->


let page_container = document.querySelector(".page-numbers-container");

let currentPage = 0;


let createPages = (arr) => {
    let pages = document.createElement("ul");

    arr.forEach((element, index) => {
        let list = document.createElement("li");
        let page_number = document.createElement("a");
        page_number.classList.add("page-number");
        if (index == 0) {
            page_number.classList.add("page-current");
        }
        page_number.innerText = index + 1;
        list.appendChild(page_number);
        pages.appendChild(list);

    });
    page_container.appendChild(pages);
    console.log(pages);
}

let showSlide = (slide) => {
    Array.from(comments_container.children).forEach((child, index) => {
        child.style.display = "none";
      if (index == slide) {
          child.style.display = "flex";
      }
    });
    Array.from(page_container.children[0].children).forEach((child, index) => {
        child.children[0].classList.remove("page-current");
        if (index == slide) {
            child.children[0].classList.add("page-current");
        }
    });
};

paginationLeft.addEventListener("click", (e) => {
    e.preventDefault();
    currentPage--;
    if (currentPage < 0) {
        currentPage = comments_container.children.length - 1;
    }

    showSlide(currentPage);

});

paginationRight.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage++;
        if (currentPage > comments_container.children.length - 1) {
            currentPage = 0;
        }
    
        showSlide(currentPage);
});


comment_submit.addEventListener("click", createComment);

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
