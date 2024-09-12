import type { Attribs, Vec2Like } from "./api.js";
import { fattribs, fpoints } from "./format.js";

export const polyline = (
	pts: Vec2Like[],
	attribs?: Attribs,
	...body: any[]
): any[] => [
	"polyline",
	fattribs({
		fill: "none",
		points: fpoints(pts),
		...attribs,
	}),
	...body,
];
