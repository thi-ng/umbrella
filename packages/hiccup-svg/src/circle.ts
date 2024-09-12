import type { Attribs, Vec2Like } from "./api.js";
import { fattribs, ff } from "./format.js";

export const circle = (
	p: Vec2Like,
	r: number,
	attribs?: Attribs,
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
