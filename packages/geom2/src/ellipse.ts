import { isNumber } from "@thi.ng/checks/is-number";
import { implementations } from "@thi.ng/defmulti";
import { cossin } from "@thi.ng/math/angle";
import { PI, TAU } from "@thi.ng/math/api";
import { add2 } from "@thi.ng/vectors3/add";
import { ReadonlyVec, Vec } from "@thi.ng/vectors3/api";
import { copy } from "@thi.ng/vectors3/copy";
import { madd2 } from "@thi.ng/vectors3/madd";
import { mulN2 } from "@thi.ng/vectors3/muln";
import { sub2 } from "@thi.ng/vectors3/sub";
import {
    arcLength,
    area,
    asPolygon,
    Attribs,
    bounds,
    center,
    centroid,
    DEFAULT_SAMPLES,
    Ellipse2,
    perimeter,
    pointAt,
    Polygon2,
    Rect2,
    SamplingOpts,
    translate,
    Type,
    vertices
} from "./api";
import "./polygon";

export function ellipse(pos: Vec, r = [1, 1], attribs?: Attribs): Ellipse2 {
    return new Ellipse2(pos, r, attribs);
}

implementations(
    Type.ELLIPSE,

    null,

    arcLength,
    (ellipse: Ellipse2) => {
        const [a, b] = ellipse.r;
        // Ramanujan approximation
        // https://www.mathsisfun.com/geometry/ellipse-perimeter.html
        return PI * ((3 * (a + b)) - Math.sqrt((3 * a + b) * (3 * b + a)));
    },

    area,
    (ellipse: Ellipse2) =>
        PI * ellipse.r[0] * ellipse.r[1],

    asPolygon,
    (ellipse: Ellipse2, opts) =>
        new Polygon2(vertices(ellipse, opts), { ...ellipse.attribs }),

    bounds,
    (ellipse: Ellipse2) =>
        new Rect2(sub2([], ellipse.pos, ellipse.r), mulN2([], ellipse.r, 2)),

    centroid,
    (ellipse: Ellipse2) => copy(ellipse.pos),

    center,
    (ellipse: Ellipse2, origin?: ReadonlyVec) =>
        new Ellipse2(
            origin ? origin : [0, 0],
            copy(ellipse.r),
            { ...ellipse.attribs }
        ),

    perimeter,
    (ellipse: Ellipse2) => {
        const a = ellipse.r[0];
        const b = ellipse.r[1];
        return PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (3 * b + a)));
    },

    pointAt,
    (ellipse: Ellipse2, t: number) =>
        madd2([], ellipse.pos, cossin(t * TAU), ellipse.r),

    translate,
    (ellipse: Ellipse2, delta: ReadonlyVec) =>
        new Ellipse2(
            add2([], ellipse.pos, delta),
            ellipse.r,
            { ...ellipse.attribs }
        ),

    vertices,
    (ellipse: Ellipse2, opts: number | Partial<SamplingOpts> = DEFAULT_SAMPLES) => {
        const buf: Vec[] = [];
        const pos = ellipse.pos;
        const r = ellipse.r;
        let [num, last] = isNumber(opts) ?
            [opts, false] :
            [
                opts.theta ?
                    Math.floor(TAU / opts.theta) :
                    opts.num || DEFAULT_SAMPLES,
                opts.last === true
            ];
        const delta = TAU / num;
        last && num++;
        for (let i = 0; i < num; i++) {
            buf[i] = madd2([], pos, cossin(i * delta), r);
        }
        return buf;
    }
);
