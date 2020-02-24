import type { IObjectOf } from "@thi.ng/api";
import type { ReadonlyVec } from "@thi.ng/vectors";

export const line = (
    ctx: CanvasRenderingContext2D,
    attribs: IObjectOf<any>,
    a: ReadonlyVec,
    b: ReadonlyVec
) => {
    if (attribs.stroke === "none") return;
    ctx.beginPath();
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
    ctx.stroke();
};
