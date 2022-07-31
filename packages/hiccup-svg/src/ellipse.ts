import { fattribs, ff } from "./format.js";
import type { Vec2Like } from "./api.js";

export const ellipse = (
	p: Vec2Like,
	rx: number,
	ry: number,
	attribs?: any,
	...body: any[]
): any[] => [
	"ellipse",
	fattribs({
		...attribs,
		cx: ff(p[0]),
		cy: ff(p[1]),
		rx: ff(rx),
		ry: ff(ry),
	}),
	...body,
];
