let posts = localStorage.getItem("posts")
  ? JSON.parse(localStorage.getItem("posts"))
  : [];

  console.log(posts);

// RENDER POSTS BLOGS PAGE

let renderPosts = (arr) => {
  let blogs_container = document.getElementsByClassName("blogs-container");


  posts.forEach((post) => {

    let blog_box = document.createElement("a");
    blog_box.href = "./blog-page.html";
    blog_box.classList.add("blog-box");
    console.log(post.image)

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
  
  });

};

window.onload = () => {
  renderPosts(posts);
  console.log(posts);
};


// SINGLE BLOG PAGE