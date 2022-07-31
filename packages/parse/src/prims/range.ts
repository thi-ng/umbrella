import type { NumOrString, Predicate } from "@thi.ng/api";
import type { LitParser } from "../api.js";
import { satisfy, satisfyD } from "./satisfy.js";

/**
 * HOF predicate for matching single char within given range.
 *
 * @param min -
 * @param max -
 */
export const rangeP =
	<T extends NumOrString>(min: T, max: T): Predicate<T> =>
	(x) =>
		x >= min && x <= max;

/**
 * HOF predicate for matching single char within given UTF16 codepoint
 * range.
 *
 * @param min -
 * @param max -
 */
export const utf16RangeP =
	(min: number, max: number): Predicate<string> =>
	(x) => {
		const c = x.charCodeAt(0)!;
		return c >= min && c <= max;
	};

export function range(min: string, max: string, id?: string): LitParser<string>;
export function range(min: number, max: number, id?: string): LitParser<number>;
export function range(min: NumOrString, max: NumOrString, id = "lit") {
	return satisfy(rangeP(min, max), id);
}

export function rangeD(min: string, max: string): LitParser<string>;
export function rangeD(min: number, max: number): LitParser<number>;
export function rangeD(min: NumOrString, max: NumOrString) {
	return satisfyD(rangeP(min, max));
}

/**
 * Matches single char in given UTF-16 codepoint range.
 *
 * @param min -
 * @param max -
 * @param id -
 */
export const utf16Range = (min: number, max: number, id = "utfLit") =>
	satisfy(utf16RangeP(min, max), id);

/**
 * Matches single char in given UTF-16 codepoint range.
 *
 * @param min -
 * @param max -
 * @param id -
 */
export const utf16RangeD = (min: number, max: number) =>
	satisfyD(utf16RangeP(min, max));
