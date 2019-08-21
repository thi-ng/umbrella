import { IObjectOf } from "@thi.ng/api";
import { TAU } from "@thi.ng/math";
import { ReadonlyVec } from "@thi.ng/vectors";

export const points = (
    ctx: CanvasRenderingContext2D,
    attribs: IObjectOf<any>,
    opts: IObjectOf<any>,
    pts: Iterable<ReadonlyVec>
) => {
    const s: number = (opts && opts.size) || 1;
    let v: any;
    if ((v = attribs.fill) && v !== "none") {
        __drawPoints(ctx, opts, pts, s, "fill", "fillRect");
    }
    if ((v = attribs.stroke) && v !== "none") {
        __drawPoints(ctx, opts, pts, s, "stroke", "strokeRect");
    }
};

const __drawPoints = (
    ctx: CanvasRenderingContext2D,
    opts: IObjectOf<any>,
    pts: Iterable<ReadonlyVec>,
    s: number,
    cmd: "fill" | "stroke",
    cmdR: "fillRect" | "strokeRect"
) => {
    if (opts.shape === "circle") {
        for (let p of pts) {
            ctx.beginPath();
            ctx.arc(p[0], p[1], s, 0, TAU);
            ctx[cmd]();
        }
    } else {
        for (let p of pts) {
            ctx[cmdR](p[0], p[1], s, s);
        }
    }
};
