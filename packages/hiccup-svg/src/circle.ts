import { deref } from "@thi.ng/api/deref";
import { ZERO2, type AttribVal, type Vec2Like } from "./api.js";
import { fattribs, ff } from "./format.js";

export const circle = (
	p: AttribVal<Vec2Like>,
	r: AttribVal<number>,
	attribs?: any,
	...body: any[]
): any[] => {
	p = deref(p) ?? ZERO2;
	return [
		"circle",
		fattribs(
			{
				...attribs,
				cx: ff(p[0]),
				cy: ff(p[1]),
				r: ff(deref(r) ?? 0),
			},
			"r"
		),
		...body,
	];
};
