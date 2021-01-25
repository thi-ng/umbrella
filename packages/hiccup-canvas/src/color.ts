import { isString } from "@thi.ng/checks";
import { resolveAsCss } from "@thi.ng/color";
import type { DrawState } from "./api";

export const resolveColor = resolveAsCss;

export const resolveGradientOrColor = (state: DrawState, v: any) =>
    isString(v)
        ? v[0] === "$"
            ? state.grads![v.substr(1)]
            : v
        : resolveAsCss(v);

export const defLinearGradient = (
    ctx: CanvasRenderingContext2D,
    { from, to }: any,
    stops: any[][]
) => {
    const g = ctx.createLinearGradient(from[0], from[1], to[0], to[1]);
    for (let s of stops) {
        g.addColorStop(s[0], resolveColor(s[1]));
    }
    return g;
};

export const defRadialGradient = (
    ctx: CanvasRenderingContext2D,
    { from, to, r1, r2 }: any,
    stops: any[][]
) => {
    const g = ctx.createRadialGradient(from[0], from[1], r1, to[0], to[1], r2);
    for (let s of stops) {
        g.addColorStop(s[0], resolveColor(s[1]));
    }
    return g;
};
