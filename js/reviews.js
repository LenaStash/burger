const commentButtonList = document.querySelectorAll(".review__view");

for (let commentButton of commentButtonList) {
    commentButton.addEventListener("click", event => {
        event.preventDefault();

        // Находим активный отзыв, к которому относится нажатая кнопка
        const activeComment = event.target.closest(".review__hover");

        // Создаем новый popup, данные будут взяты из активного отзыва
        const popup = createCommentPopup(activeComment);
        document.body.appendChild(popup);
        document.body.style.overflow = 'hidden';
        $('.wrapper').toggleClass('disableOPS');
    });
}

function createCommentPopup(activeComment) {
    //Выделяем автора и текст активного отзыва
    const authorElementFromHTML = activeComment.children[0],
        contentElementFromHTML = activeComment.children[1];

    //Создаем новый popup
    const popupElement = document.createElement("div"),
        popupTemplate = document.querySelector("#popup-comment-template");

    popupElement.classList.add("popup");
    popupElement.innerHTML = popupTemplate.innerHTML;

    const authorElement = popupElement.querySelector(".review__username"),
        contentElement = popupElement.querySelector(".review__content");

    authorElement.innerHTML = authorElementFromHTML.innerHTML;
    contentElement.innerHTML = contentElementFromHTML.innerHTML;

    // Щелчок вне сообщения - закрыть popup
    popupElement.addEventListener("click", event => {
        if (event.target.classList.contains('popup')) {
            document.body.removeChild(popupElement);
            document.body.style.overflow = '';
            $('.wrapper').toggleClass('disableOPS');
        };
    });

    // Щелчок на крестике - закрыть popup
    const closeElement = popupElement.querySelector(".popup__close");
    closeElement.addEventListener("click", event => {
        event.preventDefault();
        document.body.removeChild(popupElement);
        document.body.style.overflow = '';
        $('.wrapper').toggleClass('disableOPS');
    });

    $(document).on('keydown', e => {
        const escCode = 27;
        if (e.keyCode == escCode) {
            if ($(document.body).has(popupElement).length > 0) {
                document.body.removeChild(popupElement);
                document.body.style.overflow = '';
                $('.wrapper').toggleClass('disableOPS');
            }
        };
    });


    return popupElement;
}