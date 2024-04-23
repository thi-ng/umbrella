import { deref } from "@thi.ng/api/deref";
import { ZERO2, type AttribVal, type Vec2Like } from "./api.js";
import { fattribs, ff } from "./format.js";

export const line = (
	a: AttribVal<Vec2Like>,
	b: AttribVal<Vec2Like>,
	attribs?: any,
	...body: any[]
): any[] => {
	a = deref(a) ?? ZERO2;
	b = deref(b) ?? ZERO2;
	return [
		"line",
		fattribs({
			...attribs,
			x1: ff(a[0]),
			y1: ff(a[1]),
			x2: ff(b[0]),
			y2: ff(b[1]),
		}),
		...body,
	];
};

export const hline = (y: number, attribs?: any, length = 1e6) =>
	line([-length, y], [length, y], attribs);

export const vline = (x: number, attribs?: any, length = 1e6) =>
	line([x, -length], [x, length], attribs);
