import { BASE_URL } from "./api.js";
import { Embed_URL } from "./api.js";
import { renderBlogCard } from "./functions/renderBlogCard.js";

const params = new URLSearchParams(window.location.search);
const searchTerm = params.get("search");
const searchQuery = document.querySelector(".search-query");
searchQuery.innerHTML = searchTerm;
const resultsContainer = document.querySelector(".posts-container");

async function searchResults() {
    try {
        const response = await fetch(BASE_URL+Embed_URL);
        const posts = await response.json();
        if(response.ok) {
            resultsContainer.innerHTML = "";
            const filteredPosts = posts.filter(post => post.content.rendered.toLowerCase().includes(searchTerm.toLowerCase()));
            
            if(filteredPosts.length > 0) {
            filteredPosts.forEach(function(post){
                renderBlogCard(post);
            })
            } else {
                resultsContainer.innerHTML = `<h3>Ops, seems like we're not getting a response from our blog provider. Please try again later"</h3>`;
            }
        } else {
            resultsContainer.innerHTML = `<h3>Sorry, there are no blog posts containing the word "${searchTerm}"</h3>`;

        }
        
    
    } catch (error) {
        resultsContainer.innerHTML = "<h3>Ops, something is wrong. Try again or <a href='contact.html'>contact us<a/></h3>";
        console.log(error)
    } 
}

searchResults();

