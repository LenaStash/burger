var hamburgermenuLink = document.querySelector('.hamburger-menu-link');
var hamburgermenuContent = document.querySelector('.hamburger-menu__content');
var hamburgermenuClose = document.querySelector('.hamburger-menu__close');
var hamburgermenuItemLinks = document.querySelectorAll('.hamburger-menu__link');

hamburgermenuLink.addEventListener('click', event => {
    event.preventDefault();
    hamburgermenuContent.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    $('.wrapper').toggleClass('disableOPS');
});

hamburgermenuClose.addEventListener('click', event => {
    event.preventDefault();
    hamburgermenuContent.style.display = '';
    document.body.style.overflow = '';
    $('.wrapper').toggleClass('disableOPS');
});

for (let i = 0; i < hamburgermenuItemLinks.length; i++) {
    hamburgermenuItemLinks[i].addEventListener('click', event => {
        hamburgermenuContent.style.display = '';
        document.body.style.overflow = '';
        $('.wrapper').toggleClass('disableOPS');
    })
};