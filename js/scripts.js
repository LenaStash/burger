const sliderList = document.querySelector(".slider__list");
const sliderItems = document.querySelectorAll(".slider__item");

const numberItems = sliderItems.length;
setSliderWidth(numberItems);

// Определяем, на сколько процентов нужно изменять свойство right у списка, чтобы показать следующий/предыдущий слайд
const shiftProcent = 100 / numberItems;

var currentSlide = 1;
showNthSlide(currentSlide, shiftProcent);

const prevSlide = document.querySelector(".slider-scroll__link--prev");
const nextSlide = document.querySelector(".slider-scroll__link--next");

prevSlide.addEventListener("click", (event) => {
    event.preventDefault();
    currentSlide--;
    if (currentSlide <= 0) currentSlide = numberItems;
    showNthSlide(currentSlide, shiftProcent);
})

nextSlide.addEventListener("click", (event) => {
    event.preventDefault();
    currentSlide++;
    if (currentSlide > numberItems) currentSlide = 1;
    showNthSlide(currentSlide, shiftProcent);
})


function setSliderWidth(numberItems) {
    let slider = document.querySelector(".slider"),
        sliderWidth = numberItems * 100 + "%";

    slider.style.width = sliderWidth;;
}

function showNthSlide(n, shiftProcent) {
    let right = (n - 1) * shiftProcent;

    sliderList.style.right = right + "%";
}

//////////team

var teamAccoItems = document.querySelectorAll('.team-acco__item');
for (let i = 0; i < teamAccoItems.length; i++) {
    teamAccoItems[i].addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        if (teamAccoItems[i].classList.contains('team-acco__item--active')) {
            teamAccoItems[i].classList.remove('team-acco__item--active');
        } else {
            for (let j = 0; j < teamAccoItems.length; j++) {
                teamAccoItems[j].classList.remove('team-acco__item--active');
            }
            teamAccoItems[i].classList.add('team-acco__item--active');
        }
    })
};

/////////hamburger

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

//////////catalogue

var menuAccoItems = document.querySelectorAll('.catalogue-acco__item');
for (let i = 0; i < menuAccoItems.length; i++) {
    menuAccoItems[i].addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        if (menuAccoItems[i].classList.contains('catalogue-acco__item--active')) {
            menuAccoItems[i].classList.remove('catalogue-acco__item--active');
        } else {
            for (let j = 0; j < menuAccoItems.length; j++) {
                menuAccoItems[j].classList.remove('catalogue-acco__item--active');
            }
            menuAccoItems[i].classList.add('catalogue-acco__item--active');

            // Удаляем все дополнительные блоки с меню
            let additionalMenuItems = document.querySelectorAll('.catalogue-acco__item--additional');
            for (let j = 0; j < additionalMenuItems.length; j++) additionalMenuItems[j].remove();

            // Создаем дополнительный блок, содержимое копируем из выбранного элемента меню
            let additionalMenuItem = document.createElement("div");
            let activeMenuItem = event.target.closest(".catalogue-acco__item");

            additionalMenuItem.innerHTML = activeMenuItem.innerHTML;
            additionalMenuItem.classList.add("catalogue-acco__item", "catalogue-acco__item--additional");
            let sectionMenu = document.querySelector(".menu");
            sectionMenu.appendChild(additionalMenuItem);

            // Добавляем обработчики для закрытия дополнительного блока
            additionalMenuItem.addEventListener('click', event => {
                event.preventDefault();
                let additionalMenuItem = document.querySelector(".catalogue-acco__item--additional");
                additionalMenuItem.remove();
            });
            let closePictogram = document.querySelector(".catalogue-acco__close");
            closePictogram.addEventListener("click", event => {
                event.preventDefault();
                let additionalMenuItem = document.querySelector(".catalogue-acco__item--additional");
                additionalMenuItem.remove();
            });

        }
    })
};