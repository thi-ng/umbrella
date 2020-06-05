import { implementsFunction, isArray } from "@thi.ng/checks";
import type { DrawState } from "./api";
import { circularArc, ellipticArc } from "./arc";
import { defLinearGradient, defRadialGradient } from "./color";
import { image } from "./image";
import { line } from "./line";
import { packedPoints } from "./packed-points";
import { path } from "./path";
import { points } from "./points";
import { polygon } from "./polygon";
import { polyline } from "./polyline";
import { rect } from "./rect";
import { mergeState, registerGradient, restoreState } from "./state";
import { text } from "./text";

export const draw = (
    ctx: CanvasRenderingContext2D,
    shape: any,
    pstate: DrawState = { attribs: {}, edits: [] }
) => {
    if (!shape) return;
    if (implementsFunction(shape, "toHiccup")) {
        draw(ctx, shape.toHiccup(), pstate);
        return;
    }
    if (isArray(shape[0])) {
        for (let s of shape) {
            draw(ctx, s, pstate);
        }
        return;
    }
    const state = mergeState(ctx, pstate, shape[1]);
    const attribs = state ? state.attribs : pstate.attribs;
    if (attribs.__skip) return;
    switch (shape[0]) {
        case "g":
        case "defs":
            defs(ctx, state, pstate, shape);
            break;
        case "linearGradient":
            registerGradient(
                pstate,
                shape[1].id,
                defLinearGradient(ctx, shape[1], shape[2])
            );
            break;
        case "radialGradient":
            registerGradient(
                pstate,
                shape[1].id,
                defRadialGradient(ctx, shape[1], shape[2])
            );
            break;
        case "points":
            points(ctx, attribs, shape[1], shape[2]);
            break;
        case "packedPoints":
            packedPoints(ctx, attribs, shape[1], shape[2]);
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
        case "ellipse":
            ellipticArc(
                ctx,
                attribs,
                shape[2],
                shape[3],
                shape[4],
                shape[5],
                shape[6]
            );
            break;
        case "arc":
            circularArc(ctx, attribs, shape[2], shape[3], shape[4], shape[5]);
            break;
        case "text":
            text(ctx, attribs, shape[2], shape[3], shape[4]);
            break;
        case "img":
            image(
                ctx,
                attribs,
                shape[1],
                shape[2],
                shape[3],
                shape[4],
                shape[5]
            );
        default:
    }
    state && restoreState(ctx, pstate, state);
};

const defs = (
    ctx: CanvasRenderingContext2D,
    state: DrawState | undefined,
    pstate: DrawState,
    shape: any[]
) => {
    const n = shape.length;
    const __state = shape[0] === "g" ? state || pstate : pstate;
    for (let i = 2; i < n; i++) {
        draw(ctx, shape[i], __state);
    }
};
