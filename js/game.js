class Game {
    constructor() {
        this.COLOR_MAIN = color(231, 76, 60)
        this.COLOR_NORMAL = color(243, 156, 18)
        this.SCALE = 100
        this.GAME_W = 4
        this.GAME_H = 5

        this.blocks = []
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
        this.blocks.push(new Block('张 飞', 0, 0, 1, 2, this.COLOR_NORMAL))
        this.blocks.push(new Block('曹 操', 1, 0, 2, 2, this.COLOR_MAIN))
        this.blocks.push(new Block('赵 云', 3, 0, 1, 2, this.COLOR_NORMAL))
        this.blocks.push(new Block('黄 忠', 0, 2, 1, 2, this.COLOR_NORMAL))
        this.blocks.push(new Block('关 羽', 1, 2, 2, 1, this.COLOR_NORMAL))
        this.blocks.push(new Block('马 超', 3, 2, 1, 2, this.COLOR_NORMAL))
        this.blocks.push(new Block('卒', 1, 3, 1, 1, this.COLOR_NORMAL))
        this.blocks.push(new Block('卒', 2, 3, 1, 1, this.COLOR_NORMAL))
        this.blocks.push(new Block('卒', 0, 4, 1, 1, this.COLOR_NORMAL))
        this.blocks.push(new Block('卒', 3, 4, 1, 1, this.COLOR_NORMAL))
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
