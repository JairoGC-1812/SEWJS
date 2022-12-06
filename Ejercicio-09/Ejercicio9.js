class Meteo{

    constructor() {
        this.apikey = "caed756cd5eeb819fe6f21c852f860d1";
        this.tipo = "&mode=xml";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
        this.correcto = "¡Todo correcto! JSON recibido de <a href='http://openweathermap.org/'>OpenWeatherMap</a>";
    }

    tiempo(ciudad, button) {
        var url = this.baseUrl;
        url += ciudad + this.tipo + this.unidades +
            this.idioma + "&APPID=" + this.apikey;
        this.cargarXML(url, button);

    }

    cargarXML(urlSitio, button) {
        $.ajax({
            dataType: "xml",
            url: urlSitio,
            method: 'GET',
            success: function(datos) {
                var amanecer              = $('sun',datos).attr("rise");
                    var minutosZonaHoraria    = new Date().getTimezoneOffset();
                    var amanecerMiliSeg1970   = Date.parse(amanecer);
                        amanecerMiliSeg1970  -= minutosZonaHoraria * 60 * 1000;
                    var amanecerLocal         = (new Date(amanecerMiliSeg1970)).toLocaleTimeString("es-ES");
                    var oscurecer             = $('sun',datos).attr("set");          
                    var oscurecerMiliSeg1970  = Date.parse(oscurecer);
                        oscurecerMiliSeg1970  -= minutosZonaHoraria * 60 * 1000;
                    var oscurecerLocal        = (new Date(oscurecerMiliSeg1970)).toLocaleTimeString("es-ES");
                var content = "<section><h3>Resultados</h3><img src=\"http://openweathermap.org/img/w/" +
                $('weather', datos).attr("icon") + ".png\" alt=Tiempo>" +
                "<ul><li>País: " + $('country', datos).text() + "</li>" +
                "<li>Coordenadas: " + $('coord', datos).attr("lon") + ", " + $('coord', datos).attr("lat") + "</li>" +
                "<li>Tiempo: " + $('weather', datos).attr("value") + "</li>" +
                "<li>Temperatura: " + $('temperature', datos).attr("value") + $('temperature', datos).attr("unit") + "</li>" +
                "<li>Temperatura mínima: " + $('temperature', datos).attr("min") + $('temperature', datos).attr("unit") + "</li>" +
                "<li>Temperatura máxima: " + $('temperature', datos).attr("max") + $('temperature', datos).attr("unit") + "</li>" +
                "<li>Humedad: " + $('humidity', datos).attr("value") + $('humidity', datos).attr("unit") + "</li>" +
                "<li>Presión: " + $('pressure', datos).attr("value") + $('pressure', datos).attr("unit") + "</li>" +
                "<li>Visibilidad: " + $('visibility', datos).attr("value") + "</li>" +
                "<li>Viento: " + $('speed', datos).attr("value") + $('speed', datos).attr("unit") + " " + $('speed', datos).attr("name") + "</li>" +
                "<li>Dirección del viento: " + $('direction', datos).attr("value") + ", " + $('direction', datos).attr("name") + "</li>" +
                "<li>Nubosidad: " + $('clouds', datos).attr("value") + ", " + $('clouds', datos).attr("name") + "</li>" +
                "<li>Amanecer: " + (new Date(amanecerMiliSeg1970)).toLocaleTimeString("es-ES") + "</li>" +
                "<li>Atardecer: " + (new Date(oscurecerMiliSeg1970)).toLocaleTimeString("es-ES") + "</li></ul></section>";
                $(button).after(content);
                $(button).remove();
            },
            error: function() {
                $(button).after("<p>¡Tenemos problemas! No podemos obtener JSON de <a href='http://openweathermap.org'>OpenWeatherMap</a></p>");
                $(button).remove();
            }
        });

    }

}

var meteo = new Meteo();