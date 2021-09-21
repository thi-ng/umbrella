import { ceilPow2 } from "@thi.ng/binary/pow";

export const treeToMorton = (t: number[], dim: number) => {
    let n = 0;
    let m = 0;
    let l = t.length;
    dim = 1 << dim;
    while (--l >= 0) {
        m += (t[l] - 1) * Math.pow(dim, n);
        n++;
    }
    return m + 1;
};

export const mortonToTree = (m: number, dim: number) => {
    const t: number[] = [];
    dim = 1 << dim;
    while (true) {
        m--;
        const d = ((m / dim) | 0) + 1;
        const r = (m % dim) + 1;
        t.unshift(r);
        if (d === 1) break;
        m = d;
    }
    return t;
};

/**
 * Inverse operation of {@link cartesianToTree}. Takes vector of nD quad
 * tree coordinates and converts them back to cartesian.
 *
 * @param t - tree coords
 * @param dim - dimensionality
 */
export const treeToCartesian = (t: number[], dim: number) => {
    const c: number[] = [];
    for (let i = 0, x = t[0] - 1; i < dim; i++) {
        c[i] = ((x >>> i) & 1) + 1;
    }
    if (t.length < 2) return c;
    const cn = treeToCartesian(t.slice(1), dim);
    const m = 1 << (t.length - 1);
    const res: number[] = new Array(dim);
    for (let i = 0; i < dim; i++) {
        res[i] = m * (c[i] - 1) + cn[i];
    }
    return res;
};

/**
 * Takes a vector of positive integer coordinates and returns vector of
 * nD quad tree coordinates.
 *
 * @param v
 */
export const cartesianToTree = (v: number[]) => {
    const $ = (v: number[], half: number): number[] => {
        const t = v.reduce((t, x, i) => t + (1 << i) * <any>(x > half), 1);
        return half > 1
            ? [
                  t,
                  ...$(
                      v.map((x) => ((x - 1) % half) + 1),
                      half >>> 1
                  ),
              ]
            : [t];
    };
    return $(v, Math.max(2, ceilPow2(Math.max(...v))) >>> 1);
};
