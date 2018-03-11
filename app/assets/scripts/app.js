//var getGeolocation = require('./modules/geolocation');
var axios = require('axios');
var listGroup;
var flights = [];
var flightsInfo = document.getElementById('flights-info');

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
                document.querySelector('.list-container').innerHTML += '<li id="' + i + '" class="list-item list-item--' + i + '"><img class="list-item__logo" src="" alt=""><p class="list-item__altitude">' + flights[i].Alt + '</p><p class="list-item__flight-code">' + flights[i].Call + '</p></li>';
            }

            var listItems = document.querySelector('.list-container').childNodes;
            console.log(listItems);

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
    flightsInfo.innerHTML = '<p>' + flights[event.target.id].Man + '</p><p>' + flights[event.target.id].Mdl + '</p><p>' + flights[event.target.id].To + '</p><p>' + flights[event.target.id].From + '</p><p>' + flights[event.target.id].Op + '</p>';
    console.log(event.target.id);
}

function addEvent(element, event_name, func) {
    if (element.addEventListener) {
        element.addEventListener(event_name, func, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + event_name, func);
    }
}
























/* -------------------------------------- */
/* ----------Building JS Router---------- */
/* -------------------------------------- */

/*
var view = document.querySelector('.list-container');

var Router = function(name, routes) {
    return {
        name: name,
        routes: routes
    }
};

var myFirstRouter = new Router('myFirstRouter', [
    {
        path: '/',
        name: 'Root'
    },
    {
        path: '/flightInfo',
        name: 'flightInfo'
    }
]);

var currentPath = window.location.pathname;

if(currentPath === '/flightInfo') {
    view.innerHTML = '<h1>Welcome to Flights Info Page!</h1>';
}

console.log(currentPath);
console.log(myFirstRouter);
*/


// #flights
// #flights-info


var root = null;
var useHash = false; // Defaults to: false
var hash = '#'; // Defaults to: '#'
var router = new Navigo(root, useHash);

var view = document.getElementById('view');

router
  .on({
    '/#': function () {
        view.innerHTML = '';
    },
    '/#flights-info': function () {
        view.innerHTML = '';
    }
  })
  .resolve();

  console.log(window.location);