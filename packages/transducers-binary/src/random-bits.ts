import type { IRandom } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import { repeatedly } from "@thi.ng/transducers/repeatedly";

/**
 * Returns an iterator of random bits, with 1's occurring w/ given
 * probability `prob` (in the [0,1] interval). If `num` is given, only
 * that many bits will be produced.
 *
 * By default, uses system PRNG, but a custom
 * {@link @thi.ng/random#IRandom} impl can be provided via `rnd` arg.
 *
 * @param prob -
 * @param num -
 * @param rnd -
 */
export const randomBits = (
    prob: number,
    num?: number,
    rnd: IRandom = SYSTEM
): IterableIterator<number> =>
    repeatedly(() => (rnd.float() < prob ? 1 : 0), num);
