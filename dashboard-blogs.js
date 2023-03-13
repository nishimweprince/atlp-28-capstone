if (sessionStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "./login.html";
}

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
};

// DOTS CONTAINER

const dots_container = document.querySelectorAll(".carousel-dots");


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

// API URL
const api_url = "https://angry-leotard-frog.cyclic.app/api";

// COOKIE
const cookie = document.cookie.split("=")[1];


// FETCH BLOGS

fetch(`${api_url}/blogs`, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    let results = data.data;
    console.log(results);
    renderBlogs(results);
    dots_container[0].append(...createDots(results));
    console.log(dots_container[0]);
  });

let blogs_container = document.querySelector(".posts-container");

let renderBlogs = (arr) => {
  let mappedArr = arr.map((post, index) => {
    return {
      id: post._id,
      title: post.title,
      body: wrapText(post.body),
      author_name: post.author_name,
      image: post.image,
    };
  });

  mappedArr.forEach((post, index) => {
    let blog_box = document.createElement("div");
    blog_box.classList.add("blog-box");

    console.log(post);

    blog_box.innerHTML = `
    
                <div class="blog-image">
                    <img src="${post.image}" alt="Blog Image">
                </div>
                <p id="blog-id">
                    #: 00${index + 1}
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
    `;

    // CREATE BLOG CTA
    const blog_cta = document.createElement("div");
    blog_cta.classList.add("blog-cta");

    // ADD EDIT BUTTON
    const edit_btn = document.createElement("a");
    edit_btn.setAttribute("href", "#");
    edit_btn.setAttribute("id", "blog-edit");
    edit_btn.innerHTML = `<img src="./images/edit-icon.png" alt="" id="edit-icon">`;

    // EDIT BUTTON EVENT LISTENERS
    edit_btn.addEventListener("click", (e) => {
      e.preventDefault();

      let edit_modal_container = document.querySelector(
        ".edit-modal-container"
      );

      fetch(`${api_url}/blogs/${post.id}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          let edit_form = document.querySelector(".edit-form-container");
          console.log(data);

          const blog = data.data;

          console.log(blog);

          edit_modal_container.style.display = "flex";

          edit_form.innerHTML = `
            
            <span class="input-container">
                            <label for="blog-title">Blog Title</label>
                            <input type="text" value="${blog.title}" name="blog-title" id="blog-title">
                        </span>
            
                        <span class="input-container">
                            <label for="blog-content">Author name</label>
                            <input type="text" name="author-name" value="${blog.author_name}" id="author-name">
                        </span>
            
                        <span class="input-container">
                            <label for="blog-body">Blog Body</label>
                            <textarea name="blog-body" id="blog-body" cols="30" rows="10">${blog.body}</textarea>
                        </span>
            <p id="blog-update-loader">Updating blog...</p>
            <p id="blog-update-success">Blog updated successfully</p>
            <p id="blog-update-error">Could not update blog, please try again</p>
            
            `;

          // UPDATE BUTTON
          const edit_cta = document.createElement("span");
          edit_cta.classList.add("edit-blog-cta");

          const update_btn = document.createElement("input");
          update_btn.setAttribute("type", "submit");
          update_btn.setAttribute("class", "btn-primary");
          update_btn.setAttribute("value", "Update blog");
          update_btn.setAttribute("id", "blog-submit");
          update_btn.addEventListener("click", (e) => {
            e.preventDefault();

            // DEFINE UPDATE FUNCTION

            let blog_update_loader = document.querySelector(
              "#blog-update-loader"
            );
            let blog_update_success = document.querySelector(
              "#blog-update-success"
            );
            let blog_update_error =
              document.querySelector("#blog-update-error");

            blog_update_loader.style.display = "block";
            blog_update_success.style.display = "none";
            blog_update_error.style.display = "none";

            let blog_title = document.querySelector("#blog-title").value;
            let blog_body = document.querySelector("#blog-body").value;
            let author_name = document.querySelector("#author-name").value;

            let blogUpdated = {
              title: blog_title,
              body: blog_body,
              author_name: author_name,
            };

            fetch(`${api_url}/blogs/${blog._id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                credentials: `${cookie}`,
              },
              body: JSON.stringify(blogUpdated),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);

                blog_update_loader.style.display = "none";
                blog_update_success.style.display = "block";

                setTimeout(() => {
                  window.location.reload();
                }, 1500);
              })
              .catch((err) => {
                console.log(err);
                blog_update_error.style.display = "block";
                blog_update_success.style.display = "none";
                blog_update_loader.style.display = "none";
              });

            console.log(blog._id, blogUpdated);
          });

          edit_cta.appendChild(update_btn);
          edit_form.appendChild(edit_cta);
        });

      blog_box.appendChild(blog_cta);

      blogs_container.appendChild(blog_box);

      console.log(blog_box);
    });

    // ADD DELETE BUTTON
    const delete_btn = document.createElement("a");
    delete_btn.setAttribute("href", "#");
    delete_btn.setAttribute("id", "blog-delete");
    delete_btn.innerHTML = `<img src="./images/delete-icon.png" alt="" id="delete-icon">`;

    // BLOG DELETE FEEDBACKS

    const delete_feedback = document.createElement("span");
    delete_feedback.classList.add("delete-feedback");

    const delete_loader = document.createElement("p");
    delete_loader.setAttribute("id", "blog-delete-loader");
    delete_loader.innerHTML = "You are deleting this blog...";

    const delete_success = document.createElement("p");
    delete_success.setAttribute("id", "blog-delete-success");
    delete_success.innerHTML = "Blog deleted successfully";

    const delete_error = document.createElement("p");
    delete_error.setAttribute("id", "blog-delete-error");
    delete_error.innerHTML = "Could not delete blog, please try again";

    delete_feedback.appendChild(delete_loader);
    delete_feedback.appendChild(delete_success);
    delete_feedback.appendChild(delete_error);

    // DELETE BUTTON EVENT LISTENERS
    delete_btn.addEventListener("click", (e) => {
      e.preventDefault();

      delete_loader.style.display = "block";
      delete_success.style.display = "none";
      delete_error.style.display = "none";

      fetch(`${api_url}/blogs/${post.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          credentials: `${cookie}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          delete_loader.style.display = "none";
          delete_success.style.display = "block";
          delete_error.style.display = "none";

          setTimeout(() => {
            window.location.reload();
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
          delete_loader.style.display = "none";
          delete_success.style.display = "none";
          delete_error.style.display = "block";
        });
    });

    blog_cta.appendChild(edit_btn);
    blog_cta.appendChild(delete_btn);

    blog_box.appendChild(blog_cta);
    blog_box.appendChild(delete_feedback);
    blogs_container.appendChild(blog_box);
  });
};

// <---- PAGINATION ---->

let paginationLeft = document.querySelector(".direction-left");
let paginationRight = document.querySelector(".direction-right");

let page_container = document.querySelector(".page-numbers-container");

let currentPage = 0;

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

let showSlide = (slide) => {
  Array.from(blogs_container.children).forEach((child, index) => {
    child.style.display = "none";
    if (index == slide) {
      child.style.display = "flex";
    }
  });
  Array.from(dots_container[0].children).forEach((dot, index) => {
    dot.classList.remove("dot-fill");
    if (index == slide) {
        dot.classList.add("dot-fill");
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

// CLOSE MODAL
const close_modal = document.querySelector(".close-icon");

close_modal.addEventListener("click", (e) => {

  const edit_modal_container = document.querySelector(".edit-modal-container");

  e.preventDefault();

  edit_modal_container.style.display = "none";
});