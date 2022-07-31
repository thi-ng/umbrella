import { asInt } from "@thi.ng/api/typedarray";
import { liangBarsky } from "./clipping.js";

export function* line(ax: number, ay: number, bx: number, by: number) {
	[ax, ay, bx, by] = asInt(ax, ay, bx, by);
	const dx = Math.abs(bx - ax);
	const dy = -Math.abs(by - ay);
	const sx = ax < bx ? 1 : -1;
	const sy = ay < by ? 1 : -1;
	let err = dx + dy;

	while (true) {
		yield [ax, ay];
		if (ax === bx && ay === by) return;
		let t = err << 1;
		if (t < dx) {
			err += dx;
			ay += sy;
		}
		if (t > dy) {
			err += dy;
			ax += sx;
		}
	}
}

/**
 * Version of {@link line} yielding only coordinates in rect defined by
 * `left,top`..`right,bottom`. Returns undefined if circle lies completely
 * outside given clip rectangle.
 *
 * @param x1 -
 * @param y1 -
 * @param x2 -
 * @param y2 -
 * @param left -
 * @param top -
 * @param right -
 * @param bottom -
 */
export const lineClipped = (
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	left: number,
	top: number,
	right: number,
	bottom: number
) => {
	const res = liangBarsky(x1, y1, x2, y2, left, top, right - 1, bottom - 1);
	return res ? line(res[0], res[1], res[2], res[3]) : undefined;
};
