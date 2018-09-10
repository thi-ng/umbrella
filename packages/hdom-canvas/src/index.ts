import { isArrayLike } from "@thi.ng/checks/is-arraylike";
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
    const shape = (s: any[]) => {
        const attribs = s[1];
        switch (s[0]) {
            case "g":
                const restore = beginShape(ctx, attribs);
                for (let i = 2, n = s.length; i < n; i++) {
                    shape(s[i]);
                }
                endShape(ctx, attribs, restore);
                break;
            case "line":
                line(ctx, attribs, s[2], s[3]);
                break;
            case "hline":
                line(ctx, attribs, [0, s[2]], [element.width, s[2]]);
                break;
            case "vline":
                line(ctx, attribs, [s[2], 0], [s[2], element.height]);
                break;
            case "polyline":
                polyline(ctx, attribs, s[2]);
                break;
            case "polygon":
                polygon(ctx, attribs, s[2]);
                break;
            case "rect":
                rect(ctx, attribs, s[2], s[3], s[4]);
                break;
            case "circle":
                arc(ctx, attribs, s[2], s[3]);
                break;
            case "arc":
                arc(ctx, attribs, s[2], s[3], s[4], s[5]);
                break;
            case "text":
                text(ctx, attribs, s[2], s[3]);
                break;
            case "img":
                image(ctx, attribs, s[2], s[3]);
            default:
        }
    };
    shape(tree);
    return null;
};


export const line = (ctx: CanvasRenderingContext2D, attribs: any, a: ReadonlyVec, b: ReadonlyVec) => {
    const restore = beginShape(ctx, attribs);
    ctx.beginPath();
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
    endShape(ctx, attribs, restore);
};

export const polyline = (ctx: CanvasRenderingContext2D, attribs: any, pts: ReadonlyVec[]) => {
    if (pts.length < 2) return;
    let v: any;
    if ((v = attribs.stroke)) {
        if (v === "none") return;
        ctx.strokeStyle = v;
    }
    const restore = beginShape(ctx, attribs);
    let p: ReadonlyVec = pts[0];
    ctx.beginPath();
    ctx.moveTo(p[0], p[1]);
    for (let i = 1, n = pts.length; i < n; i++) {
        p = pts[i];
        ctx.lineTo(p[0], p[1]);
    }
    endShape(ctx, attribs, restore);
};

export const polygon = (ctx: CanvasRenderingContext2D, attribs: any, pts: ReadonlyVec[]) => {
    if (pts.length < 2) return;
    let p: ReadonlyVec = pts[0];
    const restore = beginShape(ctx, attribs);
    ctx.beginPath();
    ctx.moveTo(p[0], p[1]);
    for (let i = 1, n = pts.length; i < n; i++) {
        p = pts[i];
        ctx.lineTo(p[0], p[1]);
    }
    ctx.closePath();
    endShape(ctx, attribs, restore);
};

export const arc = (ctx: CanvasRenderingContext2D, attribs: any, pos: ReadonlyVec, r: number, start = 0, end = TAU, antiCCW = false) => {
    const restore = beginShape(ctx, attribs);
    ctx.beginPath();
    ctx.arc(pos[0], pos[1], r, start, end, antiCCW);
    endShape(ctx, attribs, restore);
};

export const rect = (ctx: CanvasRenderingContext2D, attribs: any, pos: ReadonlyVec, w: number, h: number) => {
    const restore = beginShape(ctx, attribs);
    let v: any;
    if ((v = attribs.fill) && v !== "none") {
        ctx.fillStyle = v;
        ctx.fillRect(pos[0], pos[1], w, h);
    }
    if ((v = attribs.stroke) && v !== "none") {
        ctx.strokeStyle = v;
        ctx.strokeRect(pos[0], pos[1], w, h);
    }
    restore && ctx.restore();
};

export const text = (ctx: CanvasRenderingContext2D, attribs: any, pos: ReadonlyVec, body: any) => {
    const restore = beginShape(ctx, attribs);
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
    restore && ctx.restore();
};

export const image = (
    ctx: CanvasRenderingContext2D,
    attribs: any,
    img: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap,
    pos: ReadonlyVec) => {
    const restore = beginShape(ctx, attribs);
    ctx.drawImage(img, pos[0], pos[1]);
    restore && ctx.restore();
};

const beginShape = (ctx: CanvasRenderingContext2D, attribs: any) => {
    let v: any;
    if ((v = attribs.transform) || attribs.translate || attribs.scale != null || attribs.rotate != null) {
        ctx.save();
        if (v) {
            ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);
        } else {
            (v = attribs.translate) && ctx.translate(v[0], v[1]);
            (v = attribs.rotate) && ctx.rotate(v);
            (v = attribs.scale) && (isArrayLike(v) ? ctx.scale(v[0], v[1]) : ctx.scale(v, v));
        }
        return true;
    }
    return false;
};

const endShape = (ctx: CanvasRenderingContext2D, attribs: any, restore: boolean) => {
    let v: any;
    if ((v = attribs.fill) && v !== "none") {
        ctx.fillStyle = v;
        ctx.fill();
    }
    if ((v = attribs.stroke) && v !== "none") {
        ctx.strokeStyle = v;
        ctx.stroke();
    }
    restore && ctx.restore();
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
