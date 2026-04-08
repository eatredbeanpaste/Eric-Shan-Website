const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');


});j

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