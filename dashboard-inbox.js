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

// <---- DASHBOARD INBOX ---->

let messages = localStorage.getItem("messages") 
? JSON.parse(localStorage.getItem("messages")) : [];

// API URL
const api_url = "https://angry-leotard-frog.cyclic.app/api";

// FETCH MESSAGES

fetch(`${api_url}/messages`, {
    method: "GET",
})
.then((response) => response.json())
.then((data) => {
    const results = data.data;
    renderMessages(results);
    createPages(results);
})

let messages_container = document.querySelector('.messages-container');

let renderMessages = (arr) => {

    arr.forEach((message, index) => {

      let message_box = document.createElement("div");
      message_box.classList.add("message-box");

      let message_heading = document.createElement("p");
      message_heading.setAttribute("id", `message-heading`);
      message_heading.innerText = `${message.name} says...`;

      let message_email = document.createElement("p");
      message_email.setAttribute("id", `message-email`);
      message_email.innerText = message.email;

      let message_text = document.createElement("p");
      message_text.setAttribute("id", `message-text`);
      message_text.innerText = message.body;

      let message_date = document.createElement("p");
      message_date.setAttribute("id", `message-date`);
      message_date.innerText = message.createdAt.split("T")[0].split("-").reverse().join("/");

      message_box.appendChild(message_heading);
      message_box.appendChild(message_email);
      message_box.appendChild(message_text);
      message_box.appendChild(message_date);

      messages_container.appendChild(message_box);

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
    Array.from(messages_container.children).forEach((child, index) => {
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
        currentPage = messages_container.children.length - 1;
    }

    showSlide(currentPage);

});

paginationRight.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage++;
        if (currentPage > messages_container.children.length - 1) {
            currentPage = 0;
        }
    
        showSlide(currentPage);
});
