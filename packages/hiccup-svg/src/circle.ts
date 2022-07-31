import { fattribs, ff } from "./format.js";
import type { Vec2Like } from "./api.js";

export const circle = (
	p: Vec2Like,
	r: number,
	attribs?: any,
	...body: any[]
): any[] => [
	"circle",
	fattribs({
		...attribs,
		cx: ff(p[0]),
		cy: ff(p[1]),
		r: ff(r),
	}),
	...body,
];
