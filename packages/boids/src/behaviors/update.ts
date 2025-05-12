// SPDX-License-Identifier: Apache-2.0
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
	const {
		api: { maddN, setN },
		behaviors,
		force,
	} = boid;
	setN(force, 0);
	for (let i = 0, n = behaviors.length; i < n; i++) {
		const behavior = behaviors[i];
		const weight = behavior.weight(boid);
		if (weight !== 0) maddN(force, behavior.update(boid), weight, force);
	}
	return force;
};
