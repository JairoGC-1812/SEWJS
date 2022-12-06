class GeoLocalizacion {
    constructor() {
        this.error = false;
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
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
    }
    getLongitud() {
        return this.longitud;
    }
    getLatitud() {
        return this.latitud;
    }
    getAltitud() {
        return this.altitud;
    }
    verTodo() {
        var datos = '<p>' + this.mensaje + '</p>';
        if (!this.error) {
            datos += '<p>Longitud: ' + this.longitud + ' grados</p>';
            datos += '<p>Latitud: ' + this.latitud + ' grados</p>';
            datos += '<p>Precisión de la latitud y longitud: ' + this.precision + ' metros</p>';
            datos += '<p>Altitud: ' + this.altitude + ' metros</p>';
            datos += '<p>Precisión de la altitud: ' + this.precisionAltitud + ' metros</p>';
            datos += '<p>Rumbo: ' + this.rumbo + ' grados</p>';
            datos += '<p>Velocidad: ' + this.velocidad + ' metros/segundo</p>';

            datos = datos.replace("undefined metros", "Sin datos");
            datos = datos.replace("null metros", "Sin datos");
            datos = datos.replace("null metros/segundo", "Sin datos");
            datos = datos.replace("null grados", "Sin datos");
            datos = datos.replace("undefined grados", "Sin datos");
        }

        $("button").after(datos);
    }

    verErrores(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                this.error = true;
                this.mensaje = "El usuario no permite la petición de geolocalización"
                break;
            case error.POSITION_UNAVAILABLE:
                this.error = true;
                this.mensaje = "Información de geolocalización no disponible"
                break;
            case error.TIMEOUT:
                this.error = true;
                this.mensaje = "La petición de geolocalización ha caducado"
                break;
            case error.UNKNOWN_ERROR:
                this.error = true;
                this.mensaje = "Se ha producido un error desconocido"
                break;
        }
    }

    getMapaEstaticoGoogle() {
        var apiKey = "&key=AIzaSyA-oNqr4z5NFN2HpZC97IBwMlPKzITePjY";
        //URL: obligatoriamente https
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        //Parámetros
        // centro del mapa (obligatorio si no hay marcadores)
        var centro = "center=" + this.latitud + "," + this.longitud;
        //zoom (obligatorio si no hay marcadores)
        //zoom: 1 (el mundo), 5 (continentes), 10 (ciudad), 15 (calles), 20 (edificios)
        var zoom = "&zoom=15";
        //Tamaño del mapa en pixeles (obligatorio)
        var size = "&size=800x600";
        //Escala (opcional)
        //Formato (opcional): PNG,JPEG,GIF
        //Tipo de mapa (opcional)
        //Idioma (opcional)
        //region (opcional)
        //marcadores (opcional)
        var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
        //rutas. path (opcional)
        //visible (optional)
        //style (opcional)
        var sensor = "&sensor=false";

        this.imagenMapa = url + centro + zoom + size + marcador + sensor + apiKey;
        $("button").after("<img src='" + this.imagenMapa + "' alt='mapa estático google' />");
    }
}
var mapaDinamicoGoogle = new Object();

function initMap() {
    var centro = { lat: 43.3672702, lng: -5.8502461 };
    var mapaGeoposicionado = new google.maps.Map($("main").get(0), {
        zoom: 8,
        center: centro,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Usted está aquí');
            infoWindow.open(mapaGeoposicionado);
            mapaGeoposicionado.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, mapaGeoposicionado.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, mapaGeoposicionado.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: Ha fallado la geolocalización' :
        'Error: Su navegador no soporta geolocalización');
    infoWindow.open(mapaGeoposicionado);
}

mapaDinamicoGoogle.initMap = initMap;