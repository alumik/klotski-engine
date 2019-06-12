class Block {
    constructor(name, x, y, w, h, color) {
        this.LEFT = 0
        this.RIGHT = 1
        this.UP = 2
        this.DOWN = 3

        this.name = name
        this.pos = createVector(x, y)
        this.size = createVector(w, h)
        this.color = color
        this.mouseOffset = null
        this.possibleMoves = null

        this.setGrid(true)
    }

    contains(x, y) {
        return x >= this.pos.x * game.SCALE
            && x < (this.pos.x + this.size.x) * game.SCALE
            && y >= this.pos.y * game.SCALE
            && y < (this.pos.y + this.size.y) * game.SCALE
    }

    show() {
        stroke(51)
        strokeWeight(3)
        fill(this.color)
        rect(this.pos.x * game.SCALE,
            this.pos.y * game.SCALE,
            this.size.x * game.SCALE,
            this.size.y * game.SCALE)
        fill(51)
        textSize(50)
        textAlign(CENTER, CENTER)
        text(this.name,
            this.pos.x * game.SCALE + 8,
            this.pos.y * game.SCALE,
            this.size.x * game.SCALE,
            this.size.y * game.SCALE)
    }

    setGrid(state) {
        for (let i = 0; i < this.size.x; i++) {
            for (let j = 0; j < this.size.y; j++) {
                game.grid[this.pos.x + i][this.pos.y + j] = state
            }
        }
    }

    getMovePos(start, size, loopDir, orientation, index, dir, offset) {
        for (let i = start; i >= 0 && i < size; i += loopDir) {
            if ((orientation ? game.grid[i][index] : game.grid[index][i]) === false) {
                if (loopDir > 0 ? (i + offset > this.possibleMoves[dir]) : (i + offset <= this.possibleMoves[dir])) {
                    this.possibleMoves[dir] = i + offset
                }
                return
            }
        }
    }

    getPossibleMoves() {
        this.possibleMoves = [0, Infinity, 0, Infinity]
        for (let x = 0; x < this.size.x; x++) {
            for (let y = 0; y < this.size.y; y++) {
                const y_ceil = ceil(this.pos.y + y)
                const y_floor = floor(this.pos.y + y)
                const x_ceil = ceil(this.pos.x + x)
                const x_floor = floor(this.pos.x + x)
                this.getMovePos(0, game.GAME_W, 1, true, y_ceil, this.LEFT, 0)
                this.getMovePos(0, game.GAME_W, 1, true, y_floor, this.LEFT, 0)
                this.getMovePos(game.GAME_W - 1, game.GAME_W, -1, true, y_ceil, this.RIGHT, 1 - this.size.x)
                this.getMovePos(game.GAME_W - 1, game.GAME_W, -1, true, y_floor, this.RIGHT, 1 - this.size.x)
                this.getMovePos(0, game.GAME_H, 1, false, x_ceil, this.UP, 0)
                this.getMovePos(0, game.GAME_H, 1, false, x_floor, this.UP, 0)
                this.getMovePos(game.GAME_H - 1, game.GAME_H, -1, false, x_ceil, this.DOWN, 1 - this.size.y)
                this.getMovePos(game.GAME_H - 1, game.GAME_H, -1, false, x_floor, this.DOWN, 1 - this.size.y)
            }
        }
    }

    mousePressed() {
        this.mouseOffset = p5.Vector.sub(createVector(mouseX / game.SCALE, mouseY / game.SCALE), this.pos)
        this.setGrid(false)
    }

    mouseDragged() {
        this.getPossibleMoves()
        this.pos.x = constrain(mouseX / game.SCALE - this.mouseOffset.x,
            this.possibleMoves[this.LEFT],
            this.possibleMoves[this.RIGHT])
        this.pos.y = constrain(mouseY / game.SCALE - this.mouseOffset.y,
            this.possibleMoves[this.UP],
            this.possibleMoves[this.DOWN])
    }

    mouseReleased() {
        this.pos.x = round(this.pos.x)
        this.pos.y = round(this.pos.y)
        this.setGrid(true)
    }
}
