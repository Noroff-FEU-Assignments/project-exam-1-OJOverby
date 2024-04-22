import { BASE_URL } from "./api.js";
import { Embed_URL } from "./api.js";
import { modalClicker } from "./functions/modalClicker.js";
import { updateTime } from "./functions/updateTime.js";

const postContainer = document.querySelector(".post-container");
const comments = document.querySelector(".comments");
const title = document.querySelector(".title");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = BASE_URL + id + Embed_URL;
const related = document.querySelector(".related-container");
let category = "";


async function fetchPost(){
  try {
    const response = await fetch(url);
    const post = await response.json();
    if(response.ok) {
      const commentId = document.getElementById("postId");
      title.innerHTML = post.title.rendered + " - Tenacious Traveler";
      let image = post._embedded["wp:featuredmedia"]?.[0].link || "../images/placeholder.jpeg";
      category = post.categories[0];
      commentId.value = post.id;
      postContainer.innerHTML = `
      <div class="image-container" style="background-image: url('${image}');"><img class="waves" src="images/wavesOpacity.svg"></div>
      <h1>${post.title.rendered}</h1>
      <p>Published ${updateTime(post.date)}</p>
      ${post.content.rendered}`;
     
      if (post._embedded && post._embedded.replies && post._embedded.replies[0]) {
        comments.innerHTML = post._embedded.replies[0].map(comment => `
          <div class="comment">
            <h3>${comment.author_name}</h3>
            <i>Posted: ${updateTime(comment.date)}</i>
            ${comment.content.rendered}
          </div>
        `).join('');
      } 
   
      getPosts();
      modalClicker();
    } else {
      postContainer.innerHTML = "<h3>Ops, seems like we're not getting a response from our blog provider. Please try again later</h3>";

    }
    
    
} catch (error) {
  postContainer.innerHTML = "<h3>Ops, something is wrong. Try again or contact us</h3>";
  console.log(error);
}
  }
  
fetchPost();


async function getPosts() {
  try {
      const response = await fetch(BASE_URL+Embed_URL+"&per_page=100");
      const posts = await response.json();
      if (response.ok) {
        related.innerHTML = "";
        const sortedPosts = posts.filter(post => post.categories.includes(category));
        
        sortedPosts.forEach(function(post){
                let preImage = post._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url || "../images/placeholder.jpeg";
                let image = post._embedded["wp:featuredmedia"]?.[0].link || "../images/placeholder.jpeg";
  
                related.innerHTML += `
                <a href="/post.html?id=${post.id}" class="carousel-link">
                <div class="carousel-card">
                    <div class="image-container" style="background-image: url('${preImage}');">
                    <div class="load-container" style="background-image: url('${image}');"></div>
                        <div class="hover-text">
                            <p>${post.excerpt.rendered}</p>
                        </div>
                    </div>
                    <h3>${post.title.rendered}</h3></a>
                </div>
                </a>
                
                `;
        })
      } else {
        related.innerHTML = "<h3>Ops, seems like we're not getting a response from our blog provider. Please try again later</h3>";
      }
      
  } catch (error) {
      related.innerHTML = "<h3>Ops, something is wrong. Try again or <a href='contact.html'>contact us<a/></h3>";
      console.log(error);
  }
  
}




