class Klotski {
    constructor() {
        this.SCALE = 100
        this.GAME_W = 4
        this.GAME_H = 5

        this.blocks = null
        this.grid = []
        this.currentBlock = null
    }

    init() {
        this.initGrid()
        this.initBlocks()
    }

    initGrid() {
        for (let x = 0; x < this.GAME_W; ++x) {
            const column = []
            for (let y = 0; y < this.GAME_H; ++y) {
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
                this.currentBlock = block
                break
            }
        }
        if (this.currentBlock) {
            this.currentBlock.mousePressed()
        }
    }

    mouseDragged() {
        if (this.currentBlock) {
            this.currentBlock.mouseDragged()
        }
    }

    mouseReleased() {
        if (this.currentBlock) {
            this.currentBlock.mouseReleased()
            this.currentBlock = null
        }
    }

    show() {
        for (let block of this.blocks) {
            block.show()
        }
    }
}
