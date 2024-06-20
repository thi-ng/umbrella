import { isNumber } from "@thi.ng/checks/is-number";
import type { Vec } from "@thi.ng/vectors";
import type { Attribs } from "./api.js";
import { Path } from "./api/path.js";
import { pathBuilder } from "./path-builder.js";

/**
 * Creates a new 2d rounded rect {@link Path}, using the given corner radius or
 * radii.
 *
 * @remarks
 * If multiple `radii` are given, the interpretation logic is the same as:
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/roundRect
 *
 * - number: all corners
 * - `[top-left-and-bottom-right, top-right-and-bottom-left]`
 * - `[top-left, top-right-and-bottom-left, bottom-right]`
 * - `[top-left, top-right, bottom-right, bottom-left]`
 *
 * No arc segments will be generated for those corners where the radius <= 0
 *
 * @param pos
 * @param size
 * @param radii
 * @param attribs
 */
export const roundedRect = (
	pos: Vec,
	[w, h]: Vec,
	radii:
		| number
		| [number, number]
		| [number, number, number]
		| [number, number, number, number],
	attribs?: Attribs
) => {
	const [tl, tr, br, bl] = isNumber(radii)
		? [radii, radii, radii, radii]
		: radii.length === 2
		? [radii[0], radii[1], radii[0], radii[1]]
		: radii.length === 3
		? [radii[0], radii[1], radii[2], radii[1]]
		: radii;
	const b = pathBuilder(attribs)
		.moveTo([pos[0] + tl, pos[1]])
		.hlineTo(w - tl - tr, true);
	if (tr > 0) b.arcTo([tr, tr], [tr, tr], 0, false, true, true);
	b.vlineTo(h - tr - br, true);
	if (br > 0) b.arcTo([-br, br], [br, br], 0, false, true, true);
	b.hlineTo(-(w - br - bl), true);
	if (bl > 0) b.arcTo([-bl, -bl], [bl, bl], 0, false, true, true);
	b.vlineTo(-(h - bl - tl), true);
	if (tl > 0) b.arcTo([tl, -tl], [tl, tl], 0, false, true, true);
	return b.current().close();
};
