import { isNumber } from "@thi.ng/checks/is-number";
import { implementations } from "@thi.ng/defmulti";
import { sign } from "@thi.ng/math/abs";
import { EPS, PI, TAU } from "@thi.ng/math/api";
import {
    add,
    addNew,
    cartesian,
    copy,
    dist,
    distSq,
    mixNewN,
    mulN,
    normalize,
    ReadonlyVec,
    subNew,
    subNewN,
    Vec
} from "@thi.ng/vectors2/api";
import { circumCenter } from "./internal/circumcenter";
import "./polygon";
import {
    perimeter,
    area,
    bounds,
    centroid,
    Circle2,
    Type,
    Attribs,
    Rect2,
    vertices,
    DEFAULT_SAMPLES,
    pointAt,
    pointInside,
    classifyPoint,
    closestPoint,
    translate,
    center,
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
    (circle: Circle2) => PI * circle.r * circle.r,

    bounds,
    (circle: Circle2) =>
        new Rect2(subNewN(circle.pos, circle.r), mulN([2, 2], circle.r)),

    centroid,
    (circle: Circle2) => copy(circle.pos),

    center,
    (circle: Circle2, origin?: ReadonlyVec) =>
        new Circle2(
            origin ? origin : [0, 0],
            circle.r,
            { ...circle.attribs }
        ),

    classifyPoint,
    (circle: Circle2, p: ReadonlyVec, eps = EPS) =>
        sign(circle.r - dist(circle.pos, p), eps),

    closestPoint,
    (circle: Circle2, p: ReadonlyVec) =>
        add(normalize(subNew(p, circle.pos), circle.r), circle.pos),

    perimeter,
    (circle: Circle2) => TAU * circle.r,

    pointAt,
    (circle: Circle2, t: number) =>
        cartesian([circle.r, TAU * t], circle.pos),

    pointInside,
    (circle: Circle2, p: ReadonlyVec) =>
        distSq(circle.pos, p) <= circle.r * circle.r,

    translate,
    (circle: Circle2, delta: ReadonlyVec) =>
        new Circle2(
            addNew(circle.pos, delta),
            circle.r,
            { ...circle.attribs }
        ),

    vertices,
    (circle: Circle2, opts = DEFAULT_SAMPLES) => {
        const buf: Vec[] = [];
        const pos = circle.pos;
        const r = circle.r;
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
