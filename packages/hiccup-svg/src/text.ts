import { deref } from "@thi.ng/api/deref";
import { ZERO2, type AttribVal, type Vec2Like } from "./api.js";
import { fattribs, ff } from "./format.js";

export const text = (
	p: AttribVal<Vec2Like>,
	body: AttribVal<string>,
	attribs?: any,
	...xs: any[]
): any[] => {
	p = deref(p) ?? ZERO2;
	return [
		"text",
		fattribs({
			...attribs,
			x: ff(p[0]),
			y: ff(p[1]),
		}),
		deref(body),
		...xs,
	];
};
