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

const menuElementTitles = document.querySelectorAll('.catalogue-acco__trigger')

menuElementTitles.forEach(element => {
    element.addEventListener('click', (event) => {
        event.preventDefault()
        const menuElement = element.parentElement
        const close = menuElement.querySelector('.catalogue-acco__close')

        close.addEventListener('click', (event) => {
            event.preventDefault()
            menuElement.classList.remove('catalogue-acco__item--active')
        })

        if (menuElement.classList.contains('catalogue-acco__item active')) {
            menuElement.classList.remove('catalogue-acco__item--active')
        } else {
            const activeMenuElement = document.querySelector('.catalogue-acco__item--active')
            if (activeMenuElement && !menuElement.isEqualNode(activeMenuElement)) {
                activeMenuElement.classList.remove('catalogue-acco__item--active')
            }
            menuElement.classList.add('catalogue-acco__item--active')
        }
    })
})

//////////popup

function reviewsPopup() {
    const review = document.querySelector('.reviews__list');
    const popup = document.querySelector('.popup');

    popup.addEventListener('click', e => {
        e.preventDefault();
        if (e.target === popup) {
            popup.classList.add('popup--closed');
        }
    })

    review.addEventListener('click', function(e) {

        const target = e.target;

        if (e.target.classList.contains('review__view')) {
            const name = target.parentNode.querySelector('.review__username').textContent;

            const text = target.parentNode.querySelector('.review__content').textContent;

            renderPopup(name, text)

        }

        function renderPopup(name, text) {

            popup.classList.remove('popup--closed');

            popup.querySelector('.popup__name').textContent = name;
            popup.querySelector('.popup__text').textContent = text;

            popup.querySelector('.popup__close').addEventListener('click', function(e) {
                e.preventDefault();
                popup.classList.add('popup--closed');
            })

        }

    })

}

reviewsPopup();


/////////form

const myForm = document.querySelector('#order-form');
const sendButton = document.querySelector('#send');
const clearButton = document.querySelector('#clear');

const phone = myForm.elements.phone;

clearButton.addEventListener('click', function(event) {
    event.preventDefault();
    let formElements = myForm.elements
    for (element of formElements) {
        element.value = '';
    }
})

phone.addEventListener('keydown', function(event) {
    let isDigit = false;
    let isDash = false;
    let isControl = false;

    if (event.key >= 0 && event.key <= 9) {
        isDigit = true;
    }

    if (event.key == "-") {
        isDash = true;
    }

    if (event.key == 'Backspace' || event.key == 'ArrowRight' || event.key == 'ArrowLeft') {
        isControl = true;
    }

    if (!isDigit && !isDash && !isControl) {
        event.preventDefault();
    }
})

sendButton.addEventListener('click', function(event) {

    if (validateForm(myForm)) {
        const formData = {
            name: myForm.elements.name.value,
            phone: myForm.elements.phone.value,
            comment: myForm.elements.comment.value,
            to: 'lenokstash@gmail.com'
        };

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        xhr.send(JSON.stringify(formData));
        xhr.addEventListener('load', () => {
            console.log(xhr.response);
        })
    }

    function validateForm(form) {
        let valid = true

        if (!validateField(form.elements.name)) {
            valid = false;
        }

        if (!validateField(form.elements.phone)) {
            valid = false;
        }

        if (!validateField(form.elements.comment)) {
            valid = false;
        }

        if (!validateField(form.elements.street)) {
            valid = false;
        }

        return valid;
    }

    function validateField(field) {
        if (!field.checkValidity()) {
            field.nextElementSibling.textContent = field.validationMessage;

            return false;
        } else {
            field.nextElementSibling.textContent = '';

            return true;
        }
    }
})