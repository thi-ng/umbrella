import { IObjectOf } from "@thi.ng/api/api";
import { isArray } from "@thi.ng/checks/is-array";
import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import { isFunction } from "@thi.ng/checks/is-function";
import { isIterable } from "@thi.ng/checks/is-iterable";
import { isString } from "@thi.ng/checks/is-string";
import { HDOMImplementation } from "@thi.ng/hdom/api";
import { ReadonlyVec } from "@thi.ng/vectors/api";
import { TAU } from "@thi.ng/vectors/math";

interface DrawState {
    attribs: IObjectOf<any>;
    edits?: string[];
    restore?: boolean;
}

const DEFAULTS = {
    align: "left",
    alpha: 1,
    baseLine: "alphabetic",
    cap: "butt",
    comp: "source-over",
    dash: [],
    dashOffset: 0,
    direction: "inherit",
    fill: "#000",
    filter: "none",
    font: "10px sans-serif",
    lineJoin: "miter",
    miterLimit: 10,
    shadowBlur: 0,
    shadowColor: "rgba(0,0,0,0)",
    shadowX: 0,
    shadowY: 0,
    smooth: true,
    stroke: "#000",
};

const CTX_ATTRIBS = {
    align: "textAlign",
    alpha: "globalAlpha",
    baseLine: "textBaseline",
    cap: "lineCap",
    clip: "clip",
    comp: "globalCompositeOperation",
    dash: "setLineDash",
    dashOffset: "lineDashOffset",
    direction: "direction",
    fill: "fillStyle",
    filter: "filter",
    font: "font",
    lineJoin: "lineJoin",
    miterLimit: "miterLimit",
    shadowBlur: "shadowBlur",
    shadowColor: "shadowColor",
    shadowX: "shadowOffsetX",
    shadowY: "shadowOffsetY",
    smooth: "imageSmoothingEnabled",
    stroke: "strokeStyle",
    weight: "lineWidth",
};

export const canvas = (_, attribs, ...shapes: any[]) =>
    ["canvas", attribs,
        ["g", { __normalize: false, __diff: false, __impl: IMPL },
            ...shapes]];

export const drawTree = (element: HTMLCanvasElement, tree: any) => {
    const ctx = element.getContext("2d");
    ctx.clearRect(0, 0, element.width, element.height);
    const shape = (s: any, pstate: DrawState) => {
        if (!s) return;
        if (isArray(s)) {
            if (isFunction(s[0])) {
                // FIXME where to get hdom ctx from?
                return shape(s[0](null, ...s.slice(1)), pstate);
            }
            const state = mergeState(ctx, pstate, s[1]);
            const attribs = state ? state.attribs : pstate.attribs;
            switch (s[0]) {
                case "g":
                    for (let i = 2, n = s.length, __state = state || pstate; i < n; i++) {
                        shape(s[i], __state);
                    }
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
                case "path":
                    path(ctx, attribs, s[2]);
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
            state && restoreState(ctx, pstate, state);
            return;
        } else if (isFunction(s)) {
            return shape(s(element, ctx), pstate);
        } else if (!isString(s) && isIterable(s)) {
            for (let ss of s) {
                shape(ss, pstate);
            }
            return;
        }
    };
    shape(tree, { attribs: {} });
    return null;
};

export const IMPL: HDOMImplementation<any> = {
    createTree: drawTree,
};

const mergeState = (ctx: CanvasRenderingContext2D,
    state: DrawState,
    attribs: IObjectOf<any>) => {

    let res: DrawState;
    if (!attribs) return;
    if (applyTransform(ctx, attribs)) {
        res = {
            attribs: { ...state.attribs },
            edits: [],
            restore: true
        };
    }
    for (let id in attribs) {
        const k = CTX_ATTRIBS[id];
        if (k) {
            const v = attribs[id];
            if (v != null && state.attribs[id] !== v) {
                if (!res) {
                    res = {
                        attribs: { ...state.attribs },
                        edits: []
                    };
                }
                res.attribs[id] = v;
                res.edits.push(id);
                setAttrib(ctx, id, k, v);
            }
        }
    }
    return res;
};

const restoreState = (ctx: CanvasRenderingContext2D,
    prev: DrawState,
    curr: DrawState) => {

    if (curr.restore) {
        ctx.restore();
        return;
    }
    const edits = curr.edits;
    if (edits) {
        for (let attribs = prev.attribs, i = edits.length - 1; i >= 0; i--) {
            const id = edits[i];
            const v = attribs[id];
            setAttrib(ctx, id, CTX_ATTRIBS[id], v != null ? v : DEFAULTS[id]);
        }
    }
};

const setAttrib = (ctx: CanvasRenderingContext2D,
    id: string,
    k: string,
    val: any) => {

    switch (id) {
        case "dash":
            ctx[k].call(ctx, val);
            break;
        case "clip":
            break;
        default:
            ctx[k] = val;
    }
};

const applyTransform = (ctx: CanvasRenderingContext2D, attribs: IObjectOf<any>) => {
    let v: any;
    if ((v = attribs.transform) ||
        attribs.translate ||
        attribs.scale != null ||
        attribs.rotate != null) {

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

const endShape = (ctx: CanvasRenderingContext2D, attribs: IObjectOf<any>) => {
    let v: any;
    if ((v = attribs.fill) && v !== "none") {
        ctx.fill();
    }
    if ((v = attribs.stroke) && v !== "none") {
        ctx.stroke();
    }
};

const line = (ctx: CanvasRenderingContext2D,
    attribs: IObjectOf<any>,
    a: ReadonlyVec,
    b: ReadonlyVec) => {

    if (attribs.stroke === "none") {
        return;
    }
    ctx.beginPath();
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
    ctx.stroke();
};

const polyline = (ctx: CanvasRenderingContext2D,
    attribs: IObjectOf<any>,
    pts: ReadonlyVec[]) => {

    if (pts.length < 2) return;
    let v: any;
    if ((v = attribs.stroke)) {
        if (v === "none") return;
        // ctx.strokeStyle = v;
    }
    let p: ReadonlyVec = pts[0];
    ctx.beginPath();
    ctx.moveTo(p[0], p[1]);
    for (let i = 1, n = pts.length; i < n; i++) {
        p = pts[i];
        ctx.lineTo(p[0], p[1]);
    }
    ctx.stroke();
};

const polygon = (ctx: CanvasRenderingContext2D,
    attribs: IObjectOf<any>,
    pts: ReadonlyVec[]) => {

    if (pts.length < 2) return;
    let p: ReadonlyVec = pts[0];
    ctx.beginPath();
    ctx.moveTo(p[0], p[1]);
    for (let i = 1, n = pts.length; i < n; i++) {
        p = pts[i];
        ctx.lineTo(p[0], p[1]);
    }
    ctx.closePath();
    endShape(ctx, attribs);
};

const path = (ctx: CanvasRenderingContext2D,
    attribs: IObjectOf<any>,
    segments: any[]) => {
    ctx.beginPath();
    let a: ReadonlyVec = [0, 0];
    for (let s of segments) {
        let b = s[1], c, d;
        switch (s[0]) {
            case "m":
                b = [a[0] + b[0], a[1] + b[1]];
            case "M":
                ctx.moveTo(b[0], b[1]);
                a = b;
                break;
            case "l":
                b = [a[0] + b[0], a[1] + b[1]];
            case "L":
                ctx.lineTo(b[0], b[1]);
                a = b;
                break;
            case "h":
                b = [a[0] + b, a[1]];
                ctx.lineTo(b[0], b[1]);
                a = b;
                break;
            case "H":
                b = [b, a[1]];
                ctx.lineTo(b[0], b[1]);
                a = b;
                break;
            case "v":
                b = [a[0], a[1] + b];
                ctx.lineTo(b[0], b[1]);
                a = b;
                break;
            case "V":
                b = [a[0], b];
                ctx.lineTo(b[0], b[1]);
                a = b;
                break;
            case "c":
                c = s[2];
                d = s[3];
                d = [a[0] + d[0], a[1] + d[1]];
                ctx.bezierCurveTo(a[0] + b[0], a[1] + b[1], a[0] + c[0], a[1] + c[1], d[0], d[1]);
                a = d;
                break;
            case "C":
                c = s[2];
                d = s[3];
                ctx.bezierCurveTo(b[0], b[1], c[0], c[1], d[0], d[1]);
                a = d;
                break;
            case "q":
                c = s[2];
                c = [a[0] + c[0], a[1] + c[1]];
                ctx.quadraticCurveTo(a[0] + b[0], a[1] + b[1], c[0], c[1]);
                a = c;
                break;
            case "Q":
                c = s[2];
                ctx.quadraticCurveTo(b[0], b[1], c[0], c[1]);
                a = c;
                break;
            case "z":
            case "Z":
                ctx.closePath();
        }
    }
    endShape(ctx, attribs);
};

const arc = (ctx: CanvasRenderingContext2D,
    attribs: IObjectOf<any>,
    pos: ReadonlyVec,
    r: number,
    start = 0,
    end = TAU,
    antiCCW = false) => {

    ctx.beginPath();
    ctx.arc(pos[0], pos[1], r, start, end, antiCCW);
    endShape(ctx, attribs);
};

const rect = (ctx: CanvasRenderingContext2D,
    attribs: IObjectOf<any>,
    pos: ReadonlyVec,
    w: number,
    h: number) => {

    let v: any;
    if ((v = attribs.fill) && v !== "none") {
        ctx.fillRect(pos[0], pos[1], w, h);
    }
    if ((v = attribs.stroke) && v !== "none") {
        ctx.strokeRect(pos[0], pos[1], w, h);
    }
};

const text = (ctx: CanvasRenderingContext2D,
    attribs: IObjectOf<any>,
    pos: ReadonlyVec,
    body: any) => {

    let v: any;
    if ((v = attribs.fill) && v !== "none") {
        ctx.fillText(body.toString(), pos[0], pos[1]);
    }
    if ((v = attribs.stroke) && v !== "none") {
        ctx.strokeText(body.toString(), pos[0], pos[1]);
    }
};

const image = (
    ctx: CanvasRenderingContext2D,
    _: IObjectOf<any>,
    img: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap,
    pos: ReadonlyVec) => {

    ctx.drawImage(img, pos[0], pos[1]);
};
