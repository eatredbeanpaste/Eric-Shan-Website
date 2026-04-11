let languagemode = localStorage.getItem('languagemode');
const langSwitch = document.querySelector('.lang-switch');

const enableChinese = () => {
    document.body.classList.add('chinese-mode');
    localStorage.setItem('languagemode', 'active');
}

const disableChinese = () => {
    document.body.classList.remove('chinese-mode');
    localStorage.setItem('languagemode', 'inactive');
}

// Check preference on load
if (languagemode === 'active') enableChinese();

langSwitch.addEventListener('click', () => {
    languagemode = localStorage.getItem('languagemode');
    languagemode !== "active" ? enableChinese() : disableChinese();
});