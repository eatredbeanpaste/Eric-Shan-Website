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

const langToggle = document.getElementById('lang-toggle');
const langEnText = document.getElementById('lang-en');
const langZhText = document.getElementById('lang-zh');

langToggle.addEventListener('change', function() {
  if (this.checked) {
    // Chinese selected
    langEnText.classList.remove('active');
    langZhText.classList.add('active');
    
    // CODE TO LOAD CHINESE RESUME CONTENT GOES HERE
    // (e.g., call a function that fetches and displays Chinese text)

  } else {
    // English selected
    langZhText.classList.remove('active');
    langEnText.classList.add('active');
    
    // CODE TO LOAD ENGLISH RESUME CONTENT GOES HERE
    // (e.g., call a function that fetches and displays English text)
  }
});