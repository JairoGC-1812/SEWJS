class Section {
    constructor(text) {
        this.hidden = false;
        this.completeText = text;
    }

    hideOrShow(button) {
        if (this.hidden)
            $(button).siblings("section").each(function () {
                $(this).show();
            });
        else {
            $(button).siblings("section").each(function () {
                $(this).hide();
            });
        }

        this.hidden = !this.hidden;
    }

    showMore(button) {
        var txt = this.completeText;
        $(button).siblings("p").each(function () {
            $(this).text(txt);
        });
        $(button).hide();
    }
    addNewSection(button) {
        $(button).before("<section> <h4> Nueva sección </h4> <p> Esto es una nueva sección </p> </section>");
    }

    deleteLastSection(button) {
        $(button).siblings("section").last().remove();
    }

    showParentElements() {
        $("*", document.body).each(function () {
            $("footer").before("<p>");
            var parentElement = $(this).parent().get(0).tagName;
            $("footer").siblings("p").last().append("Etiqueta padre: " + parentElement + " elemento : " + $(this).get(0).tagName + " ");
        });
    }

    concatenateTable() {
        var sumas = ["", "", "", "", "", ""];
        $("table").find("tr").each(function (i) {
            var fila = $(this);
            var sum = "";
            fila.find("td, th").each(function (j) {
                var num = $(this).text();
                sumas[j] += num;
                sum += num;
            });
            sumas[5] += sum;
            if (i == 0)
                fila.append("<th>" + sum + "</th>");
            else
                fila.append("<td>" + sum + "</td>");

        });
        $("tbody").append("<tr><td>"
            + sumas[0] + "</td><td>"
            + sumas[1] + "</td><td>"
            + sumas[2] + "</td><td>"
            + sumas[3] + "</td><td>"
            + sumas[4] + "</td><td>"
            + sumas[5] + "</td></tr>");
    }
}

var s1 = new Section();
var s2 = new Section();
var s3 = new Section("La imperfección de AngularJS fue la motivación detrás de la reescritura completa del marco.Debido a su impredecible sistema de detección de cambios y robustez, los desarrolladores deGooglenecesitaban reescribir el marco. Comenzaron a usar bibliotecas realmente poderosas. Además de las funciones originales, introdujeron enfoques como la compilación AOT (Ahead-of-Time), la sacudida de árboles y muchas más. AOT convierte el código HTML y TypeScript en JavaScript durante el tiempo de compilación, mientras que la sacudida de árboles elimina las importaciones no utilizadas para lograr un arranque de aplicaciones más rápido y una huella más pequeña.");
