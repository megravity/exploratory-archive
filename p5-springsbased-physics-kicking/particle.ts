/// <reference path="./types.d.ts" />
/// <reference types="p5/global" />

class Particle extends toxi.physics2d.VerletParticle2D {
    r: number;

    constructor(
        x: number,
        y: number,
        physics: toxi.physics2d.VerletPhysics2D,
        r: number = 8
    ) {
        super(x, y);
        this.r = r;
        physics.addParticle(this);
    }

    show(): void {
        // fill(0);
        circle(this.x, this.y, this.r * 2);
    }
}
