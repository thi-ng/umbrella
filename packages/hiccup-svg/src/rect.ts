import { fattribs, ff } from "./format.js";
import type { Vec2Like } from "./api.js";

export const rect = (
	p: Vec2Like,
	width: number,
	height: number,
	attribs?: any,
	...body: any[]
) => roundedRect(p, width, height, 0, 0, attribs, ...body);

export const roundedRect = (
	p: Vec2Like,
	width: number,
	height: number,
	rx: number,
	ry: number,
	attribs?: any,
	...body: any[]
): any[] => {
	attribs = fattribs({
		...attribs,
		x: ff(p[0]),
		y: ff(p[1]),
		width: ff(width),
		height: ff(height),
	});
	if (rx > 0 || ry > 0) {
		attribs.rx = ff(rx);
		attribs.ry = ff(ry);
	}
	return ["rect", attribs, ...body];
};
