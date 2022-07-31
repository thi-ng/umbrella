import { setC } from "@thi.ng/vectors/setc";
import type { Mat } from "./api.js";

/**
 * Creates a 4x4 matrix orthographic projection matrix and writes result
 * to `out`.
 *
 * @param out -
 * @param left -
 * @param right -
 * @param bottom -
 * @param top -
 * @param near -
 * @param far -
 */
export const ortho = (
	out: Mat | null,
	left: number,
	right: number,
	bottom: number,
	top: number,
	near: number,
	far: number
): Mat => {
	const dx = 1 / (right - left);
	const dy = 1 / (top - bottom);
	const dz = 1 / (far - near);
	return setC(
		out || [],
		2 * dx,
		0,
		0,
		0,
		0,
		2 * dy,
		0,
		0,
		0,
		0,
		-2 * dz,
		0,
		-(left + right) * dx,
		-(top + bottom) * dy,
		-(far + near) * dz,
		1
	);
};
