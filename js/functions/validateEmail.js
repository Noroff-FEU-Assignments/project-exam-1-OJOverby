// Function for validating email

// Check if the email contains value + @ + value + . + value
function validateEmail (email) {
    const regEx = /\S+@\S+\.\S+/;
    const checkEmail = regEx.test(email);
    // Return true if it passes the check
    return checkEmail;
    }

// export the function
export { validateEmail};