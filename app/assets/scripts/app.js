var axios = require('axios');
//var getGeolocation = require('./modules/geolocation');

getLocation();

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function showPosition(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);

    fetchFlights(position.coords.latitude, position.coords.longitude);

    setInterval(function () {
        fetchFlights(position.coords.latitude, position.coords.longitude);
    }, 60000);
};

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert('User denied the request for Geolocation.');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable.');
            break;
        case error.TIMEOUT:
            alert('The request to get user location timed out.');
            break;
        case error.UNKNOWN_ERROR:
            alert('An unknown error occurred.');
            break;
    }
};

function fetchFlights(lat, lng) {
    var flights = [];
    var url = 'https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=' + lat + '&lng=' + lng + '&fDstL=0&fDstU=200';

    axios.get(url)
        .then(function (response) {
            console.log('Da, da! Radi!');

            for (var i = 0; i < response.data.acList.length; i++) {
                flights.push(response.data.acList[i]);
            }

            console.log(flights);
            document.querySelector('.list').innerHTML = '';

            for (var i = 0; i < flights.length; i++) {
                document.querySelector('.list').innerHTML += '<li class="list-item-' + i + '"><p>' + flights[i].Alt + '</p><br>' + '<p>' + flights[i].Call + '</p></li>';
            }
        })
        .catch(function (error) {
            console.log(error);
            console.log('Ne, ne! Ne radi!');
        });
}