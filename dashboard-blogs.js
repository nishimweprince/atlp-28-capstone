if (sessionStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = './login.html';
}

const wrapText = (text) => {
    let wordCount = 30;
    let words = text.split(" ");
    let truncatedText = "";
    if (words.length > wordCount) {
        truncatedText = words.slice(0, wordCount).join(" ");
    }

    return truncatedText + "...";
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

// <---- DASHBOARD INBOX ---->

let posts = localStorage.getItem("posts") 
? JSON.parse(localStorage.getItem("posts")) : [];

let blogs_container = document.querySelector('.posts-container');

let renderBlogs = (arr) => {

    let mappedArr = arr.map((post, index) => {
        return {
            title: post.title,
            body: wrapText(post.body),
            author_name: post.author_name,
            image: post.image
        }
    });

    mappedArr.forEach((post, index) => {
        
    let blog_box = document.createElement("div");
    blog_box.classList.add("blog-box");

    blog_box.innerHTML = `
    
                <div class="blog-image">
                    <img src="${post.image}" alt="Blog Image">
                </div>

                <p id="blog-id">
                    #: 0012
                </p>

                <h1>
                    ${post.title}
                </h1>

                <span class="blog-author">
                    <img src="./images/nishimwe-formal.jpg" alt="Author image">
                    <p>
                        ${post.author_name}
                    </p>
                </span>

                <p id="blog-text">
                    ${post.body}
                </p>

                <div class="blog-cta">

                    <a onclick="editPost(${index})" href="#" id="blog-edit">
                        <img src="./images/edit-icon.png" alt="" id="edit-icon">
                    </a>

                    <a onclick="deletePost(${index})" href="#" id="blog-delete">
                        <img src="./images/delete-icon.png" alt="" id="delete-icon">
                    </a>

                </div>


    `;

    blogs_container.appendChild(blog_box);

    });

}


// <---- PAGINATION ---->

let paginationLeft = document.querySelector(".direction-left");
let paginationRight = document.querySelector(".direction-right");

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
    Array.from(blogs_container.children).forEach((child, index) => {
        child.style.display = "none";
      if (index == slide) {
          child.style.display = "flex";
          console.log(child);
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
        currentPage = blogs_container.children.length - 1;
    }

    showSlide(currentPage);

});

paginationRight.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage++;
        if (currentPage > blogs_container.children.length - 1) {
            currentPage = 0;
        }
    
        showSlide(currentPage);
});


document.addEventListener("DOMContentLoaded", createPages(posts));
window.onload = () => {
    renderBlogs(posts);
}

// <---- DELETE POST ---->

let deletePost = (id) => {

    let arr = JSON.parse(localStorage.getItem('posts'));

    console.log(posts[id]);

    posts.splice(id, 1);

    localStorage.setItem('posts', JSON.stringify(posts));

    setTimeout(() => {
        window.location.reload();
    }, 1000);
    
}

let editPost = (id) => {
    console.log(posts[id]);
}