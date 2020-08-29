import { INorm, SYSTEM } from "@thi.ng/random";

/**
 * Unfiltered noise w/ uniform distribution. Merely yields samples from
 * given PRNG.
 *
 * @param scale
 * @param rnd
 */
export function* white(scale = 1, rnd: INorm = SYSTEM) {
    while (true) {
        yield rnd.norm(scale);
    }
}
