import { ARandom } from "./arandom.js";

const random = Math.random;

/**
 * A `Math.random()` based {@link IRandom} implementation. Also @see
 * {@link SYSTEM}.
 */
export class SystemRandom extends ARandom {
	int() {
		return (random() * 0x1_0000_0000) /* 2**32 */ >>> 0;
	}

	float(norm = 1) {
		return random() * norm;
	}

	norm(norm = 1) {
		return (random() - 0.5) * 2 * norm;
	}
}

/**
 * Used as default PRNG throughout most other thi.ng projects, though usually is
 * configurable.
 */
export const SYSTEM = new SystemRandom();
