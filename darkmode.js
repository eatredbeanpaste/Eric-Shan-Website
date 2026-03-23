let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.querySelector('.theme-switch');

const enabledarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
}

const disabledarkmode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', 'inactive');
}

if (darkmode === 'active') enabledarkmode();

themeSwitch.addEventListener('click', () => {
    darkmode = localStorage.getItem('darkmode');
    darkmode !== "active" ? enabledarkmode() : disabledarkmode();
});