import type { IObjectOf } from "@thi.ng/api";
import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import type { DrawState } from "../api";
import { resolveGradientOrColor } from "../color";

const DEFAULTS: any = {
    align: "left",
    alpha: 1,
    baseline: "alphabetic",
    compose: "source-over",
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
    weight: 1,
};

const CTX_ATTRIBS: IObjectOf<string> = {
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

const newState = (state: DrawState, restore = false) => ({
    attribs: { ...state.attribs },
    grads: { ...state.grads },
    edits: [],
    restore,
});

/** @internal */
export const mergeState = (
    ctx: CanvasRenderingContext2D,
    state: DrawState,
    attribs: IObjectOf<any>
) => {
    let res: DrawState | undefined;
    if (!attribs) return;
    if (applyTransform(ctx, attribs)) {
        res = newState(state, true);
    }
    for (let id in attribs) {
        const k = CTX_ATTRIBS[id];
        if (k) {
            const v = attribs[id];
            if (v != null && state.attribs[id] !== v) {
                !res && (res = newState(state));
                res.attribs[id] = v;
                res.edits!.push(id);
                setAttrib(ctx, state, id, k, v);
            }
        }
    }
    return res;
};

/** @internal */
export const restoreState = (
    ctx: CanvasRenderingContext2D,
    prev: DrawState,
    curr: DrawState
) => {
    if (curr.restore) {
        ctx.restore();
        return;
    }
    const edits = curr.edits;
    const attribs = prev.attribs;
    for (let i = edits.length; --i >= 0; ) {
        const id = edits[i];
        const v = attribs[id];
        setAttrib(ctx, prev, id, CTX_ATTRIBS[id], v != null ? v : DEFAULTS[id]);
    }
};

/** @internal */
export const registerGradient = (
    state: DrawState,
    id: string,
    g: CanvasGradient
) => {
    !state.grads && (state.grads = {});
    state.grads[id] = g;
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
        case "shadowColor":
            (<any>ctx)[k] = resolveGradientOrColor(state, val);
            break;
        case "dash":
            (<any>ctx)[k].call(ctx, val);
            break;
        case "clip":
            break;
        default:
            (<any>ctx)[k] = val;
    }
};

const applyTransform = (
    ctx: CanvasRenderingContext2D,
    attribs: IObjectOf<any>
) => {
    let v: any;
    if (
        (v = attribs.transform) ||
        attribs.setTransform ||
        attribs.translate ||
        attribs.scale ||
        attribs.rotate
    ) {
        ctx.save();
        if (v) {
            ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);
        } else if ((v = attribs.setTransform)) {
            ctx.setTransform(v[0], v[1], v[2], v[3], v[4], v[5]);
        } else {
            (v = attribs.translate) && ctx.translate(v[0], v[1]);
            (v = attribs.rotate) && ctx.rotate(v);
            (v = attribs.scale) &&
                (isArrayLike(v) ? ctx.scale(v[0], v[1]) : ctx.scale(v, v));
        }
        return true;
    }
    return false;
};
