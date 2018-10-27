import { isNumber } from "@thi.ng/checks/is-number";
import { implementations } from "@thi.ng/defmulti";
import { PI, TAU } from "@thi.ng/math/api";
import {
    cartesian,
    dist,
    mixNewN,
    ReadonlyVec,
    subNewN,
    Vec,
    mulN
} from "@thi.ng/vectors2/api";
import { circumCenter } from "./internal/circumcenter";
import {
    arcLength,
    area,
    bounds,
    centroid,
    Circle2,
    Type,
    Attribs,
    Rect2,
    vertices,
    Polygon2,
    asPolygon,
    DEFAULT_SAMPLES,
} from "./api";

export function circle(pos: Vec, r = 1, attribs?: Attribs): Circle2 {
    return new Circle2(pos, r, attribs);
}

export const circleFrom2Points =
    (a: ReadonlyVec, b: ReadonlyVec, attribs?: Attribs) =>
        new Circle2(mixNewN(a, b, 0.5), dist(a, b) / 2, attribs);

export const circleFrom3Points =
    (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, attribs?: Attribs) => {
        const o = circumCenter(a, b, c);
        if (o) {
            return new Circle2(o, dist(a, o), attribs);
        }
    };

implementations(
    Type.CIRCLE2,

    area,
    (x: Circle2) => PI * x.r * x.r,

    arcLength,
    (x: Circle2) => TAU * x.r,

    asPolygon,
    (x: Circle2, opts) =>
        new Polygon2(vertices(x, opts), { ...x.attribs }),

    bounds,
    (x: Circle2) =>
        new Rect2(subNewN(x.pos, x.r), mulN([2, 2], x.r)),

    centroid,
    (x: Circle2) => x.pos,

    vertices,
    (x: Circle2, opts = DEFAULT_SAMPLES) => {
        const buf: Vec[] = [];
        const pos = x.pos;
        const r = x.r;
        let [num, last] = isNumber(opts) ?
            [opts, false] :
            [
                opts.theta ?
                    Math.floor(TAU / opts.theta) :
                    opts.dist ?
                        Math.floor(TAU / (opts.dist / r)) :
                        opts.num || DEFAULT_SAMPLES,
                opts.last === true
            ];
        const delta = TAU / num;
        last && num++;
        for (let i = 0; i < num; i++) {
            buf[i] = cartesian([r, i * delta], pos);
        }
        return buf;
    }
);
