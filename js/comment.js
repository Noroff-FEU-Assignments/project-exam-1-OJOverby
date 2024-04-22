// Form validation for the comments on the post page

import { handleSubmit } from "./functions/handleSubmit.js";

const form = document.querySelector(".new-comment");
const fullName = document.querySelector("#fullName");
const nameError = document.querySelector("#nameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError")
const message = document.querySelector("#comment");
const msgError = document.querySelector("#msgError");

function validateForm(event) {
    event.preventDefault();
    let validForm = true;

    if (fullName.value.length >= 3) {
        nameError.style.display = "none";
    } else {
        nameError.style.display = "block";
        validForm = false;
    }

    if(validateEmail(email.value)){
        emailError.style.display = "none";
    } else {
        emailError.style.display = "block";
        validForm = false;
    }

    if (message.value.length >= 10) {
        msgError.style.display = "none";
    } else {
        msgError.style.display = "block";
        validForm = false;
    }
    if (validForm===true) {
        handleSubmit(event);
    }
}



form.addEventListener("submit", validateForm);

function validateEmail (email) {
const regEx = /\S+@\S+\.\S+/;
const checkEmail = regEx.test(email);
return checkEmail;
}


