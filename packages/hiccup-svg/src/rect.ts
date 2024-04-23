import { deref } from "@thi.ng/api/deref";
import { ZERO2, type AttribVal, type Vec2Like } from "./api.js";
import { fattribs, ff } from "./format.js";

export const rect = (
	p: AttribVal<Vec2Like>,
	width: AttribVal<number>,
	height: AttribVal<number>,
	attribs?: any,
	...body: any[]
) => roundedRect(p, width, height, 0, 0, attribs, ...body);

export const roundedRect = (
	p: AttribVal<Vec2Like>,
	width: AttribVal<number>,
	height: AttribVal<number>,
	rx: AttribVal<number>,
	ry: AttribVal<number>,
	attribs?: any,
	...body: any[]
): any[] => {
	p = deref(p) ?? ZERO2;
	attribs = fattribs({
		...attribs,
		x: ff(p[0]),
		y: ff(p[1]),
		width: ff(deref(width) ?? 0),
		height: ff(deref(height) ?? 0),
	});
	rx = deref(rx) ?? 0;
	ry = deref(ry) ?? 0;
	if (rx > 0 || ry > 0) {
		attribs.rx = ff(rx);
		attribs.ry = ff(ry);
	}
	return ["rect", attribs, ...body];
};
