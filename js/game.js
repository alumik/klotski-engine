class Game {
    constructor() {
        this.SCALE = 100
        this.GAME_W = 4
        this.GAME_H = 5

        this.blocks = null
        this.grid = []
        this._block = null
    }

    init() {
        this.initGrid()
        this.initBlocks()
    }

    initGrid() {
        for (let x = 0; x < this.GAME_W; x++) {
            const column = []
            for (let y = 0; y < this.GAME_H; y++) {
                column.push(false)
            }
            this.grid.push(column)
        }
    }

    initBlocks() {
        this.blocks = [
            new Block(1, 0, 2, 2, true),
            new Block(0, 0, 1, 2),
            new Block(3, 0, 1, 2),
            new Block(0, 2, 1, 2),
            new Block(1, 2, 2, 1),
            new Block(3, 2, 1, 2),
            new Block(1, 3, 1, 1),
            new Block(2, 3, 1, 1),
            new Block(0, 4, 1, 1),
            new Block(3, 4, 1, 1)
        ]
    }

    mousePressed() {
        for (let block of this.blocks) {
            if (block.contains(mouseX, mouseY)) {
                this._block = block
            }
        }
        if (this._block) {
            this._block.mousePressed()
        }
    }

    mouseDragged() {
        if (this._block) {
            this._block.mouseDragged()
        }
    }

    mouseReleased() {
        if (this._block) {
            this._block.mouseReleased()
            this._block = null
        }
    }

    show() {
        for (let block of this.blocks) {
            block.show()
        }
    }
}
