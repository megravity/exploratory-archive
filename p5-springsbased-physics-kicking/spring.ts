/// <reference types="p5/global" />

class Spring extends toxi.physics2d.VerletSpring2D {
    support: boolean;

    constructor(
        a: Particle,
        b: Particle,
        length: number,
        strength: number,
        physics: toxi.physics2d.VerletPhysics2D,
        support: boolean
    ) {
        super(a, b, length, strength);
        this.support = support;
        physics.addSpring(this);
    }

    show() {
        if (!this.support) {
            line(this.a.x, this.a.y, this.b.x, this.b.y);
        }
    }
}
