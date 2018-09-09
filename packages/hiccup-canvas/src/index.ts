import { ReadonlyVec } from "@thi.ng/vectors/api";
import { TAU } from "@thi.ng/vectors/math";

// const test =
//     ["canvas", { __diff: false, __normalize: false },
//         ["g", { transform: [1, 0, 0, 1, 100, 200] },
//             ["circle", { stroke: "blue", }, [0, 0], 100],
//             ["polyline", { stroke: "red", weight: 2 }, [[0, 0], [100, 0]]]
//         ]
//     ];

export const polyline = (ctx: CanvasRenderingContext2D, attribs: any, pts: ReadonlyVec[]) => {
    if (pts.length < 2) return;
    if (attribs.stroke) {
        if (attribs.stroke === "none") return;
        ctx.strokeStyle = attribs.stroke;
    }
    beginShape(ctx, attribs);
    let p: ReadonlyVec = pts[0];
    ctx.beginPath();
    ctx.moveTo(p[0], p[1]);
    for (let i = 1, n = pts.length; i < n; i++) {
        p = pts[i];
        ctx.lineTo(p[0], p[1]);
    }
    endShape(ctx, attribs);
};

export const polygon = (ctx: CanvasRenderingContext2D, attribs: any, pts: ReadonlyVec[]) => {
    if (pts.length < 2) return;
    let p: ReadonlyVec = pts[0];
    beginShape(ctx, attribs);
    ctx.beginPath();
    ctx.moveTo(p[0], p[1]);
    for (let i = 1, n = pts.length; i < n; i++) {
        p = pts[i];
        ctx.lineTo(p[0], p[1]);
    }
    ctx.closePath();
    endShape(ctx, attribs);
};

export const circle = (ctx: CanvasRenderingContext2D, attribs: any, pos: ReadonlyVec, r: number) => {
    beginShape(ctx, attribs);
    ctx.beginPath();
    ctx.arc(pos[0], pos[1], r, 0, TAU);
    endShape(ctx, attribs);
};

export const rect = (ctx: CanvasRenderingContext2D, attribs: any, pos: ReadonlyVec, w: number, h: number) => {
    beginShape(ctx, attribs);
    if (attribs.fill && attribs.fill !== "none") {
        ctx.fillRect(pos[0], pos[1], w, h);
    }
    if (attribs.stroke && attribs.stroke !== "none") {
        ctx.strokeRect(pos[0], pos[1], w, h);
    }
};

const beginShape = (ctx: CanvasRenderingContext2D, attribs: any) => {
    const tx = attribs.transform;
    if (tx) {
        ctx.save();
        ctx.transform(tx[0], tx[1], tx[2], tx[3], tx[4], tx[5]);
    }
};

const endShape = (ctx: CanvasRenderingContext2D, attribs: any) => {
    if (attribs.fill && attribs.fill !== "none") {
        ctx.fillStyle = attribs.fill;
        ctx.fill();
    }
    if (attribs.stroke && attribs.stroke !== "none") {
        ctx.strokeStyle = attribs.stroke;
        ctx.stroke();
    }
    if (attribs.transform) {
        ctx.restore();
    }
};
