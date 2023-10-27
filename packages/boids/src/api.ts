import { type FnU } from "@thi.ng/api";
import type { Vec } from "@thi.ng/vectors";

export interface BoidOpts {
	constrain: FnU<Vec>;
	maxSpeed: number;
	maxForce: number;
	/**
	 * Min distance to neighboring boids
	 */
	minDist: number;
	/**
	 * Max distance to neighboring boids
	 */
	maxDist: number;
	/**
	 * Relative weight for enforcing separation
	 */
	separation: number;
	/**
	 * Relative weight for directional alignment
	 */
	alignment: number;
	/**
	 * Relative weight for group cohesion
	 */
	cohesion: number;
}
