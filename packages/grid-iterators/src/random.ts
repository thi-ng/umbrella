import { shuffle } from "@thi.ng/arrays/shuffle";
import type { IRandom } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import { range } from "@thi.ng/transducers/range";
import type { GridIterOpts2D } from "./api.js";
import { __opts } from "./utils.js";

interface RandomOpts2D extends GridIterOpts2D {
	/**
	 * PRNG instance to use
	 *
	 * @defaultValue `SYSTEM`
	 */
	rnd?: IRandom;
}

/**
 * Yields 2D grid coordinates in random order w/ support for optional
 * [`IRandom`](https://docs.thi.ng/umbrella/random/interfaces/IRandom.html)
 * implementation (default:
 * [`SYSTEM`](https://docs.thi.ng/umbrella/random/variables/SYSTEM.html) aka
 * `Math.random`).
 *
 * @param opts -
 */
export function* random2d(opts: RandomOpts2D) {
	const { cols, rows, tx } = __opts(opts);
	const rnd = opts.rnd || SYSTEM;
	for (let i of shuffle([...range(cols * rows)], undefined, rnd)) {
		yield tx(i % cols, (i / cols) | 0);
	}
}
