import type { Predicate } from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks/is-function";
import { isString } from "@thi.ng/checks/is-string";

/** @internal */
export const __ensureRegEx = (match: string | RegExp | Predicate<string>) =>
	isString(match) ? new RegExp(`${match.replace(/\./g, "\\.")}$`) : match;

/** @internal */
export const __ensurePred = (match: string | RegExp | Predicate<string>) =>
	isFunction(match)
		? match
		: ((match = __ensureRegEx(match)),
		  (x: string) => (<RegExp>match).test(x));
