import { isNumber, isPlainObject } from "@thi.ng/checks";
import { implementations } from "@thi.ng/defmulti";
import { clamp01, mixCubic as _mixC, mixQuadratic as _mixQ } from "@thi.ng/math";
import { Mat } from "@thi.ng/matrices";
import {
    copy,
    max,
    min,
    mixCubic,
    mixN,
    mixQuadratic,
    Vec
} from "@thi.ng/vectors3";
import {
    asCubic,
    asPolyline,
    Attribs,
    bounds,
    Cubic2,
    DEFAULT_SAMPLES,
    flip,
    pointAt,
    Polyline2,
    Quadratic2,
    Rect2,
    SamplingOpts,
    splitAt,
    transform,
    Type,
    vertices
} from "./api";
import { Sampler } from "./internal/sampler";
import { transformPoints } from "./internal/transform";

export function cubic2(points: Vec[], attribs?: Attribs): Cubic2 {
    return new Cubic2(points, attribs);
}

export function quadratic2(points: Vec[], attribs?: Attribs): Quadratic2 {
    return new Quadratic2(points, attribs);
}

const cubicAxisBounds = (pa: number, pb: number, pc: number, pd: number) => {
    let a = 3 * pd - 9 * pc + 9 * pb - 3 * pa;
    let b = 6 * pa - 12 * pb + 6 * pc;
    let c = 3 * pb - 3 * pa;
    let disc = b * b - 4 * a * c;
    let l = pa;
    let h = pa;

    const bounds = (t: number) => {
        if (t > 0 && t < 1) {
            const x = _mixC(pa, pb, pc, pd, t);
            x < l && (l = x);
            x > h && (h = x);
        }
    };

    pd < l && (l = pd);
    pd > h && (h = pd);
    if (disc >= 0) {
        disc = Math.sqrt(disc);
        a *= 2;
        bounds((-b + disc) / a);
        bounds((-b - disc) / a);
    }
    return [l, h];
};

implementations(
    Type.CUBIC2,

    {
        [Type.POINTS2]: [
            flip,
        ]
    },

    asCubic,
    (curve: Cubic2) => [curve],

    asPolyline,
    (curve: Cubic2, opts?: number | Partial<SamplingOpts>) =>
        new Polyline2(vertices(curve, opts), { ...curve.attribs }),

    bounds,
    (curve: Cubic2) => {
        const [a, b, c, d] = curve.points;
        const x = cubicAxisBounds(a[0], b[0], c[0], d[0]);
        const y = cubicAxisBounds(a[1], b[1], c[1], d[1]);
        return Rect2.fromMinMax([x[0], y[0]], [x[1], y[1]]);
    },

    pointAt,
    (curve: Cubic2, t: number) => {
        const pts = curve.points;
        return mixCubic([], pts[0], pts[1], pts[2], pts[3], t);
    },

    splitAt,
    (curve: Cubic2, t: number) => {
        const [a, b, c, d] = curve.points;
        if (t <= 0 || t >= 1) {
            const p = t <= 0 ? a : d;
            const c1 = new Cubic2([copy(p), copy(p), copy(p), copy(p)]);
            const c2 = new Cubic2([copy(a), copy(b), copy(c), copy(d)]);
            return t <= 0 ? [c1, c2] : [c2, c1];
        }
        const ab = mixN([], a, b, t);
        const bc = mixN([], b, c, t);
        const cd = mixN([], c, d, t);
        const abc = mixN([], ab, bc, t);
        const bcd = mixN([], bc, cd, t);
        const p = mixN([], abc, bcd, t);
        return [
            new Cubic2([[a[0], a[1]], [ab[0], ab[1]], [abc[0], abc[1]], [p[0], p[1]]]),
            new Cubic2([[p[0], p[1]], [bcd[0], bcd[1]], [cd[0], cd[1]], [d[0], d[1]]])
        ];
    },

    transform,
    (curve: Cubic2, mat: Mat) =>
        new Cubic2(
            transformPoints(curve.points, mat),
            { ...curve.attribs }
        ),

    vertices,
    (curve: Cubic2, opts?: number | Partial<SamplingOpts>) => {
        if (isPlainObject(opts) && (<any>opts).dist !== undefined) {
            return new Sampler(vertices(curve, (<any>opts).num || DEFAULT_SAMPLES))
                .sampleUniform((<any>opts).dist, (<any>opts).last !== false);
        }
        opts = isNumber(opts) ?
            {
                num: opts,
                last: true
            } :
            {
                num: DEFAULT_SAMPLES,
                ...opts
            };
        const res: Vec[] = [];
        const [a, b, c, d] = curve.points;
        const delta = 1 / opts.num;
        for (let t = 0; t < opts.num; t++) {
            res.push(mixCubic([], a, b, c, d, t * delta));
        }
        opts.last && res.push([d[0], d[1]]);
        return res;
    }
);

implementations(
    Type.QUADRATIC2,

    {
        [Type.POINTS2]: [
            flip,
        ]
    },

    asCubic,
    (curve: Quadratic2) => {
        const [a, b, c] = curve.points;
        return [
            new Cubic2(
                [
                    copy(a),
                    mixN([], a, b, 2 / 3),
                    mixN([], c, b, 2 / 3),
                    copy(c)
                ],
                { ...curve.attribs }
            )
        ];
    },

    asPolyline,
    (curve: Quadratic2, opts?: number | Partial<SamplingOpts>) =>
        new Polyline2(vertices(curve, opts), { ...curve.attribs }),

    bounds,
    (curve: Quadratic2) => {
        const [a, b, c] = curve.points;
        const mi = min([], a, c);
        const ma = max([], a, c);
        const solve = (a, b, c) => {
            const t = clamp01((a - b) / (a - 2.0 * b + c));
            const s = 1 - t;
            return s * s * a + 2.0 * s * t * b + t * t * c;
        };
        if (b[0] < mi[0] || b[0] > ma[0] || b[1] < mi[1] || b[1] > ma[1]) {
            const q = [
                solve(a[0], b[0], c[0]),
                solve(a[1], b[1], c[1]),
            ];
            min(null, mi, q);
            max(null, ma, q);
        }
        return Rect2.fromMinMax(mi, ma);
    },

    pointAt,
    (curve: Quadratic2, t: number) => {
        const pts = curve.points;
        return mixQuadratic([], pts[0], pts[1], pts[2], t);
    },

    splitAt,
    (curve: Quadratic2, t: number) => {
        const [a, b, c] = curve.points;
        if (t <= 0 || t >= 1) {
            const p = t <= 0 ? a : c;
            const c1 = new Quadratic2([copy(p), copy(p), copy(p), copy(p)]);
            const c2 = new Quadratic2([copy(a), copy(b), copy(c)]);
            return t <= 0 ? [c1, c2] : [c2, c1];
        }
        const ab = mixN([], a, b, t);
        const bc = mixN([], b, c, t);
        const p = mixN([], ab, bc, t);
        return [
            new Quadratic2([copy(a), ab, p]),
            new Quadratic2([p, bc, copy(c)])
        ];
    },

    transform,
    (curve: Quadratic2, mat: Mat) =>
        new Quadratic2(
            transformPoints(curve.points, mat),
            { ...curve.attribs }
        ),

    vertices,
    (curve: Quadratic2, opts?: number | Partial<SamplingOpts>) => {
        if (isPlainObject(opts) && (<any>opts).dist !== undefined) {
            return new Sampler(vertices(curve, (<any>opts).num || DEFAULT_SAMPLES))
                .sampleUniform((<any>opts).dist, (<any>opts).last !== false);
        }
        opts = isNumber(opts) ?
            {
                num: opts,
                last: true
            } :
            {
                num: DEFAULT_SAMPLES,
                ...opts
            };
        const res: Vec[] = [];
        const delta = 1 / opts.num;
        const [a, b, c] = curve.points;
        for (let t = 0; t < opts.num; t++) {
            res.push(mixQuadratic([], a, b, c, t * delta));
        }
        opts.last && res.push([c[0], c[1]]);
        return res;
    }

);
