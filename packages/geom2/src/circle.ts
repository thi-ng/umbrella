import { isNumber } from "@thi.ng/checks/is-number";
import { implementations } from "@thi.ng/defmulti";
import { sign } from "@thi.ng/math/abs";
import { cossin } from "@thi.ng/math/angle";
import {
    EPS,
    HALF_PI,
    PI,
    TAU
} from "@thi.ng/math/api";
import { add2 } from "@thi.ng/vectors3/add";
import { ReadonlyVec, Vec } from "@thi.ng/vectors3/api";
import { cartesian2 } from "@thi.ng/vectors3/cartesian";
import { copy } from "@thi.ng/vectors3/copy";
import { dist } from "@thi.ng/vectors3/dist";
import { distSq2 } from "@thi.ng/vectors3/distsq";
import { mixN2 } from "@thi.ng/vectors3/mixn";
import { mulN2 } from "@thi.ng/vectors3/muln";
import { normalize } from "@thi.ng/vectors3/normalize";
import { sub2 } from "@thi.ng/vectors3/sub";
import { subN2 } from "@thi.ng/vectors3/subn";
import {
    arcLength,
    area,
    Attribs,
    bounds,
    center,
    centroid,
    Circle2,
    classifyPoint,
    closestPoint,
    DEFAULT_SAMPLES,
    perimeter,
    pointAt,
    pointInside,
    Rect2,
    SamplingOpts,
    tangentAt,
    translate,
    Type,
    vertices
} from "./api";
import { circumCenter } from "./internal/circumcenter";
import "./polygon";

export function circle(pos: Vec, r = 1, attribs?: Attribs): Circle2 {
    return new Circle2(pos, r, attribs);
}

export const circleFrom2Points =
    (a: ReadonlyVec, b: ReadonlyVec, attribs?: Attribs) =>
        new Circle2(mixN2([], a, b, 0.5), dist(a, b) / 2, attribs);

export const circleFrom3Points =
    (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, attribs?: Attribs) => {
        const o = circumCenter(a, b, c);
        if (o) {
            return new Circle2(o, dist(a, o), attribs);
        }
    };

implementations(
    Type.CIRCLE2,

    null,

    arcLength,
    (circle: Circle2) =>
        TAU * circle.r,

    area,
    (circle: Circle2) =>
        PI * circle.r * circle.r,

    bounds,
    (circle: Circle2) =>
        new Rect2(
            subN2([], circle.pos, circle.r),
            mulN2(null, [2, 2], circle.r)
        ),

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
        add2(null, normalize(null, sub2([], p, circle.pos), circle.r), circle.pos),

    perimeter,
    (circle: Circle2) => TAU * circle.r,

    pointAt,
    (circle: Circle2, t: number) =>
        cartesian2(null, [circle.r, TAU * t], circle.pos),

    pointInside,
    (circle: Circle2, p: ReadonlyVec) =>
        distSq2(circle.pos, p) <= circle.r * circle.r,

    tangentAt,
    (_: Circle2, t: number) =>
        cossin(TAU * t + HALF_PI),

    translate,
    (circle: Circle2, delta: ReadonlyVec) =>
        new Circle2(
            add2([], circle.pos, delta),
            circle.r,
            { ...circle.attribs }
        ),

    vertices,
    (circle: Circle2, opts: number | Partial<SamplingOpts> = DEFAULT_SAMPLES) => {
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
            buf[i] = cartesian2(null, [r, i * delta], pos);
        }
        return buf;
    }
);
