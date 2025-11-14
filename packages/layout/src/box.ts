// SPDX-License-Identifier: Apache-2.0
import type { CellSpan, LayoutBox } from "./api.js";

/**
 * Creates a {@link LayoutBox} object with given details.
 *
 * @param x
 * @param y
 * @param w
 * @param h
 * @param cw
 * @param ch
 * @param gapX
 * @param gapY
 * @param span
 */
export const layoutBox = (
	x: number,
	y: number,
	w: number,
	h: number,
	cw: number,
	ch: number,
	gapX: number,
	gapY = gapX,
	span?: CellSpan
): LayoutBox => ({
	x,
	y,
	w,
	h,
	cw,
	ch,
	gapX,
	gapY,
	span: span || [~~(w / cw), ~~(h / ch)],
});
