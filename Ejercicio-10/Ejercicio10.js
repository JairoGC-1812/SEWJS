class Oil{

    constructor() {
        this.apikey = "smdu9gn3sbt16syic6b5h0z08830t3r2e269vr1818c75dpau7tkuor8kiy7";
        this.currency = "&base=EUR";
        this.baseUrl = "https://commodities-api.com/api/latest?access_key=";
        this.symbol;
        this.obtainPrices();
    }

    obtainPrices() {
        this.symbol = $("option:selected").val();
        var symbols = "&symbols=" + this.symbol;

        var url = this.baseUrl;
        url += this.apikey + this.currency + symbols;

        this.loadJson(url);

    }

    loadJson(urlSitio) {
        $.ajax({
            dataType: "json",
            url: urlSitio,
            method: 'GET',
            success: function (datos) {
                var unit = this.localizeUnits(datos.data.unit);
                var value = (1 / Object.values(datos.data.rates)[0]) + "€ " + unit;
                $("p").text(value);
            }.bind(this),
            error: function () {
                $(button).after("<p>¡Tenemos problemas! No podemos obtener JSON de <a href='https://commodities-api.com'>Commodities API</a></p>");
            }
        });
    }

    localizeUnits(unit){
        var aux = unit.replace("per", "por");
        aux = aux.replace("barrel", "barril");
        aux = aux.replace("metric ton", "tonelada métrica");
        aux = aux.replace("gallon", "galón");
        return aux;
    }

}

var oil = new Oil();