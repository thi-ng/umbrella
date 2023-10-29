import type { CellSpan, LayoutBox } from "./api.js";

export const layoutBox = (
	x: number,
	y: number,
	w: number,
	h: number,
	cw: number,
	ch: number,
	gap: number,
	span?: CellSpan
): LayoutBox => ({
	x,
	y,
	w,
	h,
	cw,
	ch,
	gap,
	span: span || [~~(w / cw), ~~(h / ch)],
});
