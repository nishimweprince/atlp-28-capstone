
// <--- SMTP CREDENTIALS ---->
/*
Username: princeelysee@gmail.com
Password: 9182787AF9362A31F79FCB4D9FFFE01F3905
Server: smtp.elasticemail.com
Port: 2525
Security token: 6f7acccb-1b5d-46f5-86c3-45c7af504c84
*/

/* SmtpJS.com - v3.0.0 */
var Email = {
  send: function (a) {
    return new Promise(function (n, e) {
      (a.nocache = Math.floor(1e6 * Math.random() + 1)), (a.Action = "Send");
      var t = JSON.stringify(a);
      Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) {
        n(e);
      });
    });
  },
  ajaxPost: function (e, n, t) {
    var a = Email.createCORSRequest("POST", e);
    a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
      (a.onload = function () {
        var e = a.responseText;
        null != t && t(e);
      }),
      a.send(n);
  },
  ajax: function (e, n) {
    var t = Email.createCORSRequest("GET", e);
    (t.onload = function () {
      var e = t.responseText;
      null != n && n(e);
    }),
      t.send();
  },
  createCORSRequest: function (e, n) {
    var t = new XMLHttpRequest();
    return (
      "withCredentials" in t
        ? t.open(e, n, !0)
        : "undefined" != typeof XDomainRequest
        ? (t = new XDomainRequest()).open(e, n)
        : (t = null),
      t
    );
  },
};

const api_url = "https://angry-leotard-frog.cyclic.app/api";

const local_url = "http://localhost:4000/api";

let messages = localStorage.getItem('messages')
? JSON.parse(localStorage.getItem('messages')) : [];

// <---- HAMBURGER MENU ---->

let hamburger_menu = document.querySelectorAll(".hamburger-icon");
let responsive_nav = document.querySelector(".responsive-nav");
let close_nav = document.querySelector(".hide-nav");

hamburger_menu[0].addEventListener("click", () => {

    hamburger_menu[0].classList.toggle("is-not-active");
    hamburger_menu[1].classList.toggle("is-not-active");
    responsive_nav.classList.toggle("hide-nav");
    responsive_nav.style.transform = "translateY(0%)";

});

hamburger_menu[1].addEventListener("click", () => {

    hamburger_menu[0].classList.toggle("is-not-active");
    hamburger_menu[1].classList.toggle("is-not-active");
    responsive_nav.classList.toggle("hide-nav");
    close_nav.style.transform = "translateY(-150%)";
});

// VALIDATION FEEDBACKS

let newsletter_error = document.getElementById("newsletter-error");
let newsletter_success = document.getElementById("newsletter-success"); 

let contact_name_error = document.getElementById("contact-name-error");
let contact_email_error = document.getElementById("contact-email-error");
let contact_message_error = document.getElementById("contact-message-error");
let contact_form_success = document.getElementById("contact-form-success");
let contact_form_error = document.getElementById("contact-form-error");

// < ---- NEWSLETTER VALIDATIONS ---->

let newsletter_email = document.getElementById("newsletter-email");
let newsletter_submit = document.getElementById("newsletter-submit");
let newsletter_loader = document.getElementById("newsletter-loader");

newsletter_submit.addEventListener("click", (e) => {
    e.preventDefault();
    const emailRegex = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)(.[a-z]+)?$/;

    if (emailRegex.test(newsletter_email.value)) {
        newsletter_success.style.display = "block";
        newsletter_error.style.display = "none";
        newsletter_loader.style.display = "block";

        const email = newsletter_email.value;

        fetch(`${api_url}/newsletter`, {
          method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email})
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            newsletter_loader.style.display = "none";
            newsletter_error.style.display = "none";
            newsletter_email.value = "";
        })
        .catch((err) => {
            console.log(err);
            newsletter_loader.style.display = "none";
        });

    }

    else {
        newsletter_error.style.display = "block";
        newsletter_success.style.display = "none";
    }
    
});

  // <---- FORM VALIDATIONS ---->

  const contact_submit = document.getElementById("contact-form-submit");

  contact_submit.addEventListener("click", (e) => {
    e.preventDefault();

    const contact_name = document.getElementById("contact-form-name");
    const contact_email = document.getElementById("contact-form-email");
    const contact_message = document.getElementById("contact-form-message");
    const contact_form_loader = document.getElementById("contact-form-loader");
    
    const emailRegex =
      /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)(.[a-z]+)?$/;
    const nameRegex = /^\S.*\S$/;
    console.log(
      emailRegex.test(contact_email.value),
      nameRegex.test(contact_name.value)
    );
    if (
      emailRegex.test(contact_email.value) &&
      nameRegex.test(contact_name.value) &&
      nameRegex.test(contact_message.value)
    ) {

      contact_form_loader.style.display = "block";

      let messageObj = {
        name: contact_name.value,
        email: contact_email.value,
        body: contact_message.value,
        date: date(),
      };

      fetch(`${api_url}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageObj),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          contact_form_loader.style.display = "none";
          contact_form_error.style.display = "none";

          setTimeout(() => {
            contact_form_success.style.display = "none";
          }, 4000);

          contact_form_success.style.display = "block";
          contact_name.value = "";
          contact_email.value = "";
          contact_message.value = "";
        })
        .catch((err) => console.log(err));

      // <---- SEND EMAIL ---->

      Email.send({
        SecureToken: "6f7acccb-1b5d-46f5-86c3-45c7af504c84",
        To: "princeelysee@gmail.com",
        From: "princeelysee@gmail.com",
        Subject: `${contact_name.value} has contacted you from the website form`,
        Body: `
        ${contact_name.value} has sent you a message:
    
        ${contact_message.value}
        `,
      })
        .then((message) => {
          console.log(message, contact_email.value);
        })
        .catch((error) => {
          console.log(error);
        });

      messages.push(messageObj);
      localStorage.setItem("messages", JSON.stringify(messages));
    } else {
      contact_form_error.style.display = "block";
      contact_form_success.style.display = "none";
      console.log(contact_message.value);
    }
  });

// GET DATE

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

export { api_url, local_url,date };