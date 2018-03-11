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

            for (var i = 0; i < response.data.acList.length; i++) {
                flights.push(response.data.acList[i]);
            }

            flights.sort(function(a, b) {
                return b.Alt - a.Alt;
            });

            console.log(flights);
            document.querySelector('.list-container__list-group').innerHTML = '';

            for (var i = 0; i < flights.length; i++) {
                document.querySelector('.list-container__list-group').innerHTML += '<li class="list-container__list-item list-container__list-item--' + i + '"><p>' + flights[i].Alt + '</p>' + '<p>' + flights[i].Call + '</p></li>';
            }

            var listItems = document.querySelector('.list-container__list-group').childNodes;
            console.log(listItems);

            for (var e = 0; e < listItems.length; e++) {
                addEvent(listItems[e], "click", showList);
            }
            
        })
        .catch(function (error) {
            console.log(error);
        });
}

function showList(event) {
    console.log(event.target);
}

function addEvent(element, event_name, func) {
    if (element.addEventListener) {
        element.addEventListener(event_name, func, false); 
    } else if (element.attachEvent)  {
        element.attachEvent("on"+event_name, func);
    }
}
