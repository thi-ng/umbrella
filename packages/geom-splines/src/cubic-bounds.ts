import { mixCubic } from "@thi.ng/math";
import { ReadonlyVec, Vec, VecPair } from "@thi.ng/vectors";

const axisBounds = (
    min: Vec,
    max: Vec,
    i: number,
    pa: number,
    pb: number,
    pc: number,
    pd: number
) => {
    let a = 3 * pd - 9 * pc + 9 * pb - 3 * pa;
    let b = 6 * pa - 12 * pb + 6 * pc;
    let c = 3 * pb - 3 * pa;
    let disc = b * b - 4 * a * c;

    let l = pa;
    let h = pa;
    pd < l && (l = pd);
    pd > h && (h = pd);

    if (disc >= 0) {
        disc = Math.sqrt(disc);
        a *= 2;

        const bounds = (t: number) => {
            if (t > 0 && t < 1) {
                const x = mixCubic(pa, pb, pc, pd, t);
                x < l && (l = x);
                x > h && (h = x);
            }
        };

        bounds((-b + disc) / a);
        bounds((-b - disc) / a);
    }

    min[i] = l;
    max[i] = h;
};

export const cubicBounds = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    d: ReadonlyVec
): VecPair => {
    const min: Vec = [];
    const max: Vec = [];
    for (let i = a.length; --i >= 0; ) {
        axisBounds(min, max, i, a[i], b[i], c[i], d[i]);
    }
    return [min, max];
};
