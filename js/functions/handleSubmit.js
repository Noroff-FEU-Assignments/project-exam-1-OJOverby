
// Function for submitting contact form and comments.

function handleSubmit(event) {
    // Prevent normal submittion
    event.preventDefault();
      // Get the class from the event target
    const formClass = event.target.className;
    let data = "";
    // Check wich form the function is being used within
    if(formClass=="contact-form"){
      // Catch the values from the form and store them in the data variable
      const [fullName, email, subject, message] = event.target.elements;
  
    data = JSON.stringify({
      // All the data from the contact form is being sent to the same post, so that is a static value
      post: "96",
      author_name: fullName.value,
      author_email: email.value,
      // Added subject and message variables to store both within the content variable
      content: "Subject:" + subject.value + " Message:" + message.value,
    
    });
    } else {
      // Different values if the event target is not the contact-form
      const [postId, fullName, email, comment] = event.target.elements;
      data = JSON.stringify({
        post: postId.value,
        author_name: fullName.value,
        author_email: email.value,
        content: comment.value,
      });
    }
    
      // API URL to the comments section
    const URL = "https://olejorgen.no/tenacioustravelerapi/wp-json/wp/v2/comments/";
    // Post the data from the form into the API using the post method
    fetch(URL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    })
      .then((response) => {
            // Check response from REST API, show a error message if no connection with the API
        if (response.ok) {
          if(formClass=="contact-form"){
            // Message shown if the data was sent from the contact form
            document.querySelector("."+formClass).innerHTML = `<p>Thank you for your feedback!</p>`;
          } else {
            // Message shown if the data was sent from the comments form
            document.querySelector(".new-comment").innerHTML = `<p>Your comment has been submitted. It can take a few minutes before it is visable</p>`;
          }
          
        } else {
          response.json().then(() => {
            // Message shown if the form submission failed
            document.querySelector("."+formClass).innerHTML = `<p>Ops, seems like the submission failed. Try again.</p>`;
        });
        return response.json;
        }
      })
     
      .catch(error => console.error(error));
  }
  // Export the function
  export { handleSubmit };