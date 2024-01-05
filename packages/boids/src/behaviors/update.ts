import type { Vec } from "@thi.ng/vectors";
import type { Boid } from "../boid.js";

export const blendedBehaviorUpdate = (boid: Boid) => {
	const { maddN, zeroes } = boid.api;
	const force: Vec = zeroes();
	for (let behavior of boid.behaviors) {
		const weight = behavior.weight(boid);
		if (weight !== 0) maddN(force, behavior.update(boid), weight, force);
	}
	return force;
};
