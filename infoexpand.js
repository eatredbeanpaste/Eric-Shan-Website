const projects = document.querySelectorAll(".project-item");

projects.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("active");
    });
});

/*
projects.forEach(item => {
    item.addEventListener("click", () => {
        projects.forEach(p => p.classList.remove("active"));
        item.classList.add("active");
    });
});
*/

document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');

    // 1. Find all images inside your project items
    const projectImages = document.querySelectorAll('.project-item img');

    projectImages.forEach(image => {
        image.addEventListener('click', (e) => {
            // Prevent the click from "collapsing" the project box if you have a toggle script
            e.stopPropagation(); 
            
            lightbox.style.display = 'flex';
            lightboxImg.src = image.src;
        });
    });

    // 2. Close lightbox when clicking the 'X'
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // 3. Close lightbox when clicking anywhere outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.style.display = 'none';
        }
    });
});