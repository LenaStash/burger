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