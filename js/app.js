// Event listener for opening and closing the hamburger menu

const checkbox = document.querySelector("#menu-checkbox");
const menu = document.querySelector("#navmenu");
const menuButton = document.querySelector(".mobile-menu-button");

menuButton.addEventListener("click", () => {
    if (checkbox.checked==0){
        menuButton.classList.add("open");
    } else {
        menuButton.classList.remove("open");
    }
})


// Added code for search input

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    searchButton.disabled = !searchInput.value;
    searchInput.addEventListener("input", () => {
        searchButton.disabled = !searchInput.value;
    });
});
