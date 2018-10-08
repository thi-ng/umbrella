import { ICopy } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks/is-number";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { IMath } from "@thi.ng/vectors/api";
import { Vec2 } from "@thi.ng/vectors/vec2";
import {
    DEFAULT_SAMPLES,
    IVertices,
    SamplingOpts
} from "./api";
import { PointContainer2 } from "./container2";
import { Sampler } from "./sampler";
import { clamp1 } from "@thi.ng/vectors/math";

export const mixQuadratic1 = (a: number, b: number, c: number, t: number) => {
    const s = 1 - t;
    return a * s * s + b * 2 * s * t + c * t * t;
};

export const mixCubic1 = (a: number, b: number, c: number, d: number, t: number) => {
    const t2 = t * t;
    const s = 1 - t;
    const s2 = s * s;
    return a * s2 * s + b * 3 * s2 * t + c * 3 * t2 * s + d * t2 * t;
};

export const mixQuadratic = <T extends ICopy<T> & IMath<T>>(a: T, b: T, c: T, t: number) => {
    const s = 1 - t;
    return a.copy().mulN(s * s)
        .maddN(b, 2 * s * t)
        .maddN(c, t * t);
};

export const mixCubic = <T extends ICopy<T> & IMath<T>>(a: T, b: T, c: T, d: T, t: number) => {
    const t2 = t * t;
    const s = 1 - t;
    const s2 = s * s;
    return a.copy().mulN(s2 * s)
        .maddN(b, 3 * s2 * t)
        .maddN(c, 3 * t2 * s)
        .maddN(d, t2 * t);
};

const cubicAxisBounds = (pa: number, pb: number, pc: number, pd: number) => {
    let a = 3 * pd - 9 * pc + 9 * pb - 3 * pa;
    let b = 6 * pa - 12 * pb + 6 * pc;
    let c = 3 * pb - 3 * pa;
    let disc = b * b - 4 * a * c;
    let l = pa;
    let h = pa;

    const bounds = (t: number) => {
        if (t > 0 && t < 1) {
            const x = mixCubic1(pa, pb, pc, pd, t);
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

export class Cubic2 extends PointContainer2 implements
    IVertices<Vec2, number | Partial<SamplingOpts>> {

    copy() {
        return new Cubic2(this._copy(), this.attribs);
    }

    boundsRaw(): [Vec2, Vec2] {
        // https://stackoverflow.com/a/24814530/294515
        // https://iquilezles.org/www/articles/bezierbbox/bezierbbox.htm
        const [a, b, c, d] = this.points;
        const x = cubicAxisBounds(a.x, b.x, c.x, d.x);
        const y = cubicAxisBounds(a.y, b.y, c.y, d.y);
        return <any>Vec2.mapBuffer([x[0], y[0], x[1], y[1]], 2);
    }

    pointAt(t: number) {
        const pts = this.points;
        return mixCubic(pts[0], pts[1], pts[2], pts[3], t);
    }

    /**
     * Splits curve into 2 sub-curves at position `t`.
     *
     * http://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm
     *
     * @param t
     */
    splitAt(t: number): [Cubic2, Cubic2] {
        const [a, b, c, d] = this.points;
        if (t <= 0 || t >= 1) {
            const p = t <= 0 ? a : d;
            const c1 = new Cubic2(Vec2.mapBuffer([p.x, p.y, p.x, p.y, p.x, p.y], 4));
            const c2 = new Cubic2(Vec2.mapBuffer([a.x, a.y, b.x, b.y, c.x, c.y, d.x, d.y], 4));
            return t <= 0 ? [c1, c2] : [c2, c1];
        }
        const ab = a.mixNewN(b, t);
        const bc = b.mixNewN(c, t);
        const cd = c.mixNewN(d, t);
        const abc = ab.mixNewN(bc, t);
        const bcd = bc.mixNewN(cd, t);
        const p = abc.mixNewN(bcd, t);
        return [
            new Cubic2(Vec2.mapBuffer([a.x, a.y, ab.x, ab.y, abc.x, abc.y, p.x, p.y], 4)),
            new Cubic2(Vec2.mapBuffer([p.x, p.y, bcd.x, bcd.y, cd.x, cd.y, d.x, d.y], 4))
        ];
    }

    vertices(opts?: Partial<SamplingOpts>) {
        if (isPlainObject(opts) && (<any>opts).dist !== undefined) {
            return new Sampler(this.vertices((<any>opts).num || DEFAULT_SAMPLES))
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
        const res: number[] = [];
        const [a, b, c, d] = this.points;
        const delta = 1 / opts.num;
        for (let t = 0; t < opts.num; t++) {
            res.push(
                mixCubic1(a.x, b.x, c.x, d.x, t * delta),
                mixCubic1(a.y, b.y, c.y, d.y, t * delta)
            );
        }
        opts.last && res.push(d.x, d.y);
        return Vec2.mapBuffer(res);
    }

    toHiccup() {
        const pts = this.points;
        return ["path", this.attribs, [["M", pts[0]], ["C", pts[1], pts[2], pts[3]]]];
    }
}

// https://github.com/uxebu/bonsai/blob/master/src/runner/path/curved_path.js
export class Quadratic2 extends PointContainer2 implements
    IVertices<Vec2, number | Partial<SamplingOpts>> {

    copy() {
        return new Quadratic2(this._copy(), this.attribs);
    }

    boundsRaw(): [Vec2, Vec2] {
        const [a, b, c] = this.points;
        const mi = a.copy().min(c);
        const ma = a.copy().max(c);
        const solve = (a, b, c) => {
            const t = clamp1((a - b) / (a - 2.0 * b + c), 0, 1);
            const s = 1 - t;
            return s * s * a + 2.0 * s * t * b + t * t * c;
        };
        if (b.x < mi.x || b.x > ma.x || b.y < mi.y || b.y > ma.y) {
            const q = new Vec2([
                solve(a.x, b.x, c.x),
                solve(a.y, b.y, c.y),
            ]);
            mi.min(q);
            ma.max(q);
        }
        return [mi, ma];
    }

    pointAt(t: number) {
        const pts = this.points;
        return mixQuadratic(pts[0], pts[1], pts[2], t);
    }

    /**
     * Splits curve into 2 sub-curves at position `t`.
     *
     * http://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm
     *
     * @param t
     */
    splitAt(t: number): [Quadratic2, Quadratic2] {
        const [a, b, c] = this.points;
        if (t == 0) {
            return [
                new Quadratic2(this._copy([a, a, a])),
                new Quadratic2(this._copy([a, b, c]))
            ];
        }
        if (t == 1) {
            return [
                new Quadratic2(this._copy([a, b, c])),
                new Quadratic2(this._copy([c, c, c]))
            ];
        }
        const ab = a.mixNewN(b, t);
        const bc = b.mixNewN(c, t);
        const p = ab.mixNewN(bc, t);
        return [
            new Quadratic2([a.copy(), ab, p]),
            new Quadratic2([p, bc, c.copy()])
        ];
    }

    vertices(opts?: number | Partial<SamplingOpts>) {
        if (isPlainObject(opts) && (<any>opts).dist !== undefined) {
            return new Sampler(this.vertices((<any>opts).num || DEFAULT_SAMPLES))
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
        const res: number[] = [];
        const delta = 1 / opts.num;
        const [a, b, c] = this.points;
        for (let t = 0; t < opts.num; t++) {
            res.push(
                mixQuadratic1(a.x, b.x, c.x, t * delta),
                mixQuadratic1(a.y, b.y, c.y, t * delta)
            );
        }
        opts.last && res.push(c.x, c.y);
        return Vec2.mapBuffer(res);
    }

    toCubic() {
        const [a, b, c] = this.points;
        return new Cubic2([
            a.copy(),
            a.mulNewN(1 / 3).maddN(b, 2 / 3),
            c.mulNewN(1 / 3).maddN(b, 2 / 3),
            c.copy()
        ]);
    }

    toHiccup() {
        const pts = this.points;
        return ["path", this.attribs, [["M", pts[0]], ["Q", pts[1], pts[2]]]];
    }
}
