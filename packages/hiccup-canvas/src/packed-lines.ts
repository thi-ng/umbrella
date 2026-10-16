import type { IObjectOf } from "@thi.ng/api";

export const packedPoints = (
	ctx: CanvasRenderingContext2D,
	attribs: IObjectOf<any>,
	opts: IObjectOf<any>,
	pts: ArrayLike<number>
) => {
	if (attribs.stroke === "none") return;
	const { start, cstride, estride } = {
		start: 0,
		cstride: 1,
		estride: 2,
		...opts,
	};
	let num =
		opts && opts.num != null
			? opts.num
			: ((pts.length - start) / estride) | 0;
	ctx.beginPath();
	for (let i = start + estride; num-- > 1; i += estride) {
		ctx.lineTo(pts[i], pts[i + cstride]);
	}
	ctx.stroke();
};
