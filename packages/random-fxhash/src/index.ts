import type { Fn0 } from "@thi.ng/api";
import { B58_CHARS_LC } from "@thi.ng/base-n/58";
import type { IRandom } from "@thi.ng/random";
import { DEFAULT_SEED_128 } from "@thi.ng/random/constants";
import { pickRandom, pickRandomKey } from "@thi.ng/random/pick-random";
import { SFC32 } from "@thi.ng/random/sfc32";
import { pickRandomUnique } from "@thi.ng/random/unique-indices";
import {
	weightedRandom,
	weightedRandomKey,
} from "@thi.ng/random/weighted-random";

declare var fxhash: string;
declare var $fx: { hash: string };

/**
 * Takes a `fxhash` compatible base58 transaction hash, parses it into 4
 * truncated 32bit uints and returns these partial seeds as array. This returned
 * array can then be passed to reseed the {@link RND} instance.
 *
 * @remarks
 * Note: The first characters of the given `hash` will ALWAYS be ignored (same
 * logic fxhash is using & due to Tezos hash structure).
 *
 * Also see
 * [`BASE58_LC`](https://docs.thi.ng/umbrella/base-n/variables/BASE58_LC.html).
 *
 * @example
 * ```ts
 * RND.seed(seedFromHash("ookorwLedQrCTPesBcUPrR2oRbPHgsAxe9xgCSNq4XAuZSaCvaB"));
 * ```
 *
 * @param hash
 */
export const seedFromHash = (hash: string) =>
	hash
		.slice(2)
		.match(new RegExp(`.{${(hash.length - 2) >> 2}}`, "g"))!
		.map((x) =>
			[...x].reduce(
				(acc, y) => (acc * 58 + B58_CHARS_LC.indexOf(y)) >>> 0,
				0
			)
		);

let seed: number[];
if (typeof fxhash === "string") {
	seed = seedFromHash(fxhash);
} else if (typeof $fx?.hash === "string") {
	seed = seedFromHash($fx.hash);
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
export const probability = (p: number, rnd: IRandom = RND) =>
	rnd.probability(p);

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
export const pickKey = <T extends object>(obj: T, rnd: IRandom = RND) =>
	pickRandomKey(obj, rnd);

/**
 * Repeatedly calls given zero-arg `fn` until it returns a different value than
 * `orig` (using strict equality `===`).
 *
 * @remarks
 * Also see {@link pickUnique} for selecting multiple unique items.
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
 * Same as thi.ng/random's [pickRandomUnique](), but pre-configured to use
 * {@link RND} as default PRNG. Picks up to `k` unique values from `src` array
 * (each with `maxTrials`) and adds them to given `existing` array (or creates a
 * new one by default) and returns it.
 *
 * @remarks
 * Internally uses `Array.includes()` to check for duplicates.
 *
 * @param k
 * @param src
 * @param existing
 * @param maxTrials
 * @param rnd
 */
export const pickUnique = <T>(
	k: number,
	src: T[],
	existing?: T[],
	maxTrials = 100,
	rnd: IRandom = RND
) => pickRandomUnique(k, src, existing, maxTrials, rnd);

/**
 * One-shot wrapper for
 * [`weightedRandom()`](https://docs.thi.ng/umbrella/random/functions/weightedRandom.html).
 * Takes an array of `choices` and an array of `weights`, returns random item
 * from `choices`, taking relative weights into account.
 *
 * @remarks
 * If repeated use (with the same choices/weights) is required, then using
 * [`weightedRandom()`](https://docs.thi.ng/umbrella/random/functions/weightedRandom.html)
 * directly is more efficient since the pre-calculations will be cached.
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
 * One-shot wrapper for
 * [`weightedRandomKey()`](https://docs.thi.ng/umbrella/random/functions/weightedRandomKey.html),
 * accepting an object of weights. Return keys of given `choices` object, taking
 * into account the weights given for each key.
 *
 * @remarks
 * If repeated use (with the same choices/weights) is required, then using
 * [`weightedRandomKey()`](https://docs.thi.ng/umbrella/random/functions/weightedRandomKey.html)
 * directly is more efficient since the pre-calculations will be cached.
 *
 * @param choices
 * @param rnd
 */
export const weightedKey = <T extends Record<string, number>>(
	choices: T,
	rnd: IRandom = RND
) => weightedRandomKey(choices, rnd)();
