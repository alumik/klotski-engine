class Ray {
    constructor (x, y, a, b) {
        this.origin = createVector(x, y)
        this.particle = this.origin.copy()
        this.iterations = max(abs(x - a), abs(y - b))
        this.step = createVector((a - x) / this.iterations, (b - y) / this.iterations)
    }

    rayCast2D(colliders) {
        for (let i = 0; i < this.iterations; i++) {
            this.particle.add(this.step)
            if (this.particle.x > width || this.particle.x < 0 || this.particle.y > height || this.particle.y < 0) {
                this.particle.sub(this.step)
                return p5.Vector.dist(this.particle, this.origin)
            }
            for (let collider of colliders) {
                if (collider.contains(this.particle.x, this.particle.y)) {
                    this.particle.sub(this.step)
                    return p5.Vector.dist(this.particle, this.origin)
                }
            }
        }
        return false
    }

    getVector() {
        return p5.Vector.sub(this.particle, this.origin)
    }
}