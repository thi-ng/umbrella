import { implementsFunction } from "@thi.ng/checks/implements-function";
import { CloseMode, ISubscribable } from "./api.js";

export const isSubscribable = (x: any): x is ISubscribable<any> =>
	implementsFunction(x, "subscribe");

/**
 * Returns true if mode is FIRST, or if mode is LAST *and* `num = 0`.
 *
 * @internal
 */
export const isFirstOrLastInput = (mode: CloseMode, num: number) =>
	mode === CloseMode.FIRST || (mode === CloseMode.LAST && !num);
