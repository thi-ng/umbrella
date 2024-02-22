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

export const packedPolygon = (
	ctx: CanvasRenderingContext2D,
	attribs: IObjectOf<any>,
	opts: IObjectOf<any>,
	pts: ArrayLike<number>
) => {
	if (pts.length < 2) return;
	__drawPackedPoly(ctx, opts, pts);
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

/**
 * Shared internal helper for packed polygon & polyline fns.
 *
 * @param ctx - canvas context
 * @param opts - original shape atttribs (here only for packing config)
 * @param pts - flat vertex buffer
 *
 * @internal
 */
export const __drawPackedPoly = (
	ctx: CanvasRenderingContext2D,
	opts: IObjectOf<any>,
	pts: ArrayLike<number>
) => {
	const { start = 0, cstride = 1, estride = 2 } = opts;
	let num =
		opts && opts.num != null
			? opts.num
			: ((pts.length - start) / estride) | 0;
	ctx.beginPath();
	ctx.moveTo(pts[start], pts[start + cstride]);
	for (let i = start + estride; num-- > 1; i += estride) {
		ctx.lineTo(pts[i], pts[i + cstride]);
	}
};
