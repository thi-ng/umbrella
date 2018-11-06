import { isNumber } from "@thi.ng/checks/is-number";
import { implementations } from "@thi.ng/defmulti";
import { cossin } from "@thi.ng/math/angle";
import { PI, TAU } from "@thi.ng/math/api";
import {
    addNew,
    copy,
    maddNew,
    mulNewN,
    ones,
    ReadonlyVec,
    subNew,
    Vec
} from "@thi.ng/vectors2/api";
import "./polygon";
import {
    perimeter,
    area,
    bounds,
    centroid,
    Ellipse2,
    Type,
    Attribs,
    Rect2,
    vertices,
    Polygon2,
    asPolygon,
    DEFAULT_SAMPLES,
    pointAt,
    center,
    translate,
    SamplingOpts,
} from "./api";

export function ellipse(pos: Vec, r = ones(2), attribs?: Attribs): Ellipse2 {
    return new Ellipse2(pos, r, attribs);
}

implementations(
    Type.ELLIPSE2,

    area,
    (ellipse: Ellipse2) => PI * ellipse.r[0] * ellipse.r[1],

    asPolygon,
    (ellipse: Ellipse2, opts) =>
        new Polygon2(vertices(ellipse, opts), { ...ellipse.attribs }),

    bounds,
    (ellipse: Ellipse2) =>
        new Rect2(subNew(ellipse.pos, ellipse.r), mulNewN(ellipse.r, 2)),

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
        maddNew(ellipse.pos, cossin(t * TAU), ellipse.r),

    translate,
    (ellipse: Ellipse2, delta: ReadonlyVec) =>
        new Ellipse2(
            addNew(ellipse.pos, delta),
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
            buf[i] = maddNew(pos, cossin(i * delta), r);
        }
        return buf;
    }
);
