import type { IObjectOf } from "@thi.ng/api";
import { TAU } from "@thi.ng/math/api";

export const packedPoints = (
	ctx: CanvasRenderingContext2D,
	attribs: IObjectOf<any>,
	opts: IObjectOf<any>,
	pts: ArrayLike<number>
) => {
	let v: any;
	if ((v = attribs.fill) && v !== "none") {
		__drawPoints(ctx, opts, pts, "fill", "fillRect");
	}
	if ((v = attribs.stroke) && v !== "none") {
		__drawPoints(ctx, opts, pts, "stroke", "strokeRect");
	}
};

const __drawPoints = (
	ctx: CanvasRenderingContext2D,
	opts: IObjectOf<any>,
	pts: ArrayLike<number>,
	cmd: "fill" | "stroke",
	cmdR: "fillRect" | "strokeRect"
) => {
	const { start = 0, cstride = 1, estride = 2, size = 1 } = opts;
	let num =
		opts && opts.num != null
			? opts.num
			: ((pts.length - start) / estride) | 0;
	if (opts.shape === "circle") {
		for (let i = start; num-- > 0; i += estride) {
			ctx.beginPath();
			ctx.arc(pts[i], pts[i + cstride], size, 0, TAU);
			ctx[cmd]();
		}
	} else {
		const r = size / 2;
		for (let i = start; num-- > 0; i += estride) {
			ctx[cmdR](pts[i] - r, pts[i + cstride] - r, size, size);
		}
	}
};
