import { isNumber } from "@thi.ng/checks";
import { TAU } from "@thi.ng/math";
import {
    abs2,
    angleBetween2,
    mulN2,
    ReadonlyVec,
    submN2,
    Vec,
    X2
} from "@thi.ng/vectors3";
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

export const arcFrom2Points = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    radii: ReadonlyVec,
    axisTheta = 0,
    large = false,
    clockwise = false
) => {

    const r = abs2([], radii);
    const co = Math.cos(axisTheta);
    const si = Math.sin(axisTheta);
    const m = submN2([], a, b, 0.5);
    // const m = mulN2(null, sub2([], a, b), 0.5);
    const px = co * m[0] + si * m[1];
    const py = -si * m[0] + co * m[1];
    const px2 = px * px;
    const py2 = py * py;

    const l = px2 / (r[0] * r[0]) + py2 / (r[1] * r[1]);
    l > 1 && mulN2(null, r, Math.sqrt(l));

    const rx2 = r[0] * r[0];
    const ry2 = r[1] * r[1];
    const rxpy = rx2 * py2;
    const rypx = ry2 * px2;
    const rad = ((large === clockwise) ? -1 : 1) *
        Math.sqrt(Math.max(0, rx2 * ry2 - rxpy - rypx) / (rxpy + rypx));

    const tx = rad * r[0] / r[1] * py;
    const ty = -rad * r[1] / r[0] * px;
    const c = [co * tx - si * ty + (a[0] + b[0]) / 2, si * tx + co * ty + (a[1] + b[1]) / 2];
    const d1 = [(px - tx) / r[0], (py - ty) / r[1]];
    const d2 = [(-px - tx) / r[0], (-py - ty) / r[1]];

    const theta = angleBetween2(X2, d1);
    let delta = angleBetween2(d1, d2);

    if (clockwise && delta < 0) {
        delta += TAU;
    } else if (!clockwise && delta > 0) {
        delta -= TAU;
    }

    return new Arc(c, r, axisTheta, theta, theta + delta, large, clockwise);
};
