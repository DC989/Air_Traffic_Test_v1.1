var axios = require('axios');
var listGroup;
var flights = [];
var flightsDiv = document.getElementById('flights');
var flightsInfoDiv = document.querySelector('.flights-info');

flightsInfoDiv.style.display = "none";

getLocation();

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function showPosition(position) {
    //console.log(position.coords.latitude);
    //console.log(position.coords.longitude);

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
    flights = []
    var url = 'https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=' + lat + '&lng=' + lng + '&fDstL=0&fDstU=200';

    axios.get(url)
        .then(function (response) {

            for (var i = 0; i < response.data.acList.length; i++) {
                flights.push(response.data.acList[i]);
            }

            flights.sort(function (a, b) {
                return b.Alt - a.Alt;
            });

            // Airplane Manufacturer: flights[event.target.id].Man
            // Airplane Model: flights[event.target.id].Mdl
            // Destination: flights[event.target.id].To
            // Flight Origin airport: flights[event.target.id].From
            // Logo of the Airline company: flights[event.target.id].Op

            console.log(flights);
            document.querySelector('.list-container').innerHTML = '';

            for (var i = 0; i < flights.length; i++) {
                document.querySelector('.list-container').innerHTML += '<li id="' + i + '" class="list-item list-item--' + i + '"><img class="list-item__logo list-item__logo--' + i + '" src="" alt="Airplane icon"><p class="list-item__altitude">Altitude: ' + flights[i].Alt + '</p><p class="list-item__flight-code">Flight Code Number: ' + flights[i].Call + '</p></li>';

                if(flights[i].Long > 0) {
                    document.querySelector('.list-item__logo--' + i).src = 'assets/images/east.png';
                    //console.log('East!!!');
                } else if (flights[i].Long < 0) {
                    document.querySelector('.list-item__logo--' + i).src = 'assets/images/west.png';
                    //console.log('West!!!');
                }
            }

            var listItems = document.querySelector('.list-container').childNodes;
            //console.log(listItems);

            for (var e = 0; e < listItems.length; e++) {
                addEvent(listItems[e], "click", showList);
            }

            listGroup = document.querySelector('.list-container').innerHTML;
            //console.log(listGroup);

        })
        .catch(function (error) {
            console.log(error);
        });
}

function showList() {
    //var id = event.target.id;
    //var convertedId = parseInt(id.substring(7, 8));

    flightsInfoDiv.innerHTML = '<div class="flights-info__content"><p><em>Airplane Manufacturer:</em> <strong>' + flights[event.target.id].Man + '</strong></p><p><em>Airplane Model:</em> <strong>' + flights[event.target.id].Mdl + '</strong></p><p><em>Destination:</em> <strong>' + flights[event.target.id].To + '</strong></p><p><em>Origin:</em> <strong>' + flights[event.target.id].From + '</strong></p><p><em>Airline Company:</em> <strong>' + flights[event.target.id].Op + '</strong></p><img src="//logo.clearbit.com/' + flights[event.target.id].Op + '.com"></div><button class="btn" type="button">Go Back To All Flights</button>';

    document.querySelector('.btn').addEventListener('click', function() {
        flightsInfoDiv.style.display = "none";
        flightsDiv.style.display = "block";
    });

    flightsInfoDiv.style.display = "block";
    flightsDiv.style.display = "none";

    console.log(event.target.id);
}

function addEvent(element, event_name, func) {
    if (element.addEventListener) {
        element.addEventListener(event_name, func, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + event_name, func);
    }
}