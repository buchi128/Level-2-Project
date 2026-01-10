const hamburger = document.getElementById('hamburger-icon');
const navMenu = document.getElementById('navigation-menu');
//const classList = "toggle";

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});