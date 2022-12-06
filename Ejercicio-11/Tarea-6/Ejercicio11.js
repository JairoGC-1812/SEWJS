class Mapa {
    constructor(searchWord) {
        this.error = false;
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this));
        this.keyword = searchWord;
    }

    getPosicion(posicion) {
        this.mensaje = "Se ha realizado correctamente la petición de geolocalización";
        this.longitud = posicion.coords.longitude;
        this.latitud = posicion.coords.latitude;
        this.precision = posicion.coords.accuracy;
        this.altitud = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo = posicion.coords.heading;
        this.velocidad = posicion.coords.speed;

        if (!this.error) {
            this.initMap();
        }
    }

    initMap() {
        var center = { lat: this.latitud, lng: this.longitud };
        this.mapa = new google.maps.Map($("main").get(0), {
            zoom: 8,
            center: center,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        this.getMapPlaces();
    }

    getMapPlaces() {
        var apiKey = "AIzaSyAKGeBhitSe-U3eB9dUTTpLFzh7IeJFaKo";
        var request = {
            location: { lat: this.latitud, lng: this.longitud },
            radius: '50000',
            language: 'es',
            apiKey: apiKey,
            keyword: this.keyword
        }

        var service = new google.maps.places.PlacesService(this.mapa);
        service.nearbySearch(request, this.representData.bind(this));
    }
    representData(data) {
        this.markerCluster = new MarkerClusterer(this.mapa, [], {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        });;
        data.forEach(this.addMarker.bind(this));
    }

    addMarker(place) {
        var txt = "<h2>" + place.name + "</h2>";
        txt += "<p>Puntuación: " + place.rating + "</p>";
        txt += "<p>Dirección: " + place.vicinity + "</p>";

        var infowindow = new google.maps.InfoWindow({
            content: txt
        });

        var url = "http://maps.google.com/mapfiles/ms/icons/";

        if (place.rating >= 0 && place.rating < 2)
            url += "red-dot.png";
        if (place.rating >= 2 && place.rating < 4)
            url += "yellow-dot.png";
        if (place.rating >= 4 && place.rating <= 5)
            url += "green-dot.png";

        var marker = new google.maps.Marker({
            position: place.geometry.location,
            title: place.name,
            icon: {
                url: url
            }
        })

        marker.addListener('click', function () {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            infowindow.open(this.mapa, marker);
            setTimeout(function () {
                marker.setAnimation(null);
            }, 500);
        });

        this.markerCluster.addMarker(marker);
    }
    showError(error) {
        $("main").before("<p> Error: " + error + "</p>");
    }
}
var mapa;
function execute() {
    executeWithKeyword("restaurantes");
}
function executeWithKeyword(keyword) {
    mapa = new Mapa(keyword);
}
