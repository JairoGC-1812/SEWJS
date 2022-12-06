class FileAnalyzer {
    constructor() {
        this.typesToShow = ["application/json", "text/plain", "text/xml"];
    }

    analyze(file) {
        if (file !== undefined) {
            this.clean();
            this.showMetadata(file);
            if (this.typesToShow.includes(file.type)) {
                this.readFile(file);
            }
        }
    }
    clean() {
        $("main").text("");
    }
    showMetadata(file) {
        var text = "<h2> Metadatos del archivo </h2>";
        text += "<dl>";
        text += "<dt>Nombre: </dt>";
        text += "<dd>" + file.name + "</dd>";
        text += "<dt> Última modificación: </dt>";
        text += "<dd>" + file.lastModifiedDate.toISOString() + "</dd>";
        text += "<dt> Tamaño: </dt>";
        text += "<dd>" + file.size + "</dd>";
        text += "<dt> Tipo MIME: </dt>";
        text += "<dd>" + file.type + "</dd>";
        text += "</dl>";
        $("main").append(text);
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
        var text = "<dt> Contenido en texto plano </dt>";
        text += "<dd>";
        text += "<pre>";
        text += this.replaceGTLT(this.reader.result);
        text += "</pre>";
        text += "</dd>";
        $("dl").append(text);
    }

    showError() {
        var text = "<dt> Error leyendo el contenido </dt>";
        text += "<dd>";
        text += this.reader.error;
        text += "</dd>";
        $("dl").append(text);
    }

    replaceGTLT(txt){
        console.log(txt);
        return txt.replace(/</g, "&lt").replace(/>/g, "&gt");
    }
}

var fileAn = new FileAnalyzer();