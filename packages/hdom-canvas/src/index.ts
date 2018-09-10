import { HDOMImplementation } from "@thi.ng/hdom/api";
import { ReadonlyVec } from "@thi.ng/vectors/api";
import { TAU } from "@thi.ng/vectors/math";

export const canvas = (_, attribs, ...shapes: any[]) =>
    ["canvas", attribs,
        ["g", { __normalize: false, __diff: false, __impl: IMPL },
            ...shapes]];

export const createTree = (element: HTMLCanvasElement, tree: any) => {
    const ctx = element.getContext("2d");
    ctx.clearRect(0, 0, element.width, element.height);
    const shape = (tag) => {
        const attribs = tag[1];
        switch (tag[0]) {
            case "g":
                beginShape(ctx, attribs);
                for (let i = 2, n = tag.length; i < n; i++) {
                    shape(tag[i]);
                }
                endShape(ctx, attribs);
            case "polyline":
                polyline(ctx, attribs, tag[2]);
                break;
            case "polygon":
                polygon(ctx, attribs, tag[2]);
                break;
            case "circle":
                circle(ctx, attribs, tag[2], tag[3]);
                break;
            case "rect":
                rect(ctx, attribs, tag[2], tag[3], tag[4]);
                break;
            case "text":
                text(ctx, attribs, tag[2], tag[3]);
                break;
            default:
        }
    };
    shape(tree);
    return null;
};

export const polyline = (ctx: CanvasRenderingContext2D, attribs: any, pts: ReadonlyVec[]) => {
    if (pts.length < 2) return;
    let v: any;
    if ((v = attribs.stroke)) {
        if (v === "none") return;
        ctx.strokeStyle = v;
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
    let v: any;
    if ((v = attribs.fill) && v !== "none") {
        ctx.fillStyle = v;
        ctx.fillRect(pos[0], pos[1], w, h);
    }
    if ((v = attribs.stroke) && v !== "none") {
        ctx.strokeStyle = v;
        ctx.strokeRect(pos[0], pos[1], w, h);
    }
    attribs.transform && ctx.restore();
};

export const text = (ctx: CanvasRenderingContext2D, attribs: any, pos: ReadonlyVec, body: any) => {
    beginShape(ctx, attribs);
    let v: any;
    (v = attribs.font) && (ctx.font = v);
    (v = attribs.align) && (ctx.textAlign = v);
    (v = attribs.baseLine) && (ctx.textBaseline = v);
    if (attribs.fill && attribs.fill !== "none") {
        ctx.fillStyle = attribs.fill;
        ctx.fillText(body.toString(), pos[0], pos[1]);
    }
    if (attribs.stroke && attribs.stroke !== "none") {
        ctx.strokeStyle = attribs.stroke;
        ctx.strokeText(body.toString(), pos[0], pos[1]);
    }
    attribs.transform && ctx.restore();
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

export const IMPL: HDOMImplementation<any> = {
    createTree,
    getChild: null,
    removeChild: null,
    replaceChild: null,
    setAttrib: null,
    removeAttribs: null,
    setContent: null,
};
