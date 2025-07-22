"use strict";
/// <reference types="p5/global" />
class Particle extends toxi.physics2d.VerletParticle2D {
    constructor(x, y, physics, r = 8) {
        super(x, y);
        this.r = r;
        physics.addParticle(this);
    }
    show() {
        // fill(0);
        circle(this.x, this.y, this.r * 2);
    }
}
