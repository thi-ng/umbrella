import type { ITimeStep, ReadonlyTimeStep } from "@thi.ng/timestep";
import { integrateAll, interpolateAll } from "@thi.ng/timestep/timestep";
import type { IBoidAccel } from "./api.js";
import type { Boid } from "./boid.js";

/**
 * Returns a new {@link Flock} instance.
 *
 * @param accel
 * @param boids
 */
export const defFlock = (accel: IBoidAccel, boids?: Boid[]) =>
	new Flock(accel, boids);

/**
 * Convenience class for managing a number of boids (can be added
 * dynamically) and their {@link IBoidAccel} structure. Like {@link Boid}
 * itself, this class implements the `ITimeStep` interface too and the
 * {@link ITimeStep.integrate} phase will automatically update the
 * acceleration structure before integrating the boids.
 */
export class Flock implements ITimeStep {
	constructor(public accel: IBoidAccel, public boids: Boid[] = []) {}

	add(boid: Boid) {
		this.boids.push(boid);
	}

	remove(boid: Boid) {
		const idx = this.boids.indexOf(boid);
		if (idx >= 0) this.boids.splice(idx, 1);
	}

	integrate(dt: number, ctx: ReadonlyTimeStep): void {
		this.accel.build(this.boids);
		integrateAll(dt, ctx, ...this.boids);
	}

	interpolate(alpha: number, ctx: ReadonlyTimeStep): void {
		interpolateAll(alpha, ctx, ...this.boids);
	}
}
