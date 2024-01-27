import type { Vec } from "@thi.ng/vectors";
import type { Boid } from "../boid.js";

/**
 * Behavior update function (the default implementation fro
 * {@link BoidOpts.update}). Takes a single {@link Boid} and evaluates all of
 * its assigned behaviors (in the order given). If a behavior's weight evaluates
 * to zero, the behavior will be skipped, otherwise the returned force vector
 * will be added (multiplied with the behavior's current weight). Returns summed
 * force vector of all behaviors.
 *
 * @param boid
 */
export const blendedBehaviorUpdate = (boid: Boid) => {
	const { maddN, zeroes } = boid.api;
	const force: Vec = zeroes();
	for (let behavior of boid.behaviors) {
		const weight = behavior.weight(boid);
		if (weight !== 0) maddN(force, behavior.update(boid), weight, force);
	}
	return force;
};
