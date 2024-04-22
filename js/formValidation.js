// Form validation for the contact.html page

import { handleSubmit } from "./functions/handleSubmit.js";

const form = document.querySelector("#contactForm");
const fullName = document.querySelector("#fullName");
const nameError = document.querySelector("#nameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError")
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");
const message = document.querySelector("#message");
const msgError = document.querySelector("#msgError");

function validateForm(event) {
    event.preventDefault();
    let validForm = true;

    if (fullName.value.length >= 5) {
        nameError.style.display = "none";
    } else {
        nameError.style.display = "block";
        validForm = false;
    }

    if (subject.value.length >= 15) {
        subjectError.style.display = "none";
    } else {
        subjectError.style.display = "block";
        validForm = false;
    }

    if(validateEmail(email.value)){
        emailError.style.display = "none";
    } else {
        emailError.style.display = "block";
        validForm = false;
    }

    if (message.value.length >= 25) {
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


