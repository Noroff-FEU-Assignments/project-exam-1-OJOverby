// Script for renderingering everything on the Posts page
import { BASE_URL } from "./api.js";
import { Embed_URL } from "./api.js";
import { modalClicker } from "./functions/modalClicker.js";
import { updateTime } from "./functions/updateTime.js";

const postContainer = document.querySelector(".post-container");
const postHero = document.querySelector(".post-hero-container");
const comments = document.querySelector(".comments");
const title = document.querySelector(".title");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = BASE_URL + id + Embed_URL;
const related = document.querySelector(".related-container");
let category = "";

    // Async function for fetching blog post from the Wordpress REST API
async function fetchPost(){
  try {
    const response = await fetch(url);
    const post = await response.json();
        // Check response from REST API and render if successful, show a error message if no connection with API
    if(response.ok) {
      const commentId = document.getElementById("postId");
          // Update head info in the browser
      title.innerHTML = post.title.rendered + " - Tenacious Traveler";
          // Fetch the featured image from the API, if there isnt one show the placeholder image instead
      let image = post._embedded["wp:featuredmedia"]?.[0].link || "../images/placeholder.jpeg";
          // Fetch the catagory for use in the related posts section
      category = post.categories[0];
          // Fetch the post ID for the comment section
      commentId.value = post.id;
          // Place the featured image as the hero image on the post page
      postHero.innerHTML =`<div class="post-hero" style="background-image: url('${image}');"><img class="waves" src="images/wavesOpacity.svg" alt="White waves for decoration between images and content"></div>`
          // Render post content
      postContainer.innerHTML = `
      <h1>${post.title.rendered}</h1>
      <p>Published ${updateTime(post.date)}</p>
      ${post.content.rendered}`;
        // Check if there are any comments, and if there is post those in the comment section
      if (post._embedded && post._embedded.replies && post._embedded.replies[0]) {
        comments.innerHTML = post._embedded.replies[0].map(comment => `
          <div class="comment">
            <h3>${comment.author_name}</h3>
            <i>Posted: ${updateTime(comment.date)}</i>
            ${comment.content.rendered}
          </div>
        `).join('');
      } 
        // Run the getPosts and modalClicker functions to make sure images are clickable and render the related posts
      getPosts(post.id);
      modalClicker();
    } else {
          // Show error message if site cant connect to API
      postContainer.innerHTML = "<h3>Ops, seems like we're not getting a response from our blog provider. Please try again later</h3>";

    }
    
} catch (error) {
      // Show error message if something is wrong in the script or isnt working correctly
  postContainer.innerHTML = "<h3>Ops, something is wrong. Try again or contact us</h3>";
}
  }
  // Run the fetchPosts function to initate the rendering of the site
fetchPost();

    // Async function for getting the posts in the same category
async function getPosts(id) {
  try {
        // Added &per_page=100 to make sure it checks max number of entries
      const response = await fetch(BASE_URL+Embed_URL+"&per_page=100");
      const posts = await response.json();
              // Check response from REST API and render if successful, show a error message if no connection with API
      if (response.ok) {
        related.innerHTML = "";
            // Filter out posts with the same category as the main post ID
        const sortedPosts = posts.filter(post => post.id !== id && post.categories.includes(category));
        
        sortedPosts.forEach(function(post){
                  // Load in the thumbnail version of the featured image to show while the full size loads in case it has a large filesize
                let preImage = post._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url || "../images/placeholder.jpeg";
                  // Fetch the featured image from the API, if there isnt one show the placeholder image instead
                let image = post._embedded["wp:featuredmedia"]?.[0].link || "../images/placeholder.jpeg";
                  // Render the posts with the same category
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
            // Show error message if site cant connect to API
        related.innerHTML = "<h3>Ops, seems like we're not getting a response from our blog provider. Please try again later</h3>";
      }
  } catch (error) {
          // Show error message if something is wrong in the script or isnt working correctly
      related.innerHTML = "<h3>Ops, something is wrong. Try again or <a href='contact.html'>contact us<a/></h3>";
  }
  
}




