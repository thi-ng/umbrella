/**
 * Higher order function. Takes an object of threshold values and their target
 * values, as well as a default value. Returns a new function which then matches
 * a given value against all given thresholds and returns a matching target
 * value, of (if none matched), the given default.
 *
 * @remarks
 * The thresholds will be sorted & matched in ascending order using `<=`
 * comparison.
 *
 * @example
 * ```ts tangle:../export/select-threshold.ts
 * import { selectThresholdMin } from "@thi.ng/arrays";
 *
 * const numColumns = selectThresholdMin({ 480: 1, 640: 2, 960: 3 }, 4);
 *
 * console.log(numColumns(320));
 * // 1
 *
 * console.log(numColumns(481));
 * // 2
 *
 * console.log(numColumns(768));
 * // 3
 *
 * console.log(numColumns(1024));
 * // 4
 * ```
 *
 * @param thresholds
 * @param defaultVal
 */
export const selectThresholdMin = <T>(
	thresholds: Record<number, T>,
	defaultVal: T
) => {
	const $thresholds = Object.entries(thresholds)
		.map(([k, v]) => <[number, T]>[+k, v])
		.sort((a, b) => a[0] - b[0]);
	return (x: number) => {
		const res = $thresholds.find((t) => x <= t[0]);
		return res ? res[1] : defaultVal;
	};
};

/**
 * Similar to {@link selectThresholdMin}, but uses `>=` ordering.
 *
 * @param thresholds
 * @param defaultVal
 */
export const selectThresholdMax = <T>(
	thresholds: Record<number, T>,
	defaultVal: T
) => {
	const $thresholds = Object.entries(thresholds)
		.map(([k, v]) => <[number, T]>[+k, v])
		.sort((a, b) => b[0] - a[0]);
	return (x: number) => {
		const res = $thresholds.find((t) => x >= t[0]);
		return res ? res[1] : defaultVal;
	};
};
