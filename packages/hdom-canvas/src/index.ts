import { IObjectOf } from "@thi.ng/api/api";
import { isArray } from "@thi.ng/checks/is-array";
import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import { isNotStringAndIterable } from "@thi.ng/checks/is-not-string-iterable";
import { DiffMode } from "@thi.ng/diff/api";
import { diffArray } from "@thi.ng/diff/array";
import { HDOMImplementation, HDOMOpts } from "@thi.ng/hdom/api";
import { equiv, releaseTree } from "@thi.ng/hdom/diff";

interface DrawState {
    attribs: IObjectOf<any>;
    grads?: IObjectOf<CanvasGradient>;
    edits?: string[];
    restore?: boolean;
}

type ReadonlyVec = ArrayLike<number> & Iterable<number>;

const TAU = Math.PI * 2;

const FN = "function";
const STR = "string";

const DEFAULTS = {
    align: "left",
    alpha: 1,
    baseline: "alphabetic",
    comp: "source-over",
    dash: [],
    dashOffset: 0,
    direction: "inherit",
    fill: "#000",
    filter: "none",
    font: "10px sans-serif",
    lineCap: "butt",
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
    baseline: "textBaseline",
    clip: "clip",
    compose: "globalCompositeOperation",
    dash: "setLineDash",
    dashOffset: "lineDashOffset",
    direction: "direction",
    fill: "fillStyle",
    filter: "filter",
    font: "font",
    lineCap: "lineCap",
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

/**
 * Special HTML5 canvas component which injects a branch-local hdom
 * implementation for virtual SVG-like shape components / elements.
 * These elements are then translated into canvas draw commands during
 * the hdom update process.
 *
 * The canvas component automatically adjusts its size for HDPI displays
 * by adding CSS `width` & `height` properties and pre-scaling the
 * drawing context accordingly before shapes are processed.
 *
 * Shape components are expressed in standard hiccup syntax, however
 * with the following restrictions:
 *
 * - Shape component objects with life cycle methods are only partially
 *   supported, i.e. only the `render` & `release` methods are used
 *   (Note, for performance reasons `release` methods are ignored by
 *   default. If your shape tree contains stateful components which use
 *   the `release` life cycle method, you'll need to explicitly enable
 *   the canvas component's `__release` attribute by setting it to
 *   `true`).
 * - Currently no event listeners can be assigned to shapes (ignored),
 *   though this is planned for a future version. The canvas element
 *   itself can of course have event handlers as usual.
 *
 * All embedded component functions receive the user context object just
 * like normal hdom components.
 *
 * For best performance, it's recommended to ensure all resulting shapes
 * elements are provided in already normalized hiccup format (i.e.
 * `[tag, {attribs}, ...]`). That way the `__normalize: false` control
 * attribute can be added either to the canvas component itself (or to
 * individual shapes / groups), and if present, will skip normalization
 * of all children.
 *
 * @param _ hdom user context (ignored)
 * @param attribs canvas attribs
 * @param shapes shape components
 */
export const canvas = {
    render: (_, attribs, ...body: any[]) => {
        const cattribs = { ...attribs };
        delete cattribs.__diff;
        delete cattribs.__normalize;
        const dpr = window.devicePixelRatio || 1;
        if (dpr !== 1) {
            !cattribs.style && (cattribs.style = {});
            cattribs.style.width = `${cattribs.width}px`;
            cattribs.style.height = `${cattribs.height}px`;
            cattribs.width *= dpr;
            cattribs.height *= dpr;
        }
        return ["canvas", cattribs,
            ["g", {
                __impl: IMPL,
                __diff: attribs.__diff !== false,
                __normalize: attribs.__normalize !== false,
                __release: attribs.__release === true,
                __serialize: false,
                __clear: attribs.__clear,
                scale: dpr !== 1 ? dpr : null,
            }, ...body]]
    }
};

export const createTree =
    (_: Partial<HDOMOpts>, canvas: HTMLCanvasElement, tree: any) => {
        // console.log(Date.now(), "draw");
        const ctx = canvas.getContext("2d");
        const attribs = tree[1];
        if (attribs) {
            if (attribs.__skip) return;
            if (attribs.__clear !== false) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
        walk(ctx, tree, { attribs: {} });
    };

export const normalizeTree =
    (opts: Partial<HDOMOpts>, tree: any) => {
        if (tree == null) {
            return tree;
        }
        if (isArray(tree)) {
            const tag = tree[0];
            if (typeof tag === FN) {
                return normalizeTree(opts, tag.apply(null, [opts.ctx, ...tree.slice(1)]));
            }
            if (typeof tag === STR) {
                const attribs = tree[1];
                if (attribs && attribs.__normalize === false) {
                    return tree;
                }
                const res = [tree[0], attribs]
                for (let i = 2, n = tree.length; i < n; i++) {
                    const n = normalizeTree(opts, tree[i]);
                    n != null && res.push(n);
                }
                return res;
            }
        } else if (typeof tree === FN) {
            return normalizeTree(opts, tree(opts.ctx));
        } else if (typeof tree.toHiccup === FN) {
            return normalizeTree(opts, tree.toHiccup(opts.ctx));
        } else if (typeof tree.deref === FN) {
            return normalizeTree(opts, tree.deref());
        } else if (isNotStringAndIterable(tree)) {
            const res = [];
            for (let t of tree) {
                const n = normalizeTree(opts, t);
                n != null && res.push(n);
            }
            return res;
        }
        return tree;
    };

export const diffTree = (
    opts: Partial<HDOMOpts>,
    parent: HTMLCanvasElement,
    prev: any[],
    curr: any[],
    child: number
) => {
    const attribs = curr[1];
    if (attribs.__skip) return;
    if (attribs.__diff === false) {
        releaseTree(prev);
        return createTree(opts, parent, curr);
    }
    // delegate to branch-local implementation
    let impl: HDOMImplementation<any> = attribs.__impl;
    if (impl && impl !== IMPL) {
        return impl.diffTree(opts, parent, prev, curr, child);
    }
    const delta = diffArray(prev, curr, DiffMode.ONLY_DISTANCE, equiv);
    if (delta.distance > 0) {
        return createTree(opts, parent, curr);
    }
}

const NOOP = () => { };

export const IMPL: HDOMImplementation<any> = {
    createTree,
    normalizeTree,
    diffTree,
    hydrateTree: NOOP,
    getElementById: NOOP,
    createElement: NOOP,
    createTextElement: NOOP,
};

const walk =
    (ctx: CanvasRenderingContext2D, shape: any[], pstate: DrawState) => {
        if (!shape) return;
        if (isArray(shape[0])) {
            for (let s of shape) {
                walk(ctx, s, pstate);
            }
            return;
        }
        const state = mergeState(ctx, pstate, shape[1]);
        const attribs = state ? state.attribs : pstate.attribs;
        if (attribs.__skip) return;
        switch (shape[0]) {
            case "g":
            case "defs":
                for (let i = 2, n = shape.length,
                    __state = shape[0] === "g" ? state || pstate : pstate;
                    i < n; i++) {
                    walk(ctx, shape[i], __state);
                }
                break;
            case "linearGradient":
                defLinearGradient(ctx, pstate, shape[1], shape[2]);
                break;
            case "radialGradient":
                defRadialGradient(ctx, pstate, shape[1], shape[2]);
                break;
            case "points":
                points(ctx, attribs, shape[1], shape[2]);
                break;
            case "line":
                line(ctx, attribs, shape[2], shape[3]);
                break;
            case "hline":
                line(ctx, attribs, [-1e6, shape[2]], [1e6, shape[2]]);
                break;
            case "vline":
                line(ctx, attribs, [shape[2], -1e6], [shape[2], 1e6]);
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
                rect(ctx, attribs, shape[2], shape[3], shape[4], shape[5]);
                break;
            case "circle":
                circularArc(ctx, attribs, shape[2], shape[3]);
                break;
            case "arc":
                circularArc(ctx, attribs, shape[2], shape[3], shape[4], shape[5]);
                break;
            case "text":
                text(ctx, attribs, shape[2], shape[3], shape[4]);
                break;
            case "img":
                image(ctx, attribs, shape[2], shape[3]);
            default:
        }
        state && restoreState(ctx, pstate, state);
    };

const mergeState = (
    ctx: CanvasRenderingContext2D,
    state: DrawState,
    attribs: IObjectOf<any>
) => {

    let res: DrawState;
    if (!attribs) return;
    if (applyTransform(ctx, attribs)) {
        res = {
            attribs: { ...state.attribs },
            grads: { ...state.grads },
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
                        grads: { ...state.grads },
                        edits: []
                    };
                }
                res.attribs[id] = v;
                res.edits.push(id);
                setAttrib(ctx, state, id, k, v);
            }
        }
    }
    return res;
};

const restoreState = (
    ctx: CanvasRenderingContext2D,
    prev: DrawState,
    curr: DrawState
) => {

    if (curr.restore) {
        ctx.restore();
        return;
    }
    const edits = curr.edits;
    if (edits) {
        for (let attribs = prev.attribs, i = edits.length - 1; i >= 0; i--) {
            const id = edits[i];
            const v = attribs[id];
            setAttrib(ctx, prev, id, CTX_ATTRIBS[id], v != null ? v : DEFAULTS[id]);
        }
    }
};

const setAttrib = (
    ctx: CanvasRenderingContext2D,
    state: DrawState,
    id: string,
    k: string,
    val: any
) => {

    switch (id) {
        case "fill":
        case "stroke":
            ctx[k] = val[0] == "$" ? state.grads[val.substr(1)] : val;
            break;
        case "dash":
            ctx[k].call(ctx, val);
            break;
        case "clip":
            break;
        default:
            ctx[k] = val;
    }
};

const applyTransform =
    (ctx: CanvasRenderingContext2D, attribs: IObjectOf<any>) => {
        let v: any;
        if ((v = attribs.transform) ||
            attribs.translate ||
            attribs.scale ||
            attribs.rotate) {

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

const endShape =
    (ctx: CanvasRenderingContext2D, attribs: IObjectOf<any>) => {
        let v: any;
        if ((v = attribs.fill) && v !== "none") {
            ctx.fill();
        }
        if ((v = attribs.stroke) && v !== "none") {
            ctx.stroke();
        }
    };

const defLinearGradient = (
    ctx: CanvasRenderingContext2D,
    state: DrawState,
    { id, from, to }: any,
    stops: any[][]
) => {

    const g = ctx.createLinearGradient(from[0], from[1], to[0], to[1]);
    for (let s of stops) {
        g.addColorStop(s[0], s[1]);
    }
    !state.grads && (state.grads = {});
    state.grads[id] = g;
};

const defRadialGradient = (
    ctx: CanvasRenderingContext2D,
    state: DrawState,
    { id, from, to, r1, r2 }: any,
    stops: any[][]
) => {

    const g = ctx.createRadialGradient(from[0], from[1], r1, to[0], to[1], r2);
    for (let s of stops) {
        g.addColorStop(s[0], s[1]);
    }
    !state.grads && (state.grads = {});
    state.grads[id] = g;
};

const line = (
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

const polyline = (
    ctx: CanvasRenderingContext2D,
    attribs: IObjectOf<any>,
    pts: ReadonlyVec[]
) => {

    if (pts.length < 2 || attribs.stroke == "none") return;
    let p: ReadonlyVec = pts[0];
    ctx.beginPath();
    ctx.moveTo(p[0], p[1]);
    for (let i = 1, n = pts.length; i < n; i++) {
        p = pts[i];
        ctx.lineTo(p[0], p[1]);
    }
    ctx.stroke();
};

const polygon = (
    ctx: CanvasRenderingContext2D,
    attribs: IObjectOf<any>,
    pts: ReadonlyVec[]
) => {

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

const path = (
    ctx: CanvasRenderingContext2D,
    attribs: IObjectOf<any>,
    segments: any[]
) => {

    ctx.beginPath();
    let a: ReadonlyVec = [0, 0];
    for (let i = 0, n = segments.length; i < n; i++) {
        const s = segments[i];
        let b = s[1], c, d;
        switch (s[0]) {
            // move to
            case "m":
                b = [a[0] + b[0], a[1] + b[1]];
            case "M":
                ctx.moveTo(b[0], b[1]);
                a = b;
                break;
            // line to
            case "l":
                b = [a[0] + b[0], a[1] + b[1]];
            case "L":
                ctx.lineTo(b[0], b[1]);
                a = b;
                break;
            // horizontal line
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
            // vertical line
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
            // cubic / bezier curve to
            case "c":
                c = s[2];
                d = s[3];
                d = [a[0] + d[0], a[1] + d[1]];
                ctx.bezierCurveTo(
                    a[0] + b[0], a[1] + b[1],
                    a[0] + c[0], a[1] + c[1],
                    d[0], d[1]
                );
                a = d;
                break;
            case "C":
                c = s[2];
                d = s[3];
                ctx.bezierCurveTo(
                    b[0], b[1],
                    c[0], c[1],
                    d[0], d[1]
                );
                a = d;
                break;
            // quadratic curve to
            case "q":
                c = s[2];
                c = [a[0] + c[0], a[1] + c[1]];
                ctx.quadraticCurveTo(
                    a[0] + b[0], a[1] + b[1],
                    c[0], c[1]
                );
                a = c;
                break;
            case "Q":
                c = s[2];
                ctx.quadraticCurveTo(
                    b[0], b[1],
                    c[0], c[1]
                );
                a = c;
                break;
            // arc to
            case "a":
                c = s[2];
                c = [a[0] + c[0], a[1] + c[1]];
                ctx.arcTo(
                    a[0] + b[0], a[1] + b[1],
                    c[0], c[1],
                    s[3]
                );
                a = c;
                break;
            case "A":
                c = s[2];
                ctx.arcTo(
                    b[0], b[1],
                    c[0], c[1],
                    s[3]
                );
                a = c;
                break;
            // close path
            case "z":
            case "Z":
                ctx.closePath();
        }
    }
    endShape(ctx, attribs);
};

const circularArc = (
    ctx: CanvasRenderingContext2D,
    attribs: IObjectOf<any>,
    pos: ReadonlyVec,
    r: number,
    start = 0,
    end = TAU,
    antiCCW = false
) => {

    ctx.beginPath();
    ctx.arc(pos[0], pos[1], r, start, end, antiCCW);
    endShape(ctx, attribs);
};

const rect = (ctx: CanvasRenderingContext2D,
    attribs: IObjectOf<any>,
    pos: ReadonlyVec,
    w: number,
    h: number,
    r = 0) => {

    let v: any;
    if (r > 0) {
        r = Math.min(Math.min(w, h) / 2, r);
        w -= 2 * r;
        h -= 2 * r;
        return path(ctx, attribs, [
            ["M", [pos[0] + r, pos[1]]],
            ["h", w], ["a", [r, 0], [r, r], r],
            ["v", h], ["a", [0, r], [-r, r], r],
            ["h", -w], ["a", [-r, 0], [-r, -r], r],
            ["v", -h], ["a", [0, -r], [r, -r], r]]
        );
    }
    if ((v = attribs.fill) && v !== "none") {
        ctx.fillRect(pos[0], pos[1], w, h);
    }
    if ((v = attribs.stroke) && v !== "none") {
        ctx.strokeRect(pos[0], pos[1], w, h);
    }
};

const points = (
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

const text = (
    ctx: CanvasRenderingContext2D,
    attribs: IObjectOf<any>,
    pos: ReadonlyVec,
    body: any,
    maxWidth?: number
) => {

    let v: any;
    if ((v = attribs.fill) && v !== "none") {
        ctx.fillText(body.toString(), pos[0], pos[1], maxWidth);
    }
    if ((v = attribs.stroke) && v !== "none") {
        ctx.strokeText(body.toString(), pos[0], pos[1], maxWidth);
    }
};

const image = (
    ctx: CanvasRenderingContext2D,
    _: IObjectOf<any>,
    pos: ReadonlyVec,
    img: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap
) => {

    ctx.drawImage(img, pos[0], pos[1]);
};
