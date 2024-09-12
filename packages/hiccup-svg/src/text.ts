import type { Attribs, Vec2Like } from "./api.js";
import { fattribs, ff } from "./format.js";

export const text = (
	p: Vec2Like,
	body: string,
	attribs?: Attribs,
	...children: any[]
): any[] => [
	"text",
	fattribs({
		...attribs,
		x: ff(p[0]),
		y: ff(p[1]),
	}),
	body,
	...children,
];
