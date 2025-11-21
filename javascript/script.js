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

            this.observadorQuadrado = 10

            this.positionX = Math.round(Math.random() * (canvas.width - this.observadorQuadrado))

            this.positionY = Math.round(Math.random() * (canvas.height - this.observadorQuadrado))

            this.cor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`

            this.speed = this.getTamnhoDoObservador() * 2
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

        receberNotificacaoDoObservado(notificacao) {
            this.correr()
        }

        correr() {
            if (this.getDirection() === 0) {
                this.setX(this.getSpeed());
                if (this.getX() >= larguraCanva) {
                    this.setDirection(1);
                }
            }

            else if (this.getDirection() === 1) {
                this.setX(-this.speed);
                if (this.getX() <= 0) {
                    this.setDirection(0);
                }
            }

            else if (this.getDirection() === 2) {
                this.setY(-this.getSpeed());
                if (this.getY() <= 0) {
                    this.setDirection(3);
                }
            }

            else if (this.getDirection() === 3) {
                this.setY(this.getSpeed());
                if (this.getY() >= alturaCanva) {
                    this.setDirection(2);
                }
            }
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
        const listaObservadores = [...objectoObservado.getObservadores()]

        if (listaObservadores.length >= 0) {

            context.clearRect(0, 0, canvas.width, canvas.height)

            listaObservadores.forEach((observador) => {
                context.beginPath()
                context.rect(observador.getX(), parseInt(observador.getY()), 20, 20)
                context.fillStyle = observador.cor
                context.fill()
            })
        }

        window.requestAnimationFrame(draw)
    }

    draw()

})
