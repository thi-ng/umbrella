import { deref } from "@thi.ng/api/deref";
import { ZERO2, type AttribVal, type Vec2Like } from "./api.js";
import { fattribs, ff } from "./format.js";

export const image = (
	pos: AttribVal<Vec2Like>,
	url: AttribVal<string>,
	attribs?: any,
	...body: any[]
): any[] => {
	pos = deref(pos) ?? ZERO2;
	return [
		"image",
		fattribs({
			...attribs,
			// TODO replace w/ SVG2 `href` once Safari supports it
			"xlink:href": url,
			x: ff(pos[0]),
			y: ff(pos[1]),
		}),
		...body,
	];
};
