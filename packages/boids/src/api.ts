import type { Fn, Fn2, IDeref } from "@thi.ng/api";
import type { INeighborhood } from "@thi.ng/distance";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import type { Boid } from "./boid.js";

export type GlobalConstraint = Fn2<Vec, Boid, Vec>;

export interface BoidOpts {
	/**
	 * Boid behaviors
	 */
	behaviors: IBoidBehavior[];
	/**
	 * Behavior update function. Default: {@link blendedBehaviorUpdate}
	 */
	update?: Fn<Boid, Vec>;
	/**
	 * Spatial acceleration structure to use for {@link Boid.neighbors} lookups.
	 */
	accel: IBoidAccel;
	/**
	 * Position constraint. If used, the function MUST mutate the given vector
	 * (1st arg) and also return it.
	 */
	constrain?: GlobalConstraint;
	/**
	 * Max speed (per second)
	 */
	maxSpeed: number;
	/**
	 * Scale factor for applying any of the separation, alignment and cohesion
	 * forces.
	 *
	 * @defaultValue 1
	 */
	maxForce?: number;
}

export interface IBoidAccel {
	build(boids: Boid[]): void;
	queryNeighborhood<
		N extends INeighborhood<ReadonlyVec, Boid> & IDeref<Boid[]>
	>(
		neighborhood: N
	): N;
}

export interface IBoidBehavior {
	weight(boid: Boid): number;
	update(boid: Boid): ReadonlyVec;
}

export type ScalarOrField = number | Fn<Boid, number>;
