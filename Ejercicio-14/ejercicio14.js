class CalculadoraPi {
    constructor() {
        this.inside = 0;
        this.total = 0;
        this.pi = 0;
        this.refresh = 1000;
        this.updates = 0;
        this.canvas = $("canvas").get(0);
        this.setCanvas();

        this.last = [0, 0, 0, 0]
        window.addEventListener("deviceorientation", (e) => this.updatePoints(e.alpha, e.beta), false);
        document.addEventListener("mousemove", (e) => this.updatePoints(e.x, e.y), false);

    }

    setCanvas() {
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

        const side = Math.min(vw, vh) * 0.8;
        this.radius = side / 2;
        this.canvas.width = side;
        this.canvas.height = side;

        const ctx = this.canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.radius, this.radius, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    updatePoints(a, b) {
        this.last = [a, b, a - this.last[2], b - this.last[3]];
        this.updateGenerator(this.last);
        for (let i = 0; i < 10; i++)
            this.generateValue(this.draw.bind(this));
    }

    draw(x, y, ins, pi) {
        const ctx = this.canvas.getContext("2d");
        ctx.fillStyle = ins ? "#0000FF" : "#FF0000";
        ctx.beginPath();
        ctx.fillRect(x, y, 1, 1);
        ctx.stroke();
        this.updates++;
        if (this.updates == this.refresh) {
            this.updates = 0;
            $("p").text(pi);
        }
    }

    updateGenerator(v) {
        let hash = 1
        for (let i = 0; i < v.length; i++)
            hash = 31 * hash + v[i];
        this.gen = isaacCSPRNG(hash.toString())
    }

    generateValue(callback) {
        const x = this.gen.random() * this.radius * 2
        const y = this.gen.random() * this.radius * 2

        const ins = Math.sqrt((this.radius - x) ** 2 + (this.radius - y) ** 2) < this.radius
        if (ins)
            this.inside++;
        this.total++;
        this.pi = (2 * this.radius) ** 2 * this.inside / (this.total * this.radius ** 2);

        callback(x, y, ins, this.pi);
    }
}

var calc = new CalculadoraPi();