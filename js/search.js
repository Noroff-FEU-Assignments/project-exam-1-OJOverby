// Script for displaying search results on the search page

import { BASE_URL } from "./api.js";
import { Embed_URL } from "./api.js";
import { renderBlogCard } from "./functions/renderBlogCard.js";

const params = new URLSearchParams(window.location.search);
const searchTerm = params.get("search");
const searchQuery = document.querySelector(".search-query");
searchQuery.innerHTML = searchTerm;
const resultsContainer = document.querySelector(".posts-container");

                // Async function for rendering searched after posts
async function searchResults() {
    try {
                // Added &per_page=100 to make sure it checks max number of entries
        const response = await fetch(BASE_URL+Embed_URL+"&per_page=100");
        const posts = await response.json();
                // Check response from REST API and render if successful, show a error message if no connection with API
        if(response.ok) {
            resultsContainer.innerHTML = "";
                // Filter out posts that has text that contains the word that has been searched for, changes both lower case to make sure that they are the same format
            const filteredPosts = posts.filter(post => post.content.rendered.toLowerCase().includes(searchTerm.toLowerCase()));
                // Check if there are any hits within the search, if there are no hits display message
            if(filteredPosts.length > 0) {
            filteredPosts.forEach(function(post){
                // Render the blog posts that fit the search
                renderBlogCard(post);
            })
            } else {
                // Show error message if site cant connect to API
                resultsContainer.innerHTML = `<h3>Ops, seems like we're not getting a response from our blog provider. Please try again later</h3>`;
            }
        } else {
                // Show message if the search is unsuccessful
            resultsContainer.innerHTML = `<h3>Sorry, there are no blog posts containing the word "${searchTerm}"</h3>`;
        } 
    } catch (error) {
                // Show error message if something is wrong in the script or isnt working correctly
        resultsContainer.innerHTML = "<h3>Ops, something is wrong. Try again or <a href='contact.html'>contact us<a/></h3>";
    } 
}
// Run the function
searchResults();

