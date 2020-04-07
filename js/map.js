let myMap;

const init = () => {
    myMap = new ymaps.Map("map", {
        center: [59.918077, 30.304899],
        zoom: 12,
        controls: []
    });
    placemarks.forEach(obj => {
        let placemark = new ymaps.Placemark([obj.latitude, obj.longitude], {
            hintContent: obj.hintContent,
            balloonContent: obj.balloonContent
        }, {
            iconLayout: 'default#image',
            iconImageHref: './../img/icons/map-marker.svg',
            iconImageSize: [46, 57],
            iconImageOffset: [-26, -52]
        });
        myMap.geoObjects.add(placemark);

    });
}

let placemarks = [{
        latitude: 59.97,
        longitude: 30.31,
        hintContent: 'ул. Литераторов, д. 19',
        balloonContent: 'Самые вкусные бургеры! <br> Заходите с 09:00 до 20:00 на ул. Литераторов, д. 19'
    },
    {
        latitude: 59.94,
        longitude: 30.25,
        hintContent: 'Малый проспект, д. 64',
        balloonContent: 'Самые вкусные бургеры! <br> Заходите с 09:00 до 20:00 на Малый проспект, д. 64'
    },
    {
        latitude: 59.93,
        longitude: 30.34,
        hintContent: 'наб. реки Фонтанки, д. 56',
        balloonContent: 'Самые вкусные бургеры! <br> Заходите с 09:00 до 20:00 на наб. реки Фонтанки, д. 56'
    }

];

ymaps.ready(init);