let game

function setup() {
    createCanvas(400, 500)

    game = new Game()
    game.init()
}

function draw() {
    background(38, 191, 191)
    game.show()
}

function mousePressed() {
    game.mousePressed()
}

function mouseDragged() {
    game.mouseDragged()
}

function mouseReleased() {
    game.mouseReleased()
}
