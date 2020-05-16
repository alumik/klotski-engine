class Block {
    constructor(x, y, w, h, isMain) {
        this.LEFT = 0
        this.RIGHT = 1
        this.UP = 2
        this.DOWN = 3
        this.HORIZONTAL = true
        this.VERTICAL = false
        this.COLOR_MAIN = color(252, 97, 112)
        this.COLOR_NORMAL = color(255, 215, 71)

        this.pos = createVector(x, y)
        this.size = createVector(w, h)
        this.color = isMain ? this.COLOR_MAIN : this.COLOR_NORMAL
        this.mouseOffset = null
        this.moveLimits = null
        this.detectionFlag = null

        this.setGrid(true)
    }

    contains(x, y) {
        return x >= this.pos.x * klotski.SCALE
            && x < (this.pos.x + this.size.x) * klotski.SCALE
            && y >= this.pos.y * klotski.SCALE
            && y < (this.pos.y + this.size.y) * klotski.SCALE
    }

    show() {
        stroke(0)
        strokeWeight(3)
        fill(this.color)
        rect(this.pos.x * klotski.SCALE,
            this.pos.y * klotski.SCALE,
            this.size.x * klotski.SCALE,
            this.size.y * klotski.SCALE)
    }

    setGrid(state) {
        for (let i = 0; i < this.size.x; ++i) {
            for (let j = 0; j < this.size.y; ++j) {
                klotski.grid[this.pos.x + i][this.pos.y + j] = state
            }
        }
    }

    getMoveLimit(start, size, loopDir, orientation, index, dir, offset) {
        for (let i = start; i >= -1 && i <= size; i += loopDir) {
            if (i < 0 || i >= size || (orientation ? klotski.grid[i][index] : klotski.grid[index][i])) {
                const move = i + offset - loopDir
                if (loopDir > 0 === move < this.moveLimits[dir]) {
                    this.moveLimits[dir] = move
                }
                return
            }
        }
    }

    getMoveLimitPair(start, size, loopDir, orientation, indexCeil, indexFloor, dir, offset) {
        this.getMoveLimit(start, size, loopDir, orientation, indexCeil, dir, offset)
        if (indexCeil !== indexFloor) {
            this.getMoveLimit(start, size, loopDir, orientation, indexFloor, dir, offset)
        }
    }

    getMoveLimits() {
        this.moveLimits = [0, Infinity, 0, Infinity]
        for (let x = 0; x < this.size.x; ++x) {
            for (let y = 0; y < this.size.y; ++y) {
                const relativePos = createVector(this.pos.x + x, this.pos.y + y)
                const ceilPos = createVector(ceil(relativePos.x), ceil(relativePos.y))
                const floorPos = createVector(floor(relativePos.x), floor(relativePos.y))
                const roundPos = createVector(round(relativePos.x), round(relativePos.y))

                this.getMoveLimitPair(roundPos.x, klotski.GAME_W, -1, this.HORIZONTAL, ceilPos.y, floorPos.y, this.LEFT, 0)
                this.getMoveLimitPair(roundPos.x, klotski.GAME_W, 1, this.HORIZONTAL, ceilPos.y, floorPos.y, this.RIGHT, 1 - this.size.x)
                this.getMoveLimitPair(roundPos.y, klotski.GAME_H, -1, this.VERTICAL, ceilPos.x, floorPos.x, this.UP, 0)
                this.getMoveLimitPair(roundPos.y, klotski.GAME_H, 1, this.VERTICAL, ceilPos.x, floorPos.x, this.DOWN, 1 - this.size.y)
            }
        }
    }

    update() {
        if (this.size.x === 1 && this.size.y === 1) {
            if (this.detectionFlag) {
                this.getMoveLimits()
            }
            this.detectionFlag = abs(this.pos.x - round(this.pos.x)) + abs(this.pos.y - round(this.pos.y)) === 0
        } else {
            if (this.detectionFlag) {
                this.getMoveLimits()
                this.detectionFlag = false
            }
        }
    }

    mousePressed() {
        this.detectionFlag = true
        this.mouseOffset = p5.Vector.sub(createVector(mouseX / klotski.SCALE, mouseY / klotski.SCALE), this.pos)
        this.setGrid(false)
    }

    mouseDragged() {
        this.update()
        this.pos.x = constrain(mouseX / klotski.SCALE - this.mouseOffset.x,
            this.moveLimits[this.LEFT],
            this.moveLimits[this.RIGHT])
        this.update()
        this.pos.y = constrain(mouseY / klotski.SCALE - this.mouseOffset.y,
            this.moveLimits[this.UP],
            this.moveLimits[this.DOWN])
    }

    mouseReleased() {
        this.pos.x = round(this.pos.x)
        this.pos.y = round(this.pos.y)
        this.setGrid(true)
    }
}
