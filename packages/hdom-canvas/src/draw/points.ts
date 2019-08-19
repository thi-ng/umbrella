import { IObjectOf } from "@thi.ng/api";
import { TAU } from "@thi.ng/math";
import { ReadonlyVec } from "@thi.ng/vectors";

export const points = (
    ctx: CanvasRenderingContext2D,
    attribs: IObjectOf<any>,
    opts: IObjectOf<any>,
    pts: Iterable<ReadonlyVec>
) => {
    const s = (opts && opts.size) || 1;
    let v: any;
    if ((v = attribs.fill) && v !== "none") {
        if (opts.shape === "circle") {
            for (let p of pts) {
                ctx.beginPath();
                ctx.arc(p[0], p[1], s, 0, TAU);
                ctx.fill();
            }
        } else {
            for (let p of pts) {
                ctx.fillRect(p[0], p[1], s, s);
            }
        }
    }
    if ((v = attribs.stroke) && v !== "none") {
        if (opts.shape === "circle") {
            for (let p of pts) {
                ctx.beginPath();
                ctx.arc(p[0], p[1], s, 0, TAU);
                ctx.stroke();
            }
        } else {
            for (let p of pts) {
                ctx.strokeRect(p[0], p[1], s, s);
            }
        }
    }
};
