import type { ICopy } from "@thi.ng/api";

export interface INorm {
	/**
	 * Returns float in `[-scale..scale)` interval.
	 *
	 * @remarks
	 * Not to be confused with the {@link normal} distribution function. The
	 * name here refers to "normalized".
	 *
	 * Also see: https://github.com/thi-ng/umbrella/wiki/Glossary#interval
	 *
	 * @param scale - default 1
	 */
	norm(scale?: number): number;
	/**
	 * Similar to {@link INorm.norm}, but returns values in either the
	 * `[min..max)` or in the `(-max...-min]` interval (i.e. excluding values in
	 * the `(-min..min)` range). Both `min` and `max` MUST be >= 0.
	 *
	 * @remarks
	 * See: https://github.com/thi-ng/umbrella/wiki/Glossary#interval
	 *
	 * @param min
	 * @param max
	 */
	normMinMax(min: number, max: number): number;
}

export interface IRandom extends INorm {
	/**
	 * Returns unsigned 32bit int in [0..0xffffffff] interval.
	 *
	 * @remarks
	 * See: https://github.com/thi-ng/umbrella/wiki/Glossary#interval
	 */
	int(): number;
	/**
	 * Returns float in [0..max) interval.
	 *
	 * @remarks
	 * See: https://github.com/thi-ng/umbrella/wiki/Glossary#interval
	 *
	 * @param max - default 1
	 */
	float(max?: number): number;
	/**
	 *  Calls {@link IRandom.float} and returns true iff result is < `p`
	 *  (assumed to be in [0..1] interval).
	 *
	 * @param p
	 */
	probability(p: number): boolean;
	/**
	 * Returns float in [min..max) interval.
	 *
	 * @remarks
	 * See: https://github.com/thi-ng/umbrella/wiki/Glossary#interval
	 *
	 * @param min -
	 * @param max -
	 */
	minmax(min: number, max: number): number;
	/**
	 * Returns int in **signed** integer [min..max) interval.
	 *
	 * @remarks
	 * See: https://github.com/thi-ng/umbrella/wiki/Glossary#interval
	 *
	 * @param min -
	 * @param max -
	 */
	minmaxInt(min: number, max: number): number;
	/**
	 * Returns int in **unsigned** integer [min..max) interval.
	 *
	 * @remarks
	 * See: https://github.com/thi-ng/umbrella/wiki/Glossary#interval
	 *
	 * @param min -
	 * @param max -
	 */
	minmaxUint(min: number, max: number): number;
}

export interface ISeedable<T> {
	/**
	 * (Re)seeds this PRNG instance with given value(s).
	 *
	 * @param n
	 */
	seed(n: T): this;
}

export type ISeedableRandom<T> = IRandom & ISeedable<T> & ICopy<IRandom>;
