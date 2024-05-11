// Script for displaying all the blog posts on the blog page
import { BASE_URL } from "./api.js";
import { Embed_URL } from "./api.js";
import { renderBlogCard } from "./functions/renderBlogCard.js";
const postsContainer = document.querySelector(".posts-container");
const loadMoreButton = document.querySelector(".load-more-button");
let postsPerPage = 10;
const addedLimit = 10;
    // Async function for getting the blog posts
async function fetchPosts() {
    try {
        // Get the base API address and limit the number shown with the postsPerPage
        const url = `${BASE_URL}${Embed_URL}&per_page=${postsPerPage}`;
        const response = await fetch(url);
        const posts = await response.json();
            // Check response from REST API and render if successful, show a error message if no connection with API
        if(response.ok) {
            postsContainer.innerHTML = "";
            showPosts(posts);
            // Check if there are more posts in the API then are being shown, add addedLimit to the perPerPage if there is, hide the loadMoreButton if there isnt
            if (posts.length < postsPerPage) {
                loadMoreButton.style.display ="none";
        }    else {
                postsPerPage += addedLimit;
            }
        } else {
            // Show error message if site cant connect to API
            postsContainer.innerHTML = "<h3>Ops, seems like we're not getting a response from our blog provider. Please try again later</h3>";
        }
    } catch (error) {
        // Show error message if something is wrong in the script or isnt working correctly
        postsContainer.innerHTML = "<h3>Ops, something is wrong. Try again later</h3>";
    }
}
    // Function for rendering blog cards by using the renderBlogCard function on all the posts found in the API
function showPosts(posts){
    posts.forEach(function(post){
        renderBlogCard(post);
    })
}
    // If the loadMoreButton is clicked, run the fetchPosts page with the new value of postsPerPage
loadMoreButton.addEventListener("click", () => fetchPosts(postsPerPage));
    // Run the fetchPosts function to initate the content of the site 
fetchPosts();