import {api_url} from "./index.js";
let posts = localStorage.getItem("posts")
  ? JSON.parse(localStorage.getItem("posts"))
  : [];

  const blogs_loader = document.getElementById("loader-container");
  // const api_url = "https://angry-leotard-frog.cyclic.app/api";

  fetch(`${api_url}/blogs`, {
    method: "GET"
  })
    .then((response) => response.json())
    .then((data) => {
      let blogs_container = document.getElementById("blogs-container");
      blogs_container.style.display = "flex";
      blogs_loader.style.display = "none";
      const results = data.data;
      renderPostsAll(results);
    });
    

// RENDER POSTS BLOGS PAGE
function renderPostsAll(arr) {
  let blogs_container = document.getElementsByClassName("blogs-container");


  arr.forEach((post) => {

    let blog_box = document.createElement("a");
    blog_box.href = "./blog-page.html";
    blog_box.classList.add("blog-box");

    blog_box.innerHTML = `

                <span>
                <img id="blog-image" src="${post.image}" alt="">
                </span>

                <h1>
                    ${post.title}
                </h1>

                <div class="blog-tags">

                    <p>
                        Javascript
                    </p>

                    <p>
                        Frontend
                    </p>

                </div>
  `;

  blogs_container[0].appendChild(blog_box);

  console.log(post._id);

  blog_box.addEventListener("click", () => {
    localStorage.setItem("blogId", post._id);
  });

})
}