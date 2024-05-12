// Form validation for the contact.html page

import { handleSubmit } from "./functions/handleSubmit.js";
import { validateEmail } from "./functions/validateEmail.js";

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
    // Prevent default submission
    event.preventDefault();
    // Set the default value of validForm to true
    let validForm = true;
    // Check if the fullName input has 5 or more characters, if it doesnt show an error message and set validForm to false
    if (fullName.value.length >= 5) {
        nameError.style.display = "none";
    } else {
        nameError.style.display = "block";
        validForm = false;
    }
    // Check if the subject input has 15 or more characters, if it doesnt show an error message and set validForm to false
    if (subject.value.length >= 15) {
        subjectError.style.display = "none";
    } else {
        subjectError.style.display = "block";
        validForm = false;
    }
    // Use the validateEmail function to check if the input is a valid email, if it doesnt show an error message and set validForm to false
    if(validateEmail(email.value)){
        emailError.style.display = "none";
    } else {
        emailError.style.display = "block";
        validForm = false;
    }
    // Check if the message input has 25 or more characters, if it doesnt show an error message and set validForm to false
    if (message.value.length >= 25) {
        msgError.style.display = "none";
    } else {
        msgError.style.display = "block";
        validForm = false;
    }
    // Check if the validForm is still true, if it is use the handleSubmit function to send in the form
    if (validForm===true) {
        handleSubmit(event);
    }
}
// Check for submit and run the validateForm function
form.addEventListener("submit", validateForm);


