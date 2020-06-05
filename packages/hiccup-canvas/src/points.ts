import type { IObjectOf } from "@thi.ng/api";
import { TAU } from "@thi.ng/math";
import type { ReadonlyVec } from "@thi.ng/vectors";

export const points = (
    ctx: CanvasRenderingContext2D,
    attribs: IObjectOf<any>,
    opts: IObjectOf<any>,
    pts: Iterable<ReadonlyVec>
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
    pts: Iterable<ReadonlyVec>,
    cmd: "fill" | "stroke",
    cmdR: "fillRect" | "strokeRect"
) => {
    const s: number = (opts && opts.size) || 1;
    if (opts.shape === "circle") {
        for (let p of pts) {
            ctx.beginPath();
            ctx.arc(p[0], p[1], s, 0, TAU);
            ctx[cmd]();
        }
    } else {
        const r = s / 2;
        for (let p of pts) {
            ctx[cmdR](p[0] - r, p[1] - r, s, s);
        }
    }
};
