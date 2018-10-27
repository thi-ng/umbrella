import { isNumber } from "@thi.ng/checks/is-number";
import { implementations } from "@thi.ng/defmulti";
import { sincos } from "@thi.ng/math/angle";
import { PI, TAU } from "@thi.ng/math/api";
import {
    add,
    mul,
    mulNewN,
    subNew,
    Vec,
    ones
} from "@thi.ng/vectors2/api";
import {
    arcLength,
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
} from "./api";

export function ellipse(pos: Vec, r = ones(2), attribs?: Attribs): Ellipse2 {
    return new Ellipse2(pos, r, attribs);
}

implementations(
    Type.ELLIPSE2,

    area,
    (x: Ellipse2) => PI * x.r[0] * x.r[1],

    arcLength,
    (x: Ellipse2) => {
        const a = x.r[0];
        const b = x.r[1];
        return PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (3 * b + a)));
    },

    asPolygon,
    (x: Ellipse2, opts) =>
        new Polygon2(vertices(x, opts), { ...x.attribs }),

    bounds,
    (x: Ellipse2) =>
        new Rect2(subNew(x.pos, x.r), mulNewN(x.r, 2)),

    centroid,
    (x: Ellipse2) => x.pos,

    vertices,
    (x: Ellipse2, opts = DEFAULT_SAMPLES) => {
        const buf: Vec[] = [];
        const pos = x.pos;
        const r = x.r;
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
            buf[i] = add(mul(sincos(i * delta), r), pos);
        }
        return buf;
    }
);
