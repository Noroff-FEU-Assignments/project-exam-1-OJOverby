// Form validation for the comments on the post page

import { handleSubmit } from "./functions/handleSubmit.js";
import { validateEmail } from "./functions/validateEmail.js";

const form = document.querySelector(".new-comment");
const fullName = document.querySelector("#fullName");
const nameError = document.querySelector("#nameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError")
const message = document.querySelector("#comment");
const msgError = document.querySelector("#msgError");

function validateForm(event) {
    // Prevent default submission
    event.preventDefault();
    // Set the default value of validForm to true
    let validForm = true;
    // Check if the fullName input has 3 or more characters, if it doesnt show an error message and set validForm to false
    if (fullName.value.length >= 3) {
        nameError.style.display = "none";
    } else {
        nameError.style.display = "block";
        validForm = false;
    }
    // Use the validateEmail function to check if the input is a valid email, if it doesnt show an error message and set validForm to false
    if(validateEmail(email.value)){
        emailError.style.display = "none";
    } else {
        emailError.style.display = "block";
        validForm = false;
    }
    // Check if the message input has 10 or more characters, if it doesnt show an error message and set validForm to false
    if (message.value.length >= 10) {
        msgError.style.display = "none";
    } else {
        msgError.style.display = "block";
        validForm = false;
    }
    // Check if the message input has 25 or more characters, if it doesnt show an error message and set validForm to false
    if (validForm===true) {
        handleSubmit(event);
    }
}
// Check for submit and run the validateForm function
form.addEventListener("submit", validateForm);

