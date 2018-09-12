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
    ["canvas", { __diff: false, __release: false, ...attribs },
        ["g", { __impl: IMPL }, ...shapes]];

export const drawTree = (canvas: HTMLCanvasElement, tree: any) => {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const walk = (shape: any, pstate: DrawState) => {
        if (!shape) return;
        if (isArray(shape[0])) {
            for (let s of shape) {
                walk(s, pstate);
            }
            return;
        }
        const state = mergeState(ctx, pstate, shape[1]);
        const attribs = state ? state.attribs : pstate.attribs;
        switch (shape[0]) {
            case "g":
                for (let i = 2, n = shape.length, __state = state || pstate; i < n; i++) {
                    walk(shape[i], __state);
                }
                break;
            case "line":
                line(ctx, attribs, shape[2], shape[3]);
                break;
            case "hline":
                line(ctx, attribs, [0, shape[2]], [canvas.width, shape[2]]);
                break;
            case "vline":
                line(ctx, attribs, [shape[2], 0], [shape[2], canvas.height]);
                break;
            case "polyline":
                polyline(ctx, attribs, shape[2]);
                break;
            case "polygon":
                polygon(ctx, attribs, shape[2]);
                break;
            case "path":
                path(ctx, attribs, shape[2]);
                break;
            case "rect":
                rect(ctx, attribs, shape[2], shape[3], shape[4]);
                break;
            case "circle":
                arc(ctx, attribs, shape[2], shape[3]);
                break;
            case "arc":
                arc(ctx, attribs, shape[2], shape[3], shape[4], shape[5]);
                break;
            case "text":
                text(ctx, attribs, shape[2], shape[3]);
                break;
            case "img":
                image(ctx, attribs, shape[2], shape[3]);
            default:
        }
        state && restoreState(ctx, pstate, state);
    };
    walk(tree, { attribs: {} });
    return null;
};

export const normalizeTree = (tree: any, ctx?: any) => {
    if (isArray(tree)) {
        const tag = tree[0];
        if (isFunction(tag)) {
            return normalizeTree(tag.apply(null, [ctx, ...tree.slice(1)]), ctx);
        }
        if (isString(tag)) {
            const attribs = tree[1];
            if (attribs && attribs.__normalize === false) {
                return tree;
            }
            const res = [tree[0], attribs]
            for (let i = 2, n = tree.length; i < n; i++) {
                const n = normalizeTree(tree[i], ctx);
                n != null && res.push(n);
            }
            return res;
        }
    } else if (isFunction(tree)) {
        return normalizeTree(tree(ctx), ctx);
    } else if (!isString(tree) && isIterable(tree)) {
        const res = [];
        for (let t of tree) {
            const n = normalizeTree(t, ctx);
            n != null && res.push(n);
        }
        return res;
    }
    return tree;
};

export const IMPL: HDOMImplementation<any> = {
    createTree: drawTree,
    normalizeTree,
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
