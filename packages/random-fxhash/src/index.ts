import type { Fn0 } from "@thi.ng/api";
import { B58_CHARS_LC } from "@thi.ng/base-n/58";
import type { IRandom } from "@thi.ng/random";
import { DEFAULT_SEED_128 } from "@thi.ng/random/constants";
import { pickRandom, pickRandomKey } from "@thi.ng/random/pick-random";
import { SFC32 } from "@thi.ng/random/sfc32";
import {
    weightedRandom,
    weightedRandomKey,
} from "@thi.ng/random/weighted-random";

declare var fxhash: string;

let seed: number[];
if (typeof fxhash === "string") {
    seed = fxhash
        .slice(2)
        .match(new RegExp(`.{${(fxhash.length - 2) >> 2}}`, "g"))!
        .map((x) =>
            [...x].reduce(
                (acc, y) => (acc * 58 + B58_CHARS_LC.indexOf(y)) | 0,
                0
            )
        );
} else {
    seed = DEFAULT_SEED_128;
    console.warn("fxhash PRNG not found, using default seed", seed, "\n\n");
}

/**
 * Singleton replacement for global `fxrand` PRNG function and pre-seeded with
 * same global `fxhash` (both injected by fxhash's script in HTML header)
 *
 * @remarks
 * Should the need arise, the instance can be reseeded via `.seed([...])`.
 */
export const RND = new SFC32(seed);

/**
 * Returns true if the next random float from {@link RND} is less than given `p`.
 *
 * @param p
 * @param rnd - default {@link RND}
 */
export const probability = (p: number, rnd: IRandom = RND) => rnd.float() < p;

/**
 * Wrapper for {@link  @thi.ng/random#pickRandom}. Returns a random item from
 * given `choices`.
 *
 * @param choices
 * @param rnd - default {@link RND}
 */
export const pick = <T>(choices: T[], rnd: IRandom = RND) =>
    pickRandom(choices, rnd);

/**
 * Wrapper for {@link  @thi.ng/random#pickKey}. Returns a random key from given
 * `object`.
 *
 * @param obj
 * @param rnd - default {@link RND}
 */
export const pickKey = <T>(obj: T, rnd: IRandom = RND) =>
    pickRandomKey(obj, rnd);

/**
 * Repeatedly calls given zero-arg `fn` until it returns a different value than
 * `orig` (using strict equality `===`).
 *
 * @param fn
 * @param orig
 */
export const pickAlt = <T>(fn: Fn0<T>, orig: T) => {
    let res: T;
    do {
        res = fn();
    } while (res === orig);
    return res;
};

/**
 * One-shot wrapper for {@link @thi.ng/random#weightedRandom}. Takes an array of
 * `choices` and an array of `weights`, returns random item from `choices`,
 * taking relative weights into account.
 *
 * @remarks
 * If repeated use (with the same choices/weights) is required, then using
 * {@link @thi.ng/random#weightedRandom} directly is more efficient since the
 * pre-calculations will be cached.
 *
 * @param choices
 * @param weights
 * @param rnd - default {@link RND}
 */
export const weighted = <T>(
    choices: T[],
    weights: number[],
    rnd: IRandom = RND
) => weightedRandom(choices, weights, rnd)();

/**
 * One-shot wrapper for {@link @thi.ng/random#weightedRandomKey}, accepting an
 * object of weights. Return keys of given `choices` object, taking into account
 * the weights given for each key.
 *
 * @remarks
 * If repeated use (with the same choices/weights) is required, then using
 * {@link @thi.ng/random#weightedRandomKey} directly is more efficient since the
 * pre-calculations will be cached.
 *
 * @param choices
 * @param rnd
 */
export const weightedKey = <T extends Record<string, number>>(
    choices: T,
    rnd: IRandom = RND
) => weightedRandomKey(choices, rnd)();
