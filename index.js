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

newsletter_submit.addEventListener("click", (e) => {
    e.preventDefault();
    const emailRegex = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)(.[a-z]+)?$/;

    if (emailRegex.test(newsletter_email.value)) {
        newsletter_success.style.display = "block";
        newsletter_error.style.display = "none";
        newsletter_email.value = "";
    }

    else {
        newsletter_error.style.display = "block";
        newsletter_success.style.display = "none";
    }
    
});

// <---- FORM VALIDATIONS ---->

let contact_name = document.getElementById("contact-form-name");
let contact_email = document.getElementById("contact-form-email");
let contact_message = document.getElementById("contact-form-message");
let contact_submit = document.getElementById("contact-form-submit");


contact_submit.addEventListener("click", (e) => {
    e.preventDefault();
    const emailRegex = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)(.[a-z]+)?$/;
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    if(
        (emailRegex.test(contact_email.value))
    && (nameRegex.test(contact_name.value))
    && (nameRegex.test(contact_message.value))
    )
    {
        contact_form_error.style.display = "none";
        contact_form_success.style.display = "block";
        console.log("success");

        contact_name.value = "";
        contact_email.value = "";
        contact_message.value = "";
    }
    else {
        contact_form_error.style.display = "block";
        contact_form_success.style.display = "none";
        console.log(contact_message.value);
    }
});