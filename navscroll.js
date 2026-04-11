{
    const nav = document.querySelector('.topbar');

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (lastScrollY < window.scrollY) {
            nav.classList.add('topbar--hide');
        } else {
            nav.classList.remove('topbar--hide');
        }
        lastScrollY = window.scrollY;
    });
}