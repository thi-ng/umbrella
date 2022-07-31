import type { IObjectOf } from "@thi.ng/api";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { path } from "./path.js";

export const rect = (
	ctx: CanvasRenderingContext2D,
	attribs: IObjectOf<any>,
	pos: ReadonlyVec,
	w: number,
	h: number,
	r = 0
) => {
	let v: any;
	if (r > 0) {
		r = Math.min(Math.min(w, h) / 2, r);
		w -= 2 * r;
		h -= 2 * r;
		return path(ctx, attribs, [
			["M", [pos[0] + r, pos[1]]],
			["h", w],
			["a", [r, 0], [r, r], r],
			["v", h],
			["a", [0, r], [-r, r], r],
			["h", -w],
			["a", [-r, 0], [-r, -r], r],
			["v", -h],
			["a", [0, -r], [r, -r], r],
		]);
	}
	if ((v = attribs.fill) && v !== "none") {
		ctx.fillRect(pos[0], pos[1], w, h);
	}
	if ((v = attribs.stroke) && v !== "none") {
		ctx.strokeRect(pos[0], pos[1], w, h);
	}
};
