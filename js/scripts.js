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
        xhr.addEventListener('load', () => {
            if (!xhr.response.status) {
                let name = 'Ошибка';
                let text = ''

            } else {
                let name = 'Заказ отправлен';
                let text = '';

            }
        })
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