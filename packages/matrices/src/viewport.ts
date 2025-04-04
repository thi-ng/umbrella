// SPDX-License-Identifier: Apache-2.0
import type { Mat } from "./api.js";
import { mulM23 } from "./mulm.js";
import { scale23 } from "./scale.js";
import { translation23 } from "./translation.js";

/**
 * Produces a 2x3 viewport matrix to transform projected coordinates to
 * screen space.
 *
 * @param out -
 * @param left -
 * @param right -
 * @param bottom -
 * @param top -
 */
export const viewport = (
	out: Mat | null,
	left: number,
	right: number,
	bottom: number,
	top: number
): Mat => {
	const x = (left + right) / 2;
	const y = (bottom + top) / 2;
	const w = (right - left) / 2;
	const h = (top - bottom) / 2;
	return mulM23(null, translation23(out, [x, y]), scale23([], [w, h]));
};
