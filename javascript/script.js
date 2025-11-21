document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector("#canvas")
    const context = canvas.getContext("2d")

    const larguraCanva = canvas.width
    const alturaCanva = canvas.height

    class Observado {
        constructor() {
            this.observadores = []
        }

        addObservador(observador) {

            this.tocarEfeitoSonoro("./efeitosSonoros/efeitoCriar.mp3")
            this.observadores.push(observador)

        }

        removeObservador() {
            if (this.observadores.length > 0) {
                this.tocarEfeitoSonoro("./efeitosSonoros/efeitoRemover.wav")
                this.observadores.pop()
            }

        }

        notificarObservadores(notificacao) {
            if (this.observadores.length > 0) {
                this.observadores.forEach((observador) => {
                    observador.receberNotificacaoDoObservado(notificacao)
                })
            }
        }

        getObservadores() {
            return this.observadores
        }

        tocarEfeitoSonoro(srcDoSom) {
            const efeitoSonoro = new Audio(srcDoSom)

            efeitoSonoro.play()
        }

    }

    class Observador {

        constructor() {

            this.observadorQuadrado = 20

            this.positionX = Math.round(Math.random() * (canvas.width - this.observadorQuadrado))

            this.positionY = Math.round(Math.random() * (canvas.height - this.observadorQuadrado))

            this.cor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`

            this.speed = this.getTamnhoDoObservador()
            this.direction = Math.round(Math.random() * 3)
            console.log(this.direction)
        }

        getTamnhoDoObservador() {
            return this.observadorQuadrado
        }

        getX() {
            return this.positionX
        }

        getY() {
            return this.positionY
        }

        setX(valor) {
            this.positionX += valor
        }

        setY(valor) {
            this.positionY += valor
        }

        getDirection() {
            return this.direction
        }

        setDirection(newDirection) {
            this.direction = newDirection
        }

        getSpeed() {
            return this.speed
        }

        setSpeed(valor) {
            this.speed = valor
        }

        receberNotificacaoDoObservado(notificacao) {
            this.correr()
        }

        correr() {
            if (this.getDirection() == 0 && (this.getX() < (larguraCanva - this.getTamnhoDoObservador()))) {
                this.setX(this.getSpeed())
            }

            if (this.getDirection() == 0 && (this.getX() > (larguraCanva - this.getTamnhoDoObservador()))) {
                this.setDirection(1)
            }

            if (this.direction == 1 && (this.getX() > 0)) {
                this.setX(-this.getSpeed())
            }

            if (this.getDirection() == 1 && (this.getX() <= 0)) {
                this.setDirection(0)
            }

            if (this.getDirection() == 2 && (this.getY() >= 0)) {
                this.setY(-this.getSpeed())
            }

            if (this.getDirection() == 2 && (this.getY() <= 0)) {
                this.setDirection(3)
            }

            if (this.getDirection() == 3 && (this.getY() < (alturaCanva - this.getTamnhoDoObservador()))) {
                this.setY(this.getSpeed())
            }

            if (this.getDirection() == 3 && (this.getY() > (alturaCanva - this.getTamnhoDoObservador()))) {
                this.setDirection(2)
            }

            console.log(larguraCanva - this.getTamnhoDoObservador())

        }

    }

    const objectoObservado = new Observado()

    document.querySelector("#btnCriarObservador").addEventListener("click", () => {
        const observador = new Observador()
        objectoObservado.addObservador(observador)

    })

    document.querySelector("#btnEliminarObservador").addEventListener("click", () => {
        objectoObservado.removeObservador()
    })

    document.querySelector("#btnNotificar").addEventListener("click", () => {
        objectoObservado.notificarObservadores("Corram")
    })

    function draw() {
        const observadores = objectoObservado.getObservadores()

        if (observadores.length >= 0) {
            context.clearRect(0, 0, canvas.width, canvas.height)

            for (let contador = 0; contador < (observadores.length); contador++) {
                context.beginPath()
                context.rect(observadores[contador].getX(), parseInt(observadores[contador].getY()), 20, 20)
                context.fillStyle = observadores[contador].cor
                context.fill()
            }
        }

        window.requestAnimationFrame(draw)
    }

    draw()

})
