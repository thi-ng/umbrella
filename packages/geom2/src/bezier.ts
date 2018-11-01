import { isNumber } from "@thi.ng/checks/is-number";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { implementations } from "@thi.ng/defmulti";
import { clamp01 } from "@thi.ng/math/interval";
import { mixCubic as _mixC, mixQuadratic as _mixQ } from "@thi.ng/math/mix";
import {
    copy,
    maddN,
    max,
    min,
    mixNewN,
    mulNewN,
    MultiVecOpNewVVVN,
    MultiVecOpNewVVVVN,
    ReadonlyVec,
    Vec
} from "@thi.ng/vectors2/api";
import { compile } from "@thi.ng/vectors2/internal/codegen";
import { vop } from "@thi.ng/vectors2/internal/ops";
import {
    asCubic,
    Attribs,
    bounds,
    Cubic2,
    DEFAULT_SAMPLES,
    pointAt,
    Quadratic2,
    Rect2,
    SamplingOpts,
    splitAt,
    Type,
    vertices
} from "./api";
import { Sampler } from "./internal/sampler";

const compileMixQ = (dim: number) =>
    compile(
        dim,
        ([a, b, c, o]) => `${o} = ${a}*wa + ${b}*wb + ${c}*wc;`,
        "a,b,c,t,o=[]",
        "a,b,c,o",
        "o",
        "const s=1-t, wa=s*s, wb=2*s*t, wc=t*t;"
    );

const compileMixC = (dim: number) =>
    compile(
        dim,
        ([a, b, c, d, o]) => `${o}=${a}*wa + ${b}*wb + ${c}*wc + ${d}*wd;`,
        "a,b,c,d,t,o=[]",
        "a,b,c,d,o",
        "o",
        "const s=1-t, s2=s*s, t2=t*t, wa=s2*s, wb=3*s2*t, wc=3*t2*s, wd=t2*t;"
    );

export const mixQuadratic: MultiVecOpNewVVVN<Vec> = vop();
mixQuadratic.add(2, compileMixQ(2));
mixQuadratic.add(3, compileMixQ(3));
mixQuadratic.default((a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, t: number, o: Vec = []) => {
    const s = 1 - t;
    return maddN(maddN(mulNewN(a, s * s, o), b, 2 * s * t), c, t * t);
});

export const mixCubic: MultiVecOpNewVVVVN<Vec> = vop();
mixCubic.add(2, compileMixC(2));
mixCubic.add(3, compileMixC(3));
mixCubic.default((a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, d: ReadonlyVec, t: number, o: Vec = []) => {
    const t2 = t * t;
    const s = 1 - t;
    const s2 = s * s;
    return maddN(maddN(maddN(mulNewN(a, s2 * s, o), b, 3 * s2 * t), c, 3 * t2 * s), d, t2 * t);
});

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

    bounds,
    ($: Cubic2) => {
        const [a, b, c, d] = $.points;
        const x = cubicAxisBounds(a[0], b[0], c[0], d[0]);
        const y = cubicAxisBounds(a[1], b[1], c[1], d[1]);
        return Rect2.fromMinMax([x[0], y[0]], [x[1], y[1]]);
    },

    pointAt,
    (x: Cubic2, t: number) => {
        const pts = x.points;
        return mixCubic(pts[0], pts[1], pts[2], pts[3], t);
    },

    splitAt,
    (x: Cubic2, t: number) => {
        const [a, b, c, d] = x.points;
        if (t <= 0 || t >= 1) {
            const p = t <= 0 ? a : d;
            const c1 = new Cubic2([copy(p), copy(p), copy(p), copy(p)]);
            const c2 = new Cubic2([copy(a), copy(b), copy(c), copy(d)]);
            return t <= 0 ? [c1, c2] : [c2, c1];
        }
        const ab = mixNewN(a, b, t);
        const bc = mixNewN(b, c, t);
        const cd = mixNewN(c, d, t);
        const abc = mixNewN(ab, bc, t);
        const bcd = mixNewN(bc, cd, t);
        const p = mixNewN(abc, bcd, t);
        return [
            new Cubic2([[a[0], a[1]], [ab[0], ab[1]], [abc[0], abc[1]], [p[0], p[1]]]),
            new Cubic2([[p[0], p[1]], [bcd[0], bcd[1]], [cd[0], cd[1]], [d[0], d[1]]])
        ];
    },

    vertices,
    (x: Cubic2, opts?: number | Partial<SamplingOpts>) => {
        if (isPlainObject(opts) && (<any>opts).dist !== undefined) {
            return new Sampler(vertices(x, (<any>opts).num || DEFAULT_SAMPLES))
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
        const [a, b, c, d] = x.points;
        const delta = 1 / opts.num;
        for (let t = 0; t < opts.num; t++) {
            res.push(mixCubic(a, b, c, d, t * delta));
        }
        opts.last && res.push([d[0], d[1]]);
        return res;
    }
);

implementations(
    Type.QUADRATIC2,

    asCubic,
    (x: Quadratic2) => {
        const [a, b, c] = x.points;
        return [
            new Cubic2(
                [
                    copy(a),
                    mixNewN(a, b, 2 / 3),
                    mixNewN(c, b, 2 / 3),
                    copy(c)
                ],
                { ...x.attribs }
            )
        ];
    },

    bounds,
    (x: Quadratic2) => {
        const [a, b, c] = x.points;
        const mi = min(copy(a), c);
        const ma = max(copy(a), c);
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
            min(mi, q);
            max(ma, q);
        }
        return Rect2.fromMinMax(mi, ma);
    },

    pointAt,
    (x: Quadratic2, t: number) => {
        const pts = x.points;
        return mixQuadratic(pts[0], pts[1], pts[2], t);
    },

    splitAt,
    (x: Quadratic2, t: number) => {
        const [a, b, c] = x.points;
        if (t <= 0 || t >= 1) {
            const p = t <= 0 ? a : c;
            const c1 = new Quadratic2([copy(p), copy(p), copy(p), copy(p)]);
            const c2 = new Quadratic2([copy(a), copy(b), copy(c)]);
            return t <= 0 ? [c1, c2] : [c2, c1];
        }
        const ab = mixNewN(a, b, t);
        const bc = mixNewN(b, c, t);
        const p = mixNewN(ab, bc, t);
        return [
            new Quadratic2([copy(a), ab, p]),
            new Quadratic2([p, bc, copy(c)])
        ];
    },

    vertices,
    (x: Quadratic2, opts?: number | Partial<SamplingOpts>) => {
        if (isPlainObject(opts) && (<any>opts).dist !== undefined) {
            return new Sampler(vertices(x, (<any>opts).num || DEFAULT_SAMPLES))
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
        const [a, b, c] = x.points;
        for (let t = 0; t < opts.num; t++) {
            res.push(mixQuadratic(a, b, c, t * delta));
        }
        opts.last && res.push([c[0], c[1]]);
        return res;
    }

);

export function cubic2(points: Vec[], attribs?: Attribs): Cubic2 {
    return new Cubic2(points, attribs);
}

export function quadratic2(points: Vec[], attribs?: Attribs): Quadratic2 {
    return new Quadratic2(points, attribs);
}
