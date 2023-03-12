import {api_url} from "./index.js";
let signup_username = document.getElementById("signup-username");
let signup_email = document.getElementById("signup-email");
let signup_submit = document.getElementById("signup-submit");
let signup_password = document.getElementById("signup-password");
let signup_confirm_password = document.getElementById("signup-confirm-password");

let signup_email_error = document.getElementById("signup-email-error");
let signup_password_error = document.querySelectorAll(".signup-password-error");
let signup_form_error = document.getElementById("signup-form-error");

let signup_success = document.getElementById("signup-success");
let signup_loader = document.getElementById("signup-loader");
let signup_error = document.getElementById("signup-error");

// REGULAR EXPRESSIONS FOR VALIDATION
const emailRegex = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)(.[a-z]+)?$/;
const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

signup_submit.addEventListener("click", (e) => {
    e.preventDefault();

    if (emailRegex.test(signup_email.value)
        && nameRegex.test(signup_username.value)
        && signup_password.value.length >= 6
        && signup_password.value == signup_confirm_password.value
    ) {
        signup_form_error.style.display = "none";
        signup_email_error.style.display = "none";
        signup_password_error.forEach((error) => {
            error.style.display = "none";
        });

        signup_loader.style.display = "block";

        var signup = {
            username: signup_username.value.trim(),
            email: signup_email.value.trim(),
            password: signup_password.value.trim()
        }

        fetch(`${api_url}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(signup)
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            signup_success.style.display = "block";
            signup_loader.style.display = "none";
            setTimeout(() => {
                window.location.href = "/login.html";
            }, 1500);
        })
        .catch((err) => {
            console.log(err);
            signup_error.style.display = "block";
            signup_loader.style.display = "none";
        });

        signup_username.value = "";
        signup_email.value = "";
        signup_password.value = "";
        signup_confirm_password.value = "";
    }
    
    else {
        signup_form_error.style.display = "block";
        console.log("error", nameRegex.test(signup_username), emailRegex.test(signup_email), signup_username ,signup_email, signup_password, signup_password == signup_confirm_password);

    }

});