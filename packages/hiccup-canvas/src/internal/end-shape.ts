import type { IObjectOf } from "@thi.ng/api";

/** @internal */
export const __endShape = (
	ctx: CanvasRenderingContext2D,
	attribs: IObjectOf<any>
) => {
	let v: any;
	if ((v = attribs.fill) && v !== "none") {
		ctx.fill();
	}
	if ((v = attribs.stroke) && v !== "none") {
		ctx.stroke();
	}
	if ((v = attribs.clip)) {
		ctx.clip(v === true ? "nonzero" : v);
	}
};
