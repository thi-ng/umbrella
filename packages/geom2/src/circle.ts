import { isNumber } from "@thi.ng/checks/is-number";
import { implementations } from "@thi.ng/defmulti";
import { PI, TAU } from "@thi.ng/math/api";
import { subNewN, Vec, cartesian } from "@thi.ng/vectors2/api";
import { vec2n, vec2 } from "@thi.ng/vectors2/vec2";
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

export function circle2(pos: Vec, r = 1, attribs?: Attribs): Circle2 {
    return new Circle2(pos, r, attribs);
}

implementations(
    Type.CIRCLE2,

    area,
    (x: Circle2) => PI * x.r * x.r,

    arcLength,
    (x: Circle2) => TAU * x.r,

    asPolygon,
    (x: Circle2, opts) => new Polygon2(vertices(x, opts), { ...x.attribs }),

    bounds,
    (x: Circle2) => new Rect2(subNewN(x.pos, x.r), vec2n(x.r * 2)),

    centroid,
    (x: Circle2) => x.pos,

    vertices,
    (x: Circle2, opts) => {
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
            buf[i] = cartesian(vec2(r, i * delta), pos);
        }
        return buf;
    }
);
