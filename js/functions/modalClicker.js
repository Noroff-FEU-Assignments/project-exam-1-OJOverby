// Modal script for images on the post page

function modalClicker() {
    const modal = document.querySelector(".modal");
        // When clicking an image within the "figure" element change modalImage and modal to block to show them in the browser
    document.querySelectorAll("figure img").forEach(image => {
        image.addEventListener('click', () => {
            const modalImage = document.querySelector(".modal-image");
            modalImage.style.display = "block";
            modal.style.display = "block";
            modalImage.src = image.src;
        });
    });
        // When clicking the modal element, close the modal
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}
// Export the function
export { modalClicker };

