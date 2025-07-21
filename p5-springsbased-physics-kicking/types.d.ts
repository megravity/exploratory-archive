// Type definitions for toxiclibs physics2d classes
// Based on Java documentation from https://shiffman.github.io/toxiclibs-javadocs/

declare namespace toxi {
    namespace geom {
        class Vec2D {
            x: number;
            y: number;

            constructor(x: number, y: number);

            add(v: Vec2D): Vec2D;
            sub(v: Vec2D): Vec2D;
            scale(s: number): Vec2D;
            distanceTo(v: Vec2D): number;
            magnitude(): number;
            normalize(): Vec2D;
            copy(): Vec2D;
            // ...add more methods as needed...
        }

        class Rect {
            x: number;
            y: number;
            width: number;
            height: number;

            constructor(x: number, y: number, width: number, height: number);

            containsPoint(p: Vec2D): boolean;
            getArea(): number;
            getPerimeter(): number;
            copy(): Rect;
            // ...add more methods as needed...
        }

        interface ReadonlyVec2D {
            readonly x: number;
            readonly y: number;
        }
    }

    namespace physics2d {
        interface SpatialIndex<T> {
            // Spatial indexing interface - implementation details vary
        }

        interface ParticleBehavior2D {
            // Particle behavior interface - implementation details vary
        }

        interface ParticleConstraint2D {
            // Particle constraint interface - implementation details vary
        }

        class VerletParticle2D extends geom.Vec2D {
            bounds: toxi.geom.Rect | null;
            constraints: toxi.physics2d.ParticleConstraint2D[];
            behaviors: toxi.physics2d.ParticleBehavior2D[];

            constructor(x: number, y: number);
            constructor(x: number, y: number, w: number);
            constructor(v: toxi.geom.ReadonlyVec2D);
            constructor(v: toxi.geom.ReadonlyVec2D, w: number);
            constructor(p: VerletParticle2D);

            addBehavior(behavior: ParticleBehavior2D): VerletParticle2D;
            addBehavior(
                behavior: ParticleBehavior2D,
                timeStep: number
            ): VerletParticle2D;
            addBehaviors(behaviors: ParticleBehavior2D[]): VerletParticle2D;
            addBehaviors(
                behaviors: ParticleBehavior2D[],
                timeStep: number
            ): VerletParticle2D;
            removeAllBehaviors(): VerletParticle2D;
            removeBehavior(behavior: ParticleBehavior2D): boolean;
            removeBehaviors(behaviors: ParticleBehavior2D[]): boolean;
            applyBehaviors(): void;

            addConstraint(constraint: ParticleConstraint2D): VerletParticle2D;
            addConstraints(
                constraints: ParticleConstraint2D[]
            ): VerletParticle2D;
            removeAllConstraints(): VerletParticle2D;
            removeConstraint(constraint: ParticleConstraint2D): boolean;
            removeConstraints(constraints: ParticleConstraint2D[]): boolean;
            applyConstraints(): void;

            addForce(f: toxi.geom.Vec2D): VerletParticle2D;
            addVelocity(v: toxi.geom.Vec2D): VerletParticle2D;
            clearForce(): VerletParticle2D;
            clearVelocity(): VerletParticle2D;
            getForce(): toxi.geom.Vec2D;
            getVelocity(): toxi.geom.Vec2D;
            scaleVelocity(scale: number): VerletParticle2D;

            getPreviousPosition(): toxi.geom.Vec2D;
            setPreviousPosition(p: toxi.geom.Vec2D): VerletParticle2D;

            getWeight(): number;
            getInvWeight(): number;
            setWeight(w: number): void;

            isLocked(): boolean;
            lock(): VerletParticle2D;
            unlock(): VerletParticle2D;

            update(): void;
        }

        class VerletSpring2D {
            a: VerletParticle2D;
            b: VerletParticle2D;

            constructor(
                a: VerletParticle2D,
                b: VerletParticle2D,
                restLength: number,
                strength: number
            );

            getRestLength(): number;
            setRestLength(length: number): VerletSpring2D;
            getStrength(): number;
            setStrength(strength: number): VerletSpring2D;

            lockA(locked: boolean): VerletSpring2D;
            lockB(locked: boolean): VerletSpring2D;

            update(): void;
        }

        class VerletPhysics2D {
            particles: VerletParticle2D[];
            springs: VerletSpring2D[];
            behaviors: ParticleBehavior2D[];
            constraints: ParticleConstraint2D[];

            constructor();
            constructor(
                gravity: toxi.geom.Vec2D,
                numIterations: number,
                drag: number,
                timeStep: number
            );

            static addConstraintToAll(
                constraint: ParticleConstraint2D,
                particles: VerletParticle2D[]
            ): void;
            static removeConstraintFromAll(
                constraint: ParticleConstraint2D,
                particles: VerletParticle2D[]
            ): void;

            addBehavior(behavior: ParticleBehavior2D): void;
            removeBehavior(behavior: ParticleBehavior2D): boolean;

            addConstraint(constraint: ParticleConstraint2D): void;
            removeConstraint(constraint: ParticleConstraint2D): boolean;

            addParticle(particle: VerletParticle2D): VerletPhysics2D;
            removeParticle(particle: VerletParticle2D): boolean;

            addSpring(spring: VerletSpring2D): VerletPhysics2D;
            removeSpring(spring: VerletSpring2D): boolean;
            removeSpringElements(spring: VerletSpring2D): boolean;
            getSpring(
                a: toxi.geom.Vec2D,
                b: toxi.geom.Vec2D
            ): VerletSpring2D | null;

            getDrag(): number;
            setDrag(drag: number): void;
            getNumIterations(): number;
            setNumIterations(numIterations: number): void;
            getTimeStep(): number;
            setTimeStep(timeStep: number): void;

            getCurrentBounds(): toxi.geom.Rect;
            getWorldBounds(): toxi.geom.Rect;
            setWorldBounds(bounds: toxi.geom.Rect): VerletPhysics2D;

            getIndex(): SpatialIndex<toxi.geom.Vec2D>;
            setIndex(index: SpatialIndex<toxi.geom.Vec2D>): void;

            clear(): VerletPhysics2D;
            update(): VerletPhysics2D;
        }

        namespace behaviors {
            class GravityBehavior implements ParticleBehavior2D {
                constructor(gravity: toxi.geom.Vec2D);
                constructor(gravity: toxi.geom.Vec2D, scale: number);

                setGravity(gravity: toxi.geom.Vec2D): void;
                setStrength(strength: number): void;
                getGravity(): toxi.geom.Vec2D;
                getStrength(): number;
            }
        }
    }
}

type VerletPhysics2D = toxi.physics2d.VerletPhysics2D;
type VerletParticle2D = toxi.physics2d.VerletParticle2D;
type VerletSpring2D = toxi.physics2d.VerletSpring2D;
type GravityBehavior = toxi.physics2d.behaviors.GravityBehavior;
type Vec2D = toxi.geom.Vec2D;
type Rect = toxi.geom.Rect;

// Your custom Particle class extending VerletParticle2D
// declare class Particle extends toxi.physics2d.VerletParticle2D {
//     constructor(x: number, y: number);
//     show(): void;
//     // Add any additional methods or properties you define in your Particle class
// }

// Your custom Spring class extending VerletSpring2D
// declare class Spring extends toxi.physics2d.VerletSpring2D {
//     constructor(a: Particle, b: Particle, restLength: number, strength: number);
//     show(): void;
//     // Add any additional methods or properties you define in your Spring class
// }
