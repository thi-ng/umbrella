import { deref } from "@thi.ng/api/deref";
import type { AttribVal, Vec2Like } from "./api.js";
import { fattribs, fpoints } from "./format.js";

export const polygon = (
	pts: AttribVal<Vec2Like[]>,
	attribs?: any,
	...body: any[]
): any[] => [
	"polygon",
	fattribs({
		...attribs,
		points: fpoints(deref(pts) ?? []),
	}),
	...body,
];
