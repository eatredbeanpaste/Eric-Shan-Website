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