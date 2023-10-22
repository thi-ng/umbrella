import type { IObjectOf } from "@thi.ng/api";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { __endShape } from "./internal/end-shape.js";
import { __drawPackedPoly, __drawPoly } from "./polygon.js";

export const polyline = (
	ctx: CanvasRenderingContext2D,
	attribs: IObjectOf<any>,
	pts: ReadonlyVec[]
) => {
	if (pts.length < 2 || attribs.stroke == "none") return;
	__drawPoly(ctx, pts);
	__endShape(ctx, attribs, false);
};

export const packedPolyline = (
	ctx: CanvasRenderingContext2D,
	attribs: IObjectOf<any>,
	pts: ArrayLike<number>
) => {
	if (pts.length < 2) return;
	__drawPackedPoly(ctx, attribs, pts);
	__endShape(ctx, attribs, false);
};
