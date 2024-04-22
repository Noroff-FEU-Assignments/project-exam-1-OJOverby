// Modal script for images on the post page

function modalClicker() {
    const modal = document.querySelector(".modal");

    document.querySelectorAll("figure img").forEach(image => {
        image.addEventListener('click', () => {
            const modalImage = document.querySelector(".modal-image");
            modalImage.style.display = "block";
            modal.style.display = "block";
            modalImage.src = image.src;
        });
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}

export { modalClicker };

