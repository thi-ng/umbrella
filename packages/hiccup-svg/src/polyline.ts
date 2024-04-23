import { deref } from "@thi.ng/api/deref";
import type { AttribVal, Vec2Like } from "./api.js";
import { fattribs, fpoints } from "./format.js";

export const polyline = (
	pts: AttribVal<Vec2Like[]>,
	attribs?: any,
	...body: any[]
): any[] => [
	"polyline",
	fattribs({
		fill: "none",
		points: fpoints(deref(pts) ?? []),
		...attribs,
	}),
	...body,
];
