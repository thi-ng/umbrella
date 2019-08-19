import { isArrayLike, isNumber, isString } from "@thi.ng/checks";
import { asCSS, ColorMode, ReadonlyColor } from "@thi.ng/color";
import { DrawState } from "../api";

const resolve = (v: any) =>
    isArrayLike(v)
        ? isNumber((<any>v).mode)
            ? asCSS(<any>v)
            : asCSS(<ReadonlyColor>v, ColorMode.RGBA)
        : isNumber(v)
        ? asCSS(v, ColorMode.INT32)
        : v;

export const resolveColor = (v: any) => (isString(v) ? v : resolve(v));

export const resolveGradientOrColor = (state: DrawState, v: any) =>
    isString(v) ? (v[0] === "$" ? state.grads![v.substr(1)] : v) : resolve(v);

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
