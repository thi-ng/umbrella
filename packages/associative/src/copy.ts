import { implementsFunction } from "@thi.ng/checks/implements-function";
import { isIllegalKey } from "@thi.ng/checks/is-proto-path";

export const copy = (x: any, ctor: Function) =>
	implementsFunction(x, "copy")
		? x.copy()
		: new (x[Symbol.species] || ctor)(x);

/**
 * Creates shallow copy of `src` object without any properties for which
 * [`isIllegalKey()`](https://docs.thi.ng/umbrella/checks/functions/isIllegalKey.html)
 * returns true.
 *
 * @param src
 */
export const copyObj = (src: any) => {
	const res: any = {};
	for (let k in src) {
		!isIllegalKey(k) && (res[k] = src[k]);
	}
	return res;
};
