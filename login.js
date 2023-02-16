// <---- LOGIN VALIDATIONS ---->

let login_email = document.getElementById("login-email");
let login_submit = document.getElementById("login-submit");
let login_password = document.getElementById("login-password");
let login_form = document.getElementById("login-form");
let login_email_error = document.getElementById("login-email-error");
let login_password_error = document.getElementById("login-password-error");

login_submit.addEventListener("click", (e) => {
    // e.preventDefault();
    const emailRegex = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)(.[a-z]+)?$/;
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

    if ((emailRegex.test(login_email.value)
        && nameRegex.test(login_password.value)
    )) {
        login_email_error.style.display = "none";
        login_email.value = "";
        login_form.action = './dashboard-home.html'
    }

    else {
        login_email_error.style.display = "block";
        console.log("error");
    }

});