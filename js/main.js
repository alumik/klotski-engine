let klotski

function setup() {
    createCanvas(400, 500)
    klotski = new Klotski()
    klotski.init()
}

function draw() {
    background(38, 191, 191)
    klotski.show()
}

function mousePressed() {
    klotski.mousePressed()
}

function mouseDragged() {
    klotski.mouseDragged()
}

function mouseReleased() {
    klotski.mouseReleased()
}
