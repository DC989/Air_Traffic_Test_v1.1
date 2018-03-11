exports.showPosition = function (position) {
    text.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
    console.log(position);
};

exports.showError = function (error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            text.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            text.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            text.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            text.innerHTML = "An unknown error occurred."
            break;
    }
};
