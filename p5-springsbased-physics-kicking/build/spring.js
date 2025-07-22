"use strict";
class Spring extends toxi.physics2d.VerletSpring2D {
    constructor(a, b, length, strength, physics, support) {
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
