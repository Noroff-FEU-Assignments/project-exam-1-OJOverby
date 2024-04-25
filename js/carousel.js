// Script for the carousel on the landing page
import { BASE_URL } from "./api.js";
import { Embed_URL } from "./api.js";
const carousel = document.querySelector(".carousel");
const nextButton = document.querySelector(".next-button");
const previousButton = document.querySelector(".previous-button")
let minSlice = 0;
let maxSlice = 3;
let maxPosts = 99;

async function getPosts() {
    try {
        const response = await fetch(BASE_URL+Embed_URL+"&per_page=100");
        const posts = await response.json();
        if (response.ok) {
            carousel.innerHTML = "";
            maxPosts = posts.length;
            console.log(maxPosts);
            const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(minSlice, maxSlice);
        
            sortedPosts.forEach(function(post){
                    let preImage = post._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url;
                    let image = post._embedded["wp:featuredmedia"]?.[0].link || "../images/placeholder.jpeg";
                    carousel.innerHTML += `
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
            carousel.innerHTML = "<h3>Ops, seems like we're not getting a response from our blog provider. Please try again later</h3>";

        }
        
    } catch (error) {
        carousel.innerHTML = "<h3>Ops, something is wrong. Try again or <a href='contact.html'>contact us<a/></h3>";
        console.log(error);
    }
    
}

getPosts();

function getNextPosts () {
    if (maxPosts > maxSlice) {
        minSlice = minSlice + 3;
        maxSlice = maxSlice + 3;
        if ((maxPosts-maxSlice)<3){
            minSlice = maxPosts -3;
            maxSlice = maxPosts;
        }
    } 
}

function getPreviousPosts () {
    if (minSlice != 0) {
        minSlice = minSlice - 3;
        maxSlice = maxSlice - 3;
        if (minSlice<0){
            minSlice = 0;
            maxSlice = 3;
        }
    } 

}

nextButton.addEventListener('click', function() {
    getNextPosts();
    getPosts();
    buttonCheck();
    console.log("max slice: "+maxSlice);
    console.log("max posts: "+maxPosts)
});

previousButton.addEventListener('click', function() {
    getPreviousPosts();
    getPosts();
    buttonCheck();
    console.log("max slice: "+maxSlice);
    console.log("max posts: "+maxPosts)

});

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

buttonCheck();
