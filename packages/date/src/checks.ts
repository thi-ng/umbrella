import { implementsFunction } from "@thi.ng/checks/implements-function";
import { isNumber } from "@thi.ng/checks/is-number";
import { isString } from "@thi.ng/checks/is-string";
import type { MaybeDate } from "./api.js";

/**
 * Coerces `x` to a native JS `Date` instance.
 *
 * @param x -
 */
export const ensureDate = (x: MaybeDate): Date =>
	isString(x) || isNumber(x)
		? new Date(x)
		: implementsFunction(x, "toDate")
		? x.toDate()
		: x;

/**
 * Coerces `x` to a timestamp.
 *
 * @param x -
 */
export const ensureEpoch = (x: MaybeDate) =>
	(implementsFunction(x, "getTime") ? x : ensureDate(x)).getTime();

export const isLeapYear = (year: number) =>
	!(year % 4) && (!!(year % 100) || !(year % 400));
