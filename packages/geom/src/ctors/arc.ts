import { isNumber } from "@thi.ng/checks";
import { fromEndPoints } from "@thi.ng/geom-arc";
import { Vec, ReadonlyVec } from "@thi.ng/vectors";
import { Arc, Attribs } from "../api";

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
    axis = 0,
    xl = false,
    cw = false,
    attribs?: Attribs
) => {
    const res = fromEndPoints(a, b, radii, axis, xl, cw);
    return new Arc(
        res.center,
        res.r,
        res.axis,
        res.start,
        res.end,
        res.xl,
        res.cw,
        attribs
    );
};
