/// <reference path="./types.d.ts" />

const { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
const { GravityBehavior } = toxi.physics2d.behaviors;
const { Vec2D, Rect } = toxi.geom;

const physics: VerletPhysics2D = new VerletPhysics2D();
const particles: Particle[] = [];
const springs: Spring[] = [];

const params = {
    numParticles: 24,
    baseRadius: 80,
    noiseStrength: 70,
    noiseScale: 0.1,
    springStrength: 0.1,
    gravity: 0.5,
    regenerate: () => {
        // Clear and regenerate everything
        setupPhysics();
        generateParticles();
        generateSprings();
    },
};

function setupCustomControls() {
    const ids = [
        "numParticles",
        "baseRadius",
        "noiseStrength",
        "springStrength",
        "gravity",
    ];
    ids.forEach((id) => {
        const el = document.getElementById(id) as HTMLInputElement;
        if (el) {
            el.addEventListener("input", () => {
                (params as any)[id] = parseFloat(el.value);
                params.regenerate();
            });
        }
    });
    const btn = document.getElementById("regenerate");
    if (btn) btn.addEventListener("click", params.regenerate);
}

function setup() {
    createCanvas(720, 560).parent("canvas-container");
    setupCustomControls();
    params.regenerate();
}

function draw() {
    background(255, 220, 95);
    physics.update();
    renderShape();
}

const setupPhysics = () => {
    physics.clear();
    physics.addBehavior(new GravityBehavior(new Vec2D(0, params.gravity)));
    physics.setWorldBounds(new Rect(0, 0, width, height));
    particles.length = 0;
    springs.length = 0;
};

const generateParticles = () => {
    const numParticles = params.numParticles; // Number of points around the shape
    const centerX = width / 2;
    const centerY = height / 2;
    const baseRadius = params.baseRadius; // Average radius
    const noiseStrength = params.noiseStrength; // Increase for more variation
    const noiseScale = params.noiseScale; // Controls how "smooth" the noise is

    for (let i = 0; i < numParticles; i++) {
        const angle = (TWO_PI / numParticles) * i;

        // Use Perlin noise for smoother, more organic variation
        const noiseValue = noise(
            cos(angle) * noiseScale + 1000,
            sin(angle) * noiseScale + 1000
        );
        const radiusVariation = map(
            noiseValue,
            0,
            1,
            -noiseStrength,
            noiseStrength
        );
        const radius = baseRadius + radiusVariation;

        const x = centerX + radius * cos(angle);
        const y = centerY + radius * sin(angle);
        particles.push(new Particle(x, y, physics));
    }
};

const generateSprings = () => {
    // Generate springs that form the shape
    particles.forEach((particle, i) => {
        const a = particles[i];
        const b = particles[(i + 1) % particles.length];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const restLength = Math.sqrt(dx * dx + dy * dy);
        springs.push(
            new Spring(
                a,
                b,
                restLength,
                params.springStrength, // Increase strength for more rigidity
                physics,
                false
            )
        );
    });

    // Generate support springs
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 2; j < particles.length; j++) {
            // Skip immediate neighbors and wrap-around
            if (
                (j - i) % particles.length !== 1 &&
                (j - i) % particles.length !== particles.length - 1
            ) {
                const a = particles[i];
                const b = particles[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const restLength = Math.sqrt(dx * dx + dy * dy);
                springs.push(
                    new Spring(
                        a,
                        b,
                        restLength,
                        params.springStrength,
                        physics,
                        true
                    )
                );
            }
        }
    }
};

const renderShape = () => {
    fill(255);
    noStroke();

    beginShape();
    // Start with the first particle
    vertex(particles[0].x, particles[0].y);

    for (let i = 0; i < particles.length; i++) {
        const current = particles[i];
        const next = particles[(i + 1) % particles.length];

        // Calculate control points for smooth curves
        const controlDistance = 30; // Adjust this for curve smoothness

        // Calculate direction vector from current to next
        const dx = next.x - current.x;
        const dy = next.y - current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Normalize and scale by controlDistance
        const normalizedDx = (dx / distance) * controlDistance;
        const normalizedDy = (dy / distance) * controlDistance;

        // Control point 1: move from current in direction of next
        const cp1x = current.x + normalizedDx * 0.4;
        const cp1y = current.y + normalizedDy * 0.4;

        // Control point 2: move from next back towards current
        const cp2x = next.x - normalizedDx * 0.4;
        const cp2y = next.y - normalizedDy * 0.4;

        // Create bezier curve to next point
        bezierVertex(cp1x, cp1y, cp2x, cp2y, next.x, next.y);
    }

    endShape(CLOSE);
};

const getNearestParticleToMouse = (
    distanceThreshold: number
): Particle | undefined => {
    let lowestDistance: number = sqrt(width ** 2 + height ** 2);
    let nearestParticle: Particle | undefined;
    for (let i = 0; i < particles.length; i++) {
        let dx = mouseX - particles[i].x;
        let dy = mouseY - particles[i].y;
        let distance = sqrt(dx ** 2 + dy ** 2);

        if (lowestDistance <= distanceThreshold) break;

        if (distance <= lowestDistance) {
            lowestDistance = distance;
            nearestParticle = particles[i];
        }
    }
    if (lowestDistance <= distanceThreshold) {
        return nearestParticle;
    }
};

const applyForceToNearestParticle = () => {
    const particle = getNearestParticleToMouse(70);
    if (particle !== undefined) {
        let strength = 0.5;

        let fx = (mouseX - particle.x) * strength;
        let fy = (mouseY - particle.y) * strength;

        let force = new Vec2D(fx, fy);

        particle.addForce(force);
    }
};

const applyForceToNearbyParticles = (radius: number, strength: number) => {
    for (let i = 0; i < particles.length; i++) {
        let particle = particles[i];
        let dx = mouseX - particle.x;
        let dy = mouseY - particle.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= radius) {
            // Optionally scale force so closer particles get more force
            let scaledStrength = strength * (10 - distance / radius) * -1;
            let fx = dx * scaledStrength;
            let fy = dy * scaledStrength;
            let force = new Vec2D(fx, fy);
            particle.addForce(force);
        }
    }
};

function mousePressed() {
    applyForceToNearbyParticles(70, 0.5);
}
