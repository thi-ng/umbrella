// SPDX-License-Identifier: Apache-2.0
import type { IObjectOf } from "@thi.ng/api";

/** @internal */
export const __endShape = (
	ctx: CanvasRenderingContext2D,
	attribs: IObjectOf<any>,
	doFill = true
) => {
	let v: any;
	if (doFill && (v = attribs.fill) && v !== "none") {
		(v = attribs.fillRule) ? ctx.fill(v) : ctx.fill();
	}
	if ((v = attribs.stroke) && v !== "none") {
		ctx.stroke();
	}
	if ((v = attribs.clip)) {
		ctx.clip(v === true ? "nonzero" : v);
	}
};
