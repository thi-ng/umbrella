export type Timestamp = number | bigint;

/**
 * If available, returns wrapper for `process.hrtime.bigint()` else falls back
 * to `performance.now()` or lacking that to `Date.now()`. In all cases, returns
 * a nanosec-scale timestamp, either as `bigint` or `number`.
 */
export const now: () => Timestamp =
	typeof BigInt !== "undefined"
		? typeof process !== "undefined" &&
		  typeof process.hrtime !== "undefined" &&
		  typeof process.hrtime.bigint === "function"
			? () => process.hrtime.bigint()
			: typeof performance !== "undefined"
			? () => BigInt(Math.floor(performance.now() * 1e6))
			: () => BigInt(Date.now() * 1e6)
		: typeof performance !== "undefined"
		? () => performance.now() * 1e6
		: () => Date.now() * 1e6;

/**
 * Returns the difference in milliseconds between 2 given {@link Timestamp}s
 * obtained via {@link now}. `b` defaults to result of {@link now}.
 *
 * @param a
 * @param b
 */
export const timeDiff = (a: Timestamp, b = now()) =>
	(typeof BigInt !== "undefined"
		? Number(<bigint>b - <bigint>a)
		: <number>b - <number>a) * 1e-6;

/**
 * Takes a duration (either a number or bigint) in nanosec-scale (see
 * {@link now}) and converts it to a JS number in milliseconds.
 *
 * @param t
 */
export const asMillis = (t: number | bigint) =>
	(typeof t === "bigint" ? Number(t) : t) * 1e-6;
