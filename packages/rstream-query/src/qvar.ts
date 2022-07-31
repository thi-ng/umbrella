import { isString } from "@thi.ng/checks/is-string";
import type { Triple } from "./api.js";

const AUTO_QVAR_PREFIX = "?__q";
let AUTO_QVAR_ID = 0;

export const isQVar = (x: any) => isString(x) && x.charAt(0) === "?";

export const isAutoQVar = (x: any) =>
	isString(x) && x.indexOf(AUTO_QVAR_PREFIX) == 0;

export const autoQVar = () => AUTO_QVAR_PREFIX + (AUTO_QVAR_ID++).toString(36);

export const qvarName = (x: string) => x.substring(1);

/**
 * Returns an optimized query variable solution extractor function based
 * on given pattern type. `vs`, `vp`, `vo` are flags to indicate if `s`,
 * `p` and/or `o` pattern items are query variables. The returned fn
 * will be optimized to 1 of the 8 possible case and accepts a single
 * fact to extract the respective variables from.
 *
 * @param vs -
 * @param vp -
 * @param vo -
 * @param s -
 * @param p -
 * @param o -
 */
export const qvarResolver = (
	vs: boolean,
	vp: boolean,
	vo: boolean,
	s: string,
	p: string,
	o: string
) => {
	const type = ((<any>vs) << 2) | ((<any>vp) << 1) | (<any>vo);
	let ss: any = vs && qvarName(s);
	let pp: any = vp && qvarName(p);
	let oo: any = vo && qvarName(o);
	switch (type) {
		case 0:
		default:
			return;
		case 1:
			return (f: Triple) => ({ [oo]: f[2] });
		case 2:
			return (f: Triple) => ({ [pp]: f[1] });
		case 3:
			return (f: Triple) => ({ [pp]: f[1], [oo]: f[2] });
		case 4:
			return (f: Triple) => ({ [ss]: f[0] });
		case 5:
			return (f: Triple) => ({ [ss]: f[0], [oo]: f[2] });
		case 6:
			return (f: Triple) => ({ [ss]: f[0], [pp]: f[1] });
		case 7:
			return (f: Triple) => ({ [ss]: f[0], [pp]: f[1], [oo]: f[2] });
	}
};
