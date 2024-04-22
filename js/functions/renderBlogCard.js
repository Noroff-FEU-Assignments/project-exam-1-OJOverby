// Function for rendering the blog cards in html
import { updateTime } from "./updateTime.js";

function renderBlogCard (post){
    let image = post._embedded["wp:featuredmedia"]?.[0].link || "../images/placeholder.jpeg";
    const postsContainer = document.querySelector(".posts-container");
                
    postsContainer.innerHTML += `
   
    <a href="/post.html?id=${post.id}" class="blog-card">
    <div class="image-container" style="background-image: url('${image}');"></div>
    <h3>${post.title.rendered}</h3>
    <p>Published ${updateTime(post.date)}</p>
    <p>${post.excerpt.rendered}</p>
    <div class="button-container">
    <button class="CTA"><h2>READ MORE</h2></button></div></a>
    
    `;
}


export {renderBlogCard};