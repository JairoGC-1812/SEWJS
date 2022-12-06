class MapaEstaticoGoogle {
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
}

var posicion = new GeoLocalizacion();