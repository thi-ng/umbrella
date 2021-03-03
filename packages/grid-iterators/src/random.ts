import { shuffle } from "@thi.ng/arrays";
import { IRandom, SYSTEM } from "@thi.ng/random";
import { range } from "@thi.ng/transducers";
import { asInt } from "./utils";

/**
 * Yields 2D grid coordinates in random order w/ support for optional
 * {@link @thi.ng/random#IRandom} implementation (default:
 * {@link @thi.ng/random#SYSTEM} aka `Math.random`).
 *
 * @param cols -
 * @param rows -
 * @param rnd - PRNG
 */
export function* random2d(cols: number, rows = cols, rnd: IRandom = SYSTEM) {
    [cols, rows] = asInt(cols, rows);
    for (let i of shuffle([...range(cols * rows)], undefined, rnd)) {
        yield [i % cols, (i / cols) | 0];
    }
}
