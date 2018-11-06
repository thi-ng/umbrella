import { isNumber } from "@thi.ng/checks/is-number";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { implementations } from "@thi.ng/defmulti";
import { sincos } from "@thi.ng/math/angle";
import {
    EPS,
    HALF_PI,
    PI,
    TAU
} from "@thi.ng/math/api";
import { fit01 } from "@thi.ng/math/fit";
import { inRange } from "@thi.ng/math/interval";
import { roundEps } from "@thi.ng/math/prec";
import { range } from "@thi.ng/transducers/iter/range";
import { push } from "@thi.ng/transducers/rfn/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { filter } from "@thi.ng/transducers/xform/filter";
import { map } from "@thi.ng/transducers/xform/map";
import {
    abs,
    add,
    angleBetween,
    magSq,
    mulN,
    ReadonlyVec,
    subNew,
    Vec
} from "@thi.ng/vectors2/api";
import { Vec2 } from "@thi.ng/vectors2/vec2";
import {
    Arc2,
    asCubic,
    Attribs,
    bounds,
    centroid,
    Cubic2,
    DEFAULT_SAMPLES,
    pointAt,
    Rect2,
    SamplingOpts,
    Type,
    vertices
} from "./api";
import "./bezier";
import { bounds as _bounds } from "./internal/bounds";
import { Sampler } from "./internal/sampler";

export function arc(pos: Vec, r: Vec, axis: number, start: number, end: number, xl: boolean, clockwise: boolean, attribs?: Attribs): Arc2 {
    return new Arc2(pos, r, axis, start, end, xl, clockwise, attribs);
}

export function arcFrom2Points(
    a: ReadonlyVec,
    b: ReadonlyVec,
    radii: ReadonlyVec,
    axisTheta = 0,
    large = false,
    clockwise = true) {

    const r = abs([...radii]);
    const co = Math.cos(axisTheta);
    const si = Math.sin(axisTheta);
    const m = mulN(subNew(a, b), 0.5);
    const px = co * m[0] + si * m[1];
    const py = -si * m[0] + co * m[1];
    const px2 = px * px;
    const py2 = py * py;

    const l = px2 / (r[0] * r[0]) + py2 / (r[1] * r[1]);
    l > 1 && mulN(r, Math.sqrt(l));

    const rx2 = r[0] * r[0];
    const ry2 = r[1] * r[1];
    const rxpy = rx2 * py2;
    const rypx = ry2 * px2;
    const rad = ((large === clockwise) ? -1 : 1) *
        Math.sqrt(Math.max(0, rx2 * ry2 - rxpy - rypx) / (rxpy + rypx));

    const tc = [rad * r[0] / r[1] * py, rad * -r[1] / r[0] * px];
    const c = [co * tc[0] - si * tc[1] + (a[0] + b[0]) / 2, si * tc[0] + co * tc[1] + (a[1] + b[1]) / 2];
    const d1 = [(px - tc[0]) / r[0], (py - tc[1]) / r[1]];
    const d2 = [(-px - tc[0]) / r[0], (-py - tc[1]) / r[1]];

    const theta = angleBetween(Vec2.X_AXIS, d1, true);
    let delta = angleBetween(d1, d2, true);

    if (clockwise && delta < 0) {
        delta += TAU;
    } else if (!clockwise && delta > 0) {
        delta -= TAU;
    }

    return new Arc2(c, r, axisTheta, theta, theta + delta, large, clockwise);
};

implementations(
    Type.ARC2,

    asCubic,
    (arc: Arc2) => {
        const p = arc.pointAtTheta(arc.start);
        const q = arc.pointAtTheta(arc.end);
        const [rx, ry] = arc.r;
        const [sphi, cphi] = sincos(arc.axis);
        const dx = cphi * (p[0] - q[0]) / 2 + sphi * (p[1] - q[1]) / 2;
        const dy = -sphi * (p[0] - q[0]) / 2 + cphi * (p[1] - q[1]) / 2;
        if ((dx === 0 && dy === 0) || magSq(arc.r) < EPS) {
            return [Cubic2.fromLine(p, q, { ...arc.attribs })];
        }

        const mapP = (x, y) => {
            x *= rx;
            y *= ry;
            return add(
                [
                    cphi * x - sphi * y,
                    sphi * x + cphi * y
                ],
                x.pos
            );
        };

        const res: Cubic2[] = [];
        const delta = arc.end - arc.start;
        const n = Math.max(roundEps(Math.abs(delta) / HALF_PI), 1);
        // https://github.com/chromium/chromium/blob/master/third_party/blink/renderer/core/svg/svg_path_parser.cc#L253
        const d = delta / n;
        const t = 8 / 6 * Math.tan(0.25 * d);
        if (!isFinite(t)) {
            return [Cubic2.fromLine(p, q)];
        }
        for (let i = n, theta = arc.start; i > 0; i-- , theta += d) {
            const [s1, c1] = sincos(theta);
            const [s2, c2] = sincos(theta + d);
            const curve = new Cubic2(
                [
                    mapP(c1, s1),
                    mapP(c1 - s1 * t, s1 + c1 * t),
                    mapP(c2 + s2 * t, s2 - c2 * t),
                    mapP(c2, s2),
                ],
                { ...arc.attribs }
            );
            res.push(curve);
        }
        return res;
    },

    bounds,
    (arc: Arc2) => {
        const pts = transduce(
            map<number, Vec>(arc.pointAtTheta.bind(arc)),
            push(),
            [
                arc.start,
                arc.end,
                // multiples of HALF_PI in arc range
                ...filter(
                    (t: number) => inRange(t, arc.start, arc.end),
                    range(-3 * PI, 3.01 * PI, HALF_PI)
                )
            ]
        );
        return Rect2.fromMinMax(..._bounds(pts, [...Vec2.MAX], [...Vec2.MIN]));
    },

    centroid,
    (arc: Arc2) => arc.pos,

    pointAt,
    (arc: Arc2, t: number) => arc.pointAtTheta(fit01(t, arc.start, arc.end)),

    vertices,
    (arc: Arc2, opts?: number | Partial<SamplingOpts>): Vec[] => {
        if (isPlainObject(opts) && (<any>opts).dist !== undefined) {
            return new Sampler(vertices(arc, (<any>opts).num || DEFAULT_SAMPLES))
                .sampleUniform((<any>opts).dist, (<any>opts).last !== false);
        }
        opts = isNumber(opts) ?
            { num: opts, last: true } :
            { num: DEFAULT_SAMPLES, ...opts };
        const start = arc.start;
        let delta = arc.end - start;
        let num = opts.theta ?
            Math.round(delta / opts.theta) :
            opts.num;
        delta /= num;
        opts.last !== false && num++;
        const pts: Vec[] = new Array(num);
        for (let i = 0, j = 0; i < num; i++ , j += 2) {
            pts[i] = arc.pointAtTheta(start + i * delta);
        }
        return pts;
    }
);
