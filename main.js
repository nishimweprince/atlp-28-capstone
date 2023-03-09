// <--- SMTP CREDENTIALS ---->
/*
Username: princeelysee@gmail.com
Password: 9182787AF9362A31F79FCB4D9FFFE01F3905
Server: smtp.elasticemail.com
Port: 2525
Security token: 6f7acccb-1b5d-46f5-86c3-45c7af504c84
*/

let createNav = () => {
  let navContainer = document.createElement("div");
  navContainer.classList.add("nav-container");

  let navbar = document.createElement("nav");
  navbar.classList.add("navbar");

  var hamburgerClose = document.createElement("a");
  hamburgerClose.classList.add("hamburger-icon");
  hamburgerClose.classList.add("is-not-active");
  hamburgerClose.setAttribute("id", "hamburger-close");

  hamburgerClose.innerHTML = `
      
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                          stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round"
                              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
  
      `;

  var hamburgerOpen = document.createElement("a");
  hamburgerOpen.classList.add("hamburger-icon");
  hamburgerOpen.setAttribute("id", "hamburger-open");

  hamburgerOpen.innerHTML = `
      
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                          stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round"
                              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
  
      `;

  navbar.innerHTML = `
      
      <div class="logo">
                  <a href="./index.html">
                      <img src="images/logo.png" alt="Logo">
                  </a>
              </div>
  
              <div class="nav-links">
                  <ul>
                      <li><a href="#about">About</a></li>
                      <li><a href="./blogs.html">Blog</a></li>
                      <li><a href="#footer">Contact</a></li>
                  </ul>
              </div>
  
              <div class="navbar-cta">
                  <a class="primary-button" href="#portfolio">Portfolio</a>
              </div>
  
              <div class="hamburger responsive">
                  ${hamburgerOpen.outerHTML}
                  ${hamburgerClose.outerHTML}
              </div>
  
      `;

  let responsiveNav = document.createElement("div");
  responsiveNav.classList.add("responsive-nav");
  responsiveNav.classList.add("hide-nav");

  responsiveNav.innerHTML = `
      
      <div class="nav-links">
                  <ul>
                      <li><a href="#about">About</a></li>
                      <li><a href="./blogs.html">Blog</a></li>
                      <li><a href="#footer-form">Contact</a></li>
                  </ul>
              </div>
  
              <div class="navbar-cta">
                  <a class="primary-button" href="#portfolio">Portfolio</a>
              </div>
  
      `;

  navContainer.appendChild(navbar);
  navContainer.appendChild(responsiveNav);
  return navContainer;
};

let createFooter = () => {
  let footer = document.createElement("footer");
  footer.classList.add("footer");

  footer.innerHTML = `
    
    <!-- FOOTER UP -->

        <div class="footer-up">

            <span>
                <div class="quick-links">

                    <h1>
                        Quick Links
                    </h1>
    
                    <ul>
    
                        <li>
                            <a href="#about">
                                About
                            </a>
                        </li>
    
                        <li>
                            <a href="./blogs.html">
                                Blog
                            </a>
                        </li>
    
                        <li>
                            <a href="#footer">
                                Contact
                            </a>
                        </li>
    
                        <li>
                            <a id="admin-link" href="./login.html">
                                Admin
                            </a>
                        </li>
    
                    </ul>
    
                </div>

                <div class="newsletter">
                        
                        <h1>
                            Newsletter
                        </h1>
    
                        <p>
                            Subscribe to our newsletter and get our latest news and updates.
                        </p>
    
                        <form id="newsletter-form" action="">
                            <input type="email" id="newsletter-email" placeholder="Email">
                            <p id="newsletter-error">Please enter a valid email</p>
                            <p id="newsletter-success">You have subscribed to our newsletter successfully!</p>
                            <div class="form-submit">
                                <input class="primary-button" id="newsletter-submit" type="submit" value="Subscribe">
                            </div>
                        </form>
                </div>
            </span>

            <div class="form-container" id="footer-form">

                <h1>
                    Leave a quick message
                </h1>

                <form action="">
                    <input type="text" id="contact-form-name" placeholder="Name">
                    <p id="contact-name-error">
                        Please enter a valid name
                    </p>
                    <input type="email" id="contact-form-email" placeholder="Email">
                    <p id="contact-email-error">
                        Please enter a valid email
                    </p>
                    <textarea name="" id="contact-form-message" cols="50" rows="5" placeholder="Message"></textarea>
                    <p id="contact-message-error">
                        Please enter a valid message
                    </p>
                    <p id="contact-form-success">
                        Thank you for reaching out!
                        You will get confirmation when we receive your message
                    </p>
                    <p id="contact-form-error">
                        Please make sure you have provided valid information
                    </p>
                    <div class="form-submit">
                        <input class="primary-button" id="contact-form-submit" type="submit" value="Send">
                    </div>
                </form>

            </div>

        </div>

        <!-- FOOTER DOWN  -->

        <div class="footer-down">

            <div class="copyright-heading">

                <h1>
                    nishimwe<span>Prince</span>
                </h1>
                <p>
                    <span>Fullstack Web Developer</span> & IT Support
                </p>

            </div>

            <div class="copyright-social-icons">

                <ul>
                    <li>
                        <a href="https://github.com/nishimweprince">
                            <img src="./images/github-icon.png" alt="Github icon">
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/nishimweprince">
                            <img src="./images/linkedin-icon.png" alt="LinkedIn icon">
                        </a>
                    </li>
                    <li>
                        <a href="https://www.twitter.com/nishimweprince">
                            <img src="./images/twitter-icon.png" alt="Twitter icon">
                        </a>
                    </li>
                </ul>

            </div>

            <div class="copyright-footer">

                <p>
                    &copy; 2023 Nishimwe Prince
                </p>

                <p>
                    All rights reserved
                </p>

            </div>

        </div>

    `;

  document.body.appendChild(footer);
};

let formValidations = () => {
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

  let messages = localStorage.getItem("messages")
    ? JSON.parse(localStorage.getItem("messages"))
    : [];

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

  newsletter_submit.addEventListener("click", (e) => {
    e.preventDefault();
    const emailRegex =
      /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)(.[a-z]+)?$/;

    if (emailRegex.test(newsletter_email.value)) {
      newsletter_success.style.display = "block";
      newsletter_error.style.display = "none";
      newsletter_email.value = "";
    } else {
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
      let messageObj = {
        name: contact_name.value,
        email: contact_email.value,
        body: contact_message.value,
        date: date(),
      };

      contact_form_error.style.display = "none";
      contact_form_success.style.display = "block";
      contact_name.value = "";
      contact_email.value = "";
      contact_message.value = "";

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
          alert("We have received your message in our inbox");
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
};

let createResponsiveNav = () => {
  let hamburgerOpen = document.getElementById("hamburger-open");
  let hamburgerClose = document.getElementById("hamburger-close");
  let responsiveNav = document.querySelector(".responsive-nav");
  hamburgerOpen.addEventListener("click", (e) => {
    e.preventDefault();

    hamburgerOpen.classList.toggle("is-not-active");
    hamburgerClose.classList.toggle("is-not-active");
    responsiveNav.classList.toggle("hide-nav");
  });

  hamburgerClose.addEventListener("click", (e) => {
    e.preventDefault();

    hamburgerOpen.classList.toggle("is-not-active");
    hamburgerClose.classList.toggle("is-not-active");
    responsiveNav.classList.toggle("hide-nav");
  });
};

export { createNav, createFooter, createResponsiveNav, formValidations };
