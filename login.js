// <---- LOGIN VALIDATIONS ---->

const validEmail = 'princeelysee@gmail.com', validPassword = 'nishimwe';

const api_url = "http://localhost:4000/api";

let login_email = document.getElementById("login-email");
let login_submit = document.getElementById("login-submit");
let login_password = document.getElementById("login-password");
let login_form = document.getElementById("login-form");
let login_email_error = document.getElementById("login-email-error");
let login_password_error = document.getElementById("login-password-error");
let credentials_error = document.getElementById("credentials-error");

login_submit.addEventListener("click", (e) => {
    e.preventDefault();
    const emailRegex = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)(.[a-z]+)?$/;
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

    if ((emailRegex.test(login_email.value)
        && nameRegex.test(login_password.value)
    )) {
        if (login_email.value == validEmail && login_password.value == validPassword) {
        login_email_error.style.display = "none";
        login_password_error.style.display = "none";

        var logins = {
            email: login_email.value.trim(),
            password: login_password.value.trim()
        }
        
        console.log(logins);

        fetch(`${api_url}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(logins)
        })
        .then(res => res.json())
        .then((data) => {
            document.cookie = `token=${data.token}; Path=/;`;
            console.log(data)

            if (data.token) {
                setTimeout(() => {
                    window.location.href = "./dashboard-home.html";
                }, 3000);
            }

        })
        .catch((err) => {
            console.log(err);
        });

        login_email.value = "";
        login_password.value = "";

        sessionStorage.setItem("isLoggedIn", true);
    }
    else {
        login_email_error.style.display = "none";
        credentials_error.style.display = "block";
    }
}

    else {
        login_email_error.style.display = "block";
        console.log("error");
    }

});