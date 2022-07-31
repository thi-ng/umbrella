import type { IObjectOf } from "@thi.ng/api";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { __endShape } from "./internal/end-shape.js";

export const polygon = (
	ctx: CanvasRenderingContext2D,
	attribs: IObjectOf<any>,
	pts: ReadonlyVec[]
) => {
	if (pts.length < 2) return;
	__drawPoly(ctx, pts);
	ctx.closePath();
	__endShape(ctx, attribs);
};

/**
 * Shared internal helper for polygon & polyline fns.
 *
 * @param ctx - canvas context
 * @param pts - poly vertices
 *
 * @internal
 */
export const __drawPoly = (
	ctx: CanvasRenderingContext2D,
	pts: ReadonlyVec[]
) => {
	let p: ReadonlyVec = pts[0];
	ctx.beginPath();
	ctx.moveTo(p[0], p[1]);
	for (let i = 1, n = pts.length; i < n; i++) {
		p = pts[i];
		ctx.lineTo(p[0], p[1]);
	}
};
