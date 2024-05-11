// Script for the carousel on the landing page
import { BASE_URL } from "./api.js";
import { Embed_URL } from "./api.js";

const carousel = document.querySelector(".carousel");
const nextButton = document.querySelector(".next-button");
const previousButton = document.querySelector(".previous-button")
// Inital values to the variables
let minSlice = 0;
let maxSlice = 3;
let maxPosts = 99;
    // Async function for blog posts for the carousel
async function getPosts() {
    try {
        // Added &per_page=100 to make sure it checks max number of entries
        const response = await fetch(BASE_URL+Embed_URL+"&per_page=100");
        const posts = await response.json();
        if (response.ok) {
            carousel.innerHTML = "";
            // Set maxPosts to the number of posts in the API
            maxPosts = posts.length;
            // Sort the posts after date, and then only show the posts in between minSlice and maxSlice
            const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(minSlice, maxSlice);
        
            sortedPosts.forEach(function(post){
                        // Load in the thumbnail version of the featured image to show while the full size loads in case it has a large filesize
                    let preImage = post._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url;
                        // Fetch the featured image from the API, if there isnt one show the placeholder image instead
                    let image = post._embedded["wp:featuredmedia"]?.[0].link || "../images/placeholder.jpeg";
                    carousel.innerHTML += `
                    <a href="/post.html?id=${post.id}" class="carousel-card">
                        <div class="image-container" style="background-image: url('${preImage}');">
                        <div class="load-container" style="background-image: url('${image}');"></div>
                            <div class="hover-text">
                                <p>${post.excerpt.rendered}</p>
                            </div>
                        </div>
                        <h3>${post.title.rendered}</h3></a>
                   
                    </a>
                    
                    `;
            })
        } else {
                // Show error message if site cant connect to API
            carousel.innerHTML = "<h3>Ops, seems like we're not getting a response from our blog provider. Please try again later</h3>";
        }
    } catch (error) {
                // Show error message if something is wrong in the script or isnt working correctly
        carousel.innerHTML = "<h3>Ops, something is wrong. Try again or <a href='contact.html'>contact us<a/></h3>";
    }
    
}
    // Render the posts on the page
getPosts();
    // Function to update the minSlice and maxSlice variable when wanting to show the next posts in the carousel
function getNextPosts () {
    if (maxPosts > maxSlice) {
        minSlice = minSlice + 3;
        maxSlice = maxSlice + 3;
        // Check if there are less then 3 posts that hasnt been shown, if there are less then 3 set the minSlice to a value that shows the last 3 posts
        if ((maxPosts-maxSlice)<3){
            minSlice = maxPosts -3;
            maxSlice = maxPosts;
        }
    } 
}
    // Function to update the minSlice and maxSlice variable when wanting to show the previous posts in the carousel
function getPreviousPosts () {
    if (minSlice != 0) {
        minSlice = minSlice - 3;
        maxSlice = maxSlice - 3;
        // Make sure that minSlice doesnt become a negative number
        if (minSlice<0){
            minSlice = 0;
            maxSlice = 3;
        }
    } 

}
    // Check for clicks on the next button and run functions for updating variables, rendering the posts and buttons
nextButton.addEventListener('click', function() {
    getNextPosts();
    getPosts();
    buttonCheck();
});
    // Check for clicks on the next button and run functions for updating variables, rendering the posts and buttons
previousButton.addEventListener('click', function() {
    getPreviousPosts();
    getPosts();
    buttonCheck();
});
    // Function that hides the next or previous button if there are no more posts to show
function buttonCheck() {
    if (minSlice <= 0) {
        previousButton.style.visibility = "hidden"; 
    } else {
        previousButton.style.visibility = "visible"; 
    }

    if (maxSlice < maxPosts) {
        nextButton.style.visibility = "visible";
    } else {
        nextButton.style.visibility = "hidden"; 
    }
}
// Run the function to hide/show the buttons when rendering the page
buttonCheck();
