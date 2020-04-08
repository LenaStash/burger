const deliveryForm = document.querySelector('#order-form');
const deliverySubmit = document.querySelector('#send');
deliverySubmit.addEventListener('click', e => {
    e.preventDefault();
    if (validateForm(deliveryForm)) {
        var formData = new FormData(deliveryForm);
        formData.append("name", "deliveryForm.elements.name.value");
        formData.append("phone", "delivery.elements.phone.value");
        formData.append("comment", "deliveryForm.elements.comment.value");
        formData.append("to", "lenokstash@gmail.com");

        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open("POST", "https://webdev-api.loftschool.com/sendmail/");
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.send(formData);
        var modal = new Overlay('#overlayTemplate');


        modal.toggleClsButtonVisibility();
        modal.openOverlay("Ожидайте ответа от сервера");


        xhr.addEventListener('load', () => {
            modal.toggleClsButtonVisibility();


            modal.changeMessage(xhr.response.message);
        });
    }

});

function validateForm(form) {
    let valid = true;

    if (!validateField(form.elements.name)) {
        valid = false;
    }
    if (!validateField(form.elements.phone)) {
        valid = false;
    }
    if (!validateField(form.elements.comment)) {
        valid = false;
    }
    return valid;
}

function validateField(field) {
    field.nextElementSibling.textContent = field.validationMessage;
    return field.checkValidity();
}

function Overlay(templateSelector) {
    const template = document.querySelector(templateSelector);
    const overlay = createOverlay(template);
    const backGround = overlay.querySelector('.overlay');
    const msgContainer = overlay.querySelector('.modal__title');
    const closeBtn = overlay.querySelector('button');


    function createOverlay() {
        let overlay = document.createElement('div');
        overlay.innerHTML = template.innerHTML;
        return overlay;
    }


    this.openOverlay = (message) => {
        document.body.appendChild(overlay);
        msgContainer.textContent = message;
        document.body.style.overflow = 'hidden';
    }


    this.closeOverlay = () => {
        document.body.removeChild(overlay);
        document.body.style.overflow = '';
    }


    this.changeMessage = (newMessage) => {
        msgContainer.textContent = newMessage;
    }


    var eventHandler = (e) => {
        e.preventDefault();
        if (e.target === closeBtn || e.target === backGround) {
            this.closeOverlay();
        }
    }

    var isCloseBtnVisible = true;

    this.toggleClsButtonVisibility = () => {

        if (isCloseBtnVisible) {
            closeBtn.style.display = 'none';
            isCloseBtnVisible = false;
            overlay.removeEventListener('click', eventHandler);
        } else {
            closeBtn.style.display = '';
            isCloseBtnVisible = true;
            overlay.addEventListener('click', eventHandler);
        }
    }

    overlay.addEventListener('click', eventHandler);

}