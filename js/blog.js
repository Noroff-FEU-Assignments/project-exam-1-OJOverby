// Script for displaying all the blog posts on the blog page
import { BASE_URL } from "./api.js";
import { Embed_URL } from "./api.js";
import { renderBlogCard } from "./functions/renderBlogCard.js";
const postsContainer = document.querySelector(".posts-container");
const loadMoreButton = document.querySelector(".load-more-button");
let postsPerPage = 10;
const addedLimit = 10;

async function fetchPosts() {
    try {
        const url = `${BASE_URL}${Embed_URL}&per_page=${postsPerPage}`;
        const response = await fetch(url);
        const posts = await response.json();
        if(response.ok) {
            postsContainer.innerHTML = "";
            console.log(posts);
            showPosts(posts);
       
            if (posts.length < postsPerPage) {
                loadMoreButton.style.display ="none";
        }    else {
                postsPerPage += addedLimit;
            }
        } else {
            postsContainer.innerHTML = "<h3>Ops, seems like we're not getting a response from our blog provider. Please try again later</h3>";
        }
        
    } catch (error) {
        postsContainer.innerHTML = "<h3>Ops, something is wrong. Try again later</h3>";
        console.log(error);
    }
}

function showPosts(posts){
    posts.forEach(function(post){
        renderBlogCard(post);
    })
}

loadMoreButton.addEventListener("click", () => fetchPosts(postsPerPage));
fetchPosts();