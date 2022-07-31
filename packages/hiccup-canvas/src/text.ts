import type { IObjectOf } from "@thi.ng/api";
import type { ReadonlyVec } from "@thi.ng/vectors";

export const text = (
	ctx: CanvasRenderingContext2D,
	attribs: IObjectOf<any>,
	pos: ReadonlyVec,
	body: any,
	maxWidth?: number
) => {
	let v: any;
	if ((v = attribs.fill) && v !== "none") {
		ctx.fillText(body.toString(), pos[0], pos[1], maxWidth);
	}
	if ((v = attribs.stroke) && v !== "none") {
		ctx.strokeText(body.toString(), pos[0], pos[1], maxWidth);
	}
};
