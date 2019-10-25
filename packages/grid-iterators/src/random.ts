import { shuffle } from "@thi.ng/arrays";
import { IRandom, SYSTEM } from "@thi.ng/random";
import { range } from "@thi.ng/transducers";

/**
 * Yields 2D grid coordinates in random order w/ support for optional
 * `IRandom` implementation (default: `SYSTEM` aka `Math.random`).
 *
 * @see thi.ng/random
 *
 * @param cols
 * @param rows
 * @param rnd
 */
export function* random2d(cols: number, rows = cols, rnd: IRandom = SYSTEM) {
    for (let i of shuffle([...range(cols * rows)], undefined, rnd)) {
        yield [i % cols, (i / cols) | 0];
    }
}
