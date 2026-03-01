import type { NumOrString, Predicate } from "@thi.ng/api";

/**
 * Higher-order query predicate for {@link Query.matchColumn}. The returned
 * predicate returns true if a row value is in the semi-open interval defined by
 * `[min,max)`.
 *
 * @param min
 * @param max
 */
export const inRange =
	(min: NumOrString, max: NumOrString): Predicate<NumOrString | null> =>
	(x: NumOrString | null) =>
		x != null && x >= min && x < max;

/**
 * Higher-order query predicate for {@link Query.matchColumn}. The returned
 * predicate returns true if a row value starts with given `prefix`.
 *
 * @param prefix
 */
export const startsWith =
	(prefix: string): Predicate<string | null> =>
	(x: string | null) =>
		x?.startsWith(prefix) ?? false;

/**
 * Higher-order query predicate for {@link Query.matchColumn}. The returned
 * predicate returns true if a row value matches the given `regexp`.
 *
 * @param re
 */
export const matchRegExp =
	(re: RegExp): Predicate<string | null> =>
	(x: string | null) =>
		x != null ? re.test(x) : false;
