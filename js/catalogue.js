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

        if (menuElement.classList.contains('catalogue-acco__item--active')) {
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