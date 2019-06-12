class Block {
    constructor(name, x, y, w, h, color) {
        this.LEFT = 0
        this.RIGHT = 1
        this.UP = 2
        this.DOWN = 3
        this.HORIZONTAL = true
        this.VERTICAL = false
        this.DETECTION_LENGTH = 0.2

        this.name = name
        this.pos = createVector(x, y)
        this.prePos = null
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
        for (let i = start; i >= -1 && i <= size; i += loopDir) {
            if (i < 0 || i >= size || (orientation ? game.grid[i][index] : game.grid[index][i]) === true) {
                const value = i + offset - loopDir
                if (loopDir < 0 ? (value > this.possibleMoves[dir]) : (value <= this.possibleMoves[dir])) {
                    this.possibleMoves[dir] = value
                }
                return
            }
        }
    }

    getPossibleMoves() {
        this.possibleMoves = [0, Infinity, 0, Infinity]
        for (let x = 0; x < this.size.x; x++) {
            for (let y = 0; y < this.size.y; y++) {
                const xCeil = ceil(this.pos.x + x)
                const xFloor = floor(this.pos.x + x)
                const xRound = round(this.pos.x + x)
                const yCeil = ceil(this.pos.y + y)
                const yFloor = floor(this.pos.y + y)
                const yRound = round(this.pos.y + y)
                this.getMovePos(xRound, game.GAME_W, -1, this.HORIZONTAL, yCeil, this.LEFT, 0)
                this.getMovePos(xRound, game.GAME_W, -1, this.HORIZONTAL, yFloor, this.LEFT, 0)
                this.getMovePos(xRound, game.GAME_W, 1, this.HORIZONTAL, yCeil, this.RIGHT, 1 - this.size.x)
                this.getMovePos(xRound, game.GAME_W, 1, this.HORIZONTAL, yFloor, this.RIGHT, 1 - this.size.x)
                this.getMovePos(yRound, game.GAME_H, -1, this.VERTICAL, xCeil, this.UP, 0)
                this.getMovePos(yRound, game.GAME_H, -1, this.VERTICAL, xFloor, this.UP, 0)
                this.getMovePos(yRound, game.GAME_H, 1, this.VERTICAL, xCeil, this.DOWN, 1 - this.size.y)
                this.getMovePos(yRound, game.GAME_H, 1, this.VERTICAL, xFloor, this.DOWN, 1 - this.size.y)
            }
        }
    }

    update() {
        if (this.size.x === 1 && this.size.y === 1) {
            if (abs(this.pos.x - round(this.pos.x)) < this.DETECTION_LENGTH
                && abs(this.pos.y - round(this.pos.y)) < this.DETECTION_LENGTH
                || abs(this.pos.x - this.prePos.x) >= this.DETECTION_LENGTH
                || abs(this.pos.y - this.prePos.y) >= this.DETECTION_LENGTH) {
                this.getPossibleMoves()
                this.prePos = this.pos.copy()
            }
        } else {
            if (!this.prePos || abs(this.pos.x - this.prePos.x) >= 1 || abs(this.pos.y - this.prePos.y) >= 1) {
                this.getPossibleMoves()
                this.prePos = this.pos.copy()
            }
        }
    }

    mousePressed() {
        this.prePos = null
        this.mouseOffset = p5.Vector.sub(createVector(mouseX / game.SCALE, mouseY / game.SCALE), this.pos)
        this.setGrid(false)
    }

    mouseDragged() {
        this.update()
        this.pos.x = constrain(mouseX / game.SCALE - this.mouseOffset.x,
            this.possibleMoves[this.LEFT],
            this.possibleMoves[this.RIGHT])
        this.update()
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
