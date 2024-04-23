import { deref } from "@thi.ng/api/deref";
import { ZERO2, type AttribVal, type Vec2Like } from "./api.js";
import { fattribs, ff } from "./format.js";

export const ellipse = (
	p: AttribVal<Vec2Like>,
	rx: AttribVal<number>,
	ry: AttribVal<number>,
	attribs?: any,
	...body: any[]
): any[] => {
	p = deref(p) ?? ZERO2;
	return [
		"ellipse",
		fattribs({
			...attribs,
			cx: ff(p[0]),
			cy: ff(p[1]),
			rx: ff(deref(rx) ?? 0),
			ry: ff(deref(ry) ?? 0),
		}),
		...body,
	];
};
