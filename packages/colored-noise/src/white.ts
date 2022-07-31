import type { INorm } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";

/**
 * Unfiltered noise w/ uniform distribution. Merely yields samples from
 * given PRNG.
 *
 * @param scale -
 * @param rnd -
 */
export function* white(scale = 1, rnd: INorm = SYSTEM) {
	while (true) {
		yield rnd.norm(scale);
	}
}
