class MapaKML {
    constructor() {
        this.error = false;
    }
    loadData(file) {
        if (file !== undefined) {
            this.initMap();
            this.readFile(file);
        } else if (this.mapa == undefined) {
            this.initMap();
        }
    }

    readFile(file) {
        if (this.reader == undefined) {
            this.reader = new FileReader();
            this.reader.onload = this.showContent.bind(this);
            this.reader.onerror = this.showError.bind(this);
        }
        this.reader.readAsText(file);
    }

    showContent() {
        this.markerCluster = new MarkerClusterer(this.mapa, [], {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        });
        $('Placemark', this.reader.result).each(this.addMarker.bind(this));


    }

    addMarker(index, place) {
        place = $(place);
        var coordinates = place.children("Point").children("coordinates").text();
        var name = place.children("name").text()
        var txt = "<h2>" + name + "</h2>";
        txt += "<p>Coordenadas: " + coordinates + "</p>";

        var infowindow = new google.maps.InfoWindow({
            content: txt
        });

        var url = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";

        var position = {
            lat: parseFloat(coordinates.trim().split(",")[1]),
            lng: parseFloat(coordinates.trim().split(",")[0])
        }
        var marker = new google.maps.Marker({
            position: position,
            title: name,
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

    initMap() {
        var center = { lat: 43.3482665, lng: -5.9247544 };
        this.mapa = new google.maps.Map($("main").get(0), {
            zoom: 8,
            center: center,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    }
}
var mapaKML = new MapaKML();
