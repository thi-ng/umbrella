import type { IObjectOf } from "@thi.ng/api";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { __endShape } from "./internal/end-shape.js";

export const rect = (
	ctx: CanvasRenderingContext2D,
	attribs: IObjectOf<any>,
	pos: ReadonlyVec,
	w: number,
	h: number,
	radii?:
		| number
		| [number, number]
		| [number, number, number]
		| [number, number, number, number]
) => {
	let v: any;
	if (radii !== undefined) {
		ctx.beginPath();
		ctx.roundRect(pos[0], pos[1], w, h, radii);
		__endShape(ctx, attribs);
		return;
	}
	if ((v = attribs.fill) && v !== "none") {
		ctx.fillRect(pos[0], pos[1], w, h);
	}
	if ((v = attribs.stroke) && v !== "none") {
		ctx.strokeRect(pos[0], pos[1], w, h);
	}
};
