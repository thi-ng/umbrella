import { isNumber } from "@thi.ng/checks";
import { EPS, TAU } from "@thi.ng/math";
import {
    abs2,
    angleBetween2,
    div2,
    eqDelta2,
    mulN2,
    neg,
    powN2,
    ReadonlyVec,
    sub2,
    submN2,
    Vec,
    X2
} from "@thi.ng/vectors";
import { Arc } from "../api";

export const arc = (
    pos: Vec,
    r: number | Vec,
    axis: number,
    start: number,
    end: number,
    xl = false,
    clockwise = false
) => new Arc(pos, isNumber(r) ? [r, r] : r, axis, start, end, xl, clockwise);

/**
 * https://svgwg.org/svg2-draft/implnote.html#ArcConversionEndpointToCenter
 *
 * Returns undefined if `a` & `b` are equal or any `radii` component is
 * zero.
 *
 * @param a start point
 * @param b end point
 * @param radii ellipse radii
 * @param axisTheta in radians
 * @param xl large arc flag
 * @param cw clockwise flag
 */
export const arcFrom2Points = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    radii: ReadonlyVec,
    axisTheta = 0,
    xl = false,
    cw = false
) => {

    const r = abs2([], radii);
    if (eqDelta2(a, b) || r[0] < EPS || r[1] < EPS) {
        return;
    }
    axisTheta %= TAU;
    const d = submN2([], a, b, 0.5);
    const c = Math.cos(axisTheta);
    const s = Math.sin(axisTheta);
    // transformed point
    const tp = [
        c * d[0] + s * d[1],
        -s * d[0] + c * d[1]
    ];
    const [tx2, ty2] = powN2([], tp, 2);
    // ensure radii
    const rc = tx2 / (r[0] * r[0]) + ty2 / (r[1] * r[1]);
    rc > 1 && mulN2(r, r, Math.sqrt(rc));
    const [rx, ry] = r;
    const rx2 = rx * rx;
    const ry2 = ry * ry;
    // transformed center
    const radicant = Math.max(0, (rx2 * ry2 - rx2 * ty2 - ry2 * tx2) / (rx2 * ty2 + ry2 * tx2));
    const coeff = (xl !== cw ? 1 : -1) * Math.sqrt(radicant);
    const tc = [
        coeff * ((rx * tp[1]) / ry),
        coeff * (-(ry * tp[0]) / rx)
    ];
    // actual center
    const center = [
        c * tc[0] - s * tc[1] + (a[0] + b[0]) / 2,
        s * tc[0] + c * tc[1] + (a[1] + b[1]) / 2
    ];
    // transformed end points & angles
    const ta = div2(null, sub2([], tp, tc), r);
    const tb = div2(null, sub2(null, neg([], tp), tc), r);
    const start = angleBetween2(X2, ta);
    let sweep = angleBetween2(ta, tb);
    if (!cw && sweep > 0) {
        sweep -= TAU;
    } else if (cw && sweep < 0) {
        sweep += TAU;
    }
    sweep %= TAU;

    return new Arc(center, r, axisTheta, start, start + sweep, xl, cw);
};
