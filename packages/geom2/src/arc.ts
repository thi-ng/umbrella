import { isNumber } from "@thi.ng/checks/is-number";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { implementations } from "@thi.ng/defmulti";
import { sincos } from "@thi.ng/math/angle";
import { EPS, HALF_PI, PI, TAU } from "@thi.ng/math/api";
import { fit01 } from "@thi.ng/math/fit";
import { inRange } from "@thi.ng/math/interval";
import { roundEps } from "@thi.ng/math/prec";
import { range } from "@thi.ng/transducers/iter/range";
import { push } from "@thi.ng/transducers/rfn/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { filter } from "@thi.ng/transducers/xform/filter";
import { map } from "@thi.ng/transducers/xform/map";
import { add, magSq, Vec, ReadonlyVec, abs, mulN, subNew, angleBetween } from "@thi.ng/vectors2/api";
import { Vec2 } from "@thi.ng/vectors2/vec2";
import {
    Arc2,
    asCubic,
    bounds,
    centroid,
    Cubic2,
    DEFAULT_SAMPLES,
    pointAt,
    Rect2,
    SamplingOpts,
    Type,
    vertices,
    Attribs
} from "./api";
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
    (x: Arc2) => {
        const p = x.pointAtTheta(x.start);
        const q = x.pointAtTheta(x.end);
        const [rx, ry] = x.r;
        const [sphi, cphi] = sincos(x.axis);
        const dx = cphi * (p[0] - q[0]) / 2 + sphi * (p[1] - q[1]) / 2;
        const dy = -sphi * (p[0] - q[0]) / 2 + cphi * (p[1] - q[1]) / 2;
        if ((dx === 0 && dy === 0) || magSq(x.r) < EPS) {
            return [Cubic2.fromLine(p, q, { ...x.attribs })];
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
        const delta = x.end - x.start;
        const n = Math.max(roundEps(Math.abs(delta) / HALF_PI), 1);
        // https://github.com/chromium/chromium/blob/master/third_party/blink/renderer/core/svg/svg_path_parser.cc#L253
        const d = delta / n;
        const t = 8 / 6 * Math.tan(0.25 * d);
        if (!isFinite(t)) {
            return [Cubic2.fromLine(p, q)];
        }
        for (let i = n, theta = x.start; i > 0; i-- , theta += d) {
            const [s1, c1] = sincos(theta);
            const [s2, c2] = sincos(theta + d);
            const curve = new Cubic2(
                [
                    mapP(c1, s1),
                    mapP(c1 - s1 * t, s1 + c1 * t),
                    mapP(c2 + s2 * t, s2 - c2 * t),
                    mapP(c2, s2),
                ],
                { ...x.attribs }
            );
            res.push(curve);
        }
        return res;
    },

    bounds,
    (x: Arc2) => {
        const pts = transduce(
            map<number, Vec>(x.pointAtTheta.bind(x)),
            push(),
            [
                x.start,
                x.end,
                // multiples of HALF_PI in arc range
                ...filter(
                    (t: number) => inRange(t, x.start, x.end),
                    range(-3 * PI, 3.01 * PI, HALF_PI)
                )
            ]
        );
        return Rect2.fromMinMax(..._bounds(pts, [...Vec2.MAX], [...Vec2.MIN]));
    },

    centroid,
    (x: Arc2) => x.pos,

    pointAt,
    (x: Arc2, t: number) => x.pointAtTheta(fit01(t, x.start, x.end)),

    vertices,
    (x: Arc2, opts?: number | Partial<SamplingOpts>): Vec[] => {
        if (isPlainObject(opts) && (<any>opts).dist !== undefined) {
            return new Sampler(vertices(x, (<any>opts).num || DEFAULT_SAMPLES))
                .sampleUniform((<any>opts).dist, (<any>opts).last !== false);
        }
        opts = isNumber(opts) ?
            { num: opts, last: true } :
            { num: DEFAULT_SAMPLES, ...opts };
        const start = x.start;
        let delta = x.end - start;
        let num = opts.theta ?
            Math.round(delta / opts.theta) :
            opts.num;
        delta /= num;
        opts.last !== false && num++;
        const pts: Vec[] = new Array(num);
        for (let i = 0, j = 0; i < num; i++ , j += 2) {
            pts[i] = x.pointAtTheta(start + i * delta);
        }
        return pts;
    }
);
