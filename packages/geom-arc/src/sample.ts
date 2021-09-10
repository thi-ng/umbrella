import { isNumber } from "@thi.ng/checks/is-number";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { DEFAULT_SAMPLES, SamplingOpts } from "@thi.ng/geom-api/sample";
import { Sampler } from "@thi.ng/geom-resample/sampler";
import { TAU } from "@thi.ng/math/api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { cartesian2 } from "@thi.ng/vectors/cartesian";
import { pointAtTheta } from "./point-at";

export const sample = (
    pos: ReadonlyVec,
    r: ReadonlyVec,
    axis: number,
    start: number,
    end: number,
    opts?: number | Partial<SamplingOpts>
): Vec[] => {
    if (isPlainObject(opts) && (<any>opts).dist !== undefined) {
        return new Sampler(
            sample(
                pos,
                r,
                axis,
                start,
                end,
                (<SamplingOpts>opts).num || DEFAULT_SAMPLES
            )
        ).sampleUniform((<any>opts).dist, (<any>opts).last !== false);
    }
    opts = isNumber(opts)
        ? { num: opts, last: true }
        : { num: DEFAULT_SAMPLES, ...opts };
    let delta = end - start;
    let num = opts.theta ? Math.round(delta / opts.theta) : opts.num!;
    delta /= num;
    opts.last !== false && num++;
    const pts: Vec[] = new Array(num);
    for (let i = 0; i < num; i++) {
        pts[i] = pointAtTheta(pos, r, axis, start + i * delta);
    }
    return pts;
};

/**
 * Computes `steps` points (default: 8) on the circular arc between
 * points `a` and `b` with `origin` and radius `r`. Points are added to
 * optional `out` (or a new array). If `addLast` is falst (default:
 * true), point `b` will NOT be added.
 *
 * @param origin
 * @param r
 * @param a
 * @param b
 * @param out
 * @param steps
 * @param outwards
 * @param addLast
 */
export const sampleCircular = (
    origin: Vec,
    r: number,
    a: Vec,
    b: Vec,
    out: Vec[] = [],
    steps = 8,
    outwards = true,
    addLast = true
) => {
    let ta = Math.atan2(a[1] - origin[1], a[0] - origin[0]);
    let tb = Math.atan2(b[1] - origin[1], b[0] - origin[0]);
    ta < 0 && (ta += TAU);
    tb < 0 && (tb += TAU);
    const theta = ta > tb ? ta - tb : ta + TAU - tb;
    const delta = (outwards ? -theta : TAU - theta) / steps;
    out.push(a);
    for (let i = 1; i < steps; i++) {
        out.push(cartesian2(null, [r, ta + delta * i], origin));
    }
    addLast && out.push(b);
    return out;
};
