
// Function for submitting contact form and comments.

function handleSubmit(event) {
    event.preventDefault();

    const formClass = event.target.className;
    let data = "";
  
    if(formClass=="contact-form"){
      const [fullName, email, subject, message] = event.target.elements;
    console.log(formClass);
  
    data = JSON.stringify({
      post: "96",
      author_name: fullName.value,
      author_email: email.value,
      content: "Subject:" + subject.value + " Message:" + message.value,
    
    });
    } else {
      const [postId, fullName, email, comment] = event.target.elements;
  
      data = JSON.stringify({
        post: postId.value,
        author_name: fullName.value,
        author_email: email.value,
        content: comment.value,
      });
    }
    
    
    const URL = "https://olejorgen.no/tenacioustravelerapi/wp-json/wp/v2/comments/";
    fetch(URL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    })
      .then((response) => {
        if (response.ok) {
          if(formClass=="contact-form"){
            document.querySelector("."+formClass).innerHTML = `<p>Thank you for your feedback!</p>`;
          } else {
            document.querySelector(".new-comment").innerHTML = `<p>Your comment has been submitted. It can take a few minutes before it is visable</p>`;
          }
          
        } else {
          response.json().then(() => {
            document.querySelector("."+formClass).innerHTML = `<p>Ops, seems like the submission failed. Try again.</p>`;
        });
        return response.json;
        }
      })
     
      .catch(error => console.error(error));
  }

  export { handleSubmit };