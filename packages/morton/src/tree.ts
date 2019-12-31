import { ceilPow2 } from "@thi.ng/binary";

export const treeToMorton = (t: number[], dim: number) => {
    let n = 0;
    let m = 0;
    let l = t.length;
    dim = 1 << dim;
    while (--l >= 0) {
        m += t[l] * Math.pow(dim, n);
        n++;
    }
    return m;
};

export const mortonToTree = (m: number, dim: number) => {
    const t: number[] = [];
    dim = 1 << dim;
    while (true) {
        const d = Math.floor(m / dim);
        t.unshift(m % dim);
        if (!d) break;
        m = d;
    }
    return t;
};

export const treeToCartesian = (t: number[], dim: number) => {
    const c: number[] = [];
    for (let i = 0, x = t[0]; i < dim; i++) {
        c[i] = (x >>> i) & 1;
    }
    if (t.length < 2) return c;
    const cn = treeToCartesian(t.slice(1), 2);
    const m = 1 << (t.length - 1);
    const res: number[] = new Array(dim);
    for (let i = 0; i < dim; i++) {
        res[i] = m * c[i] + cn[i];
    }
    return res;
};

export const cartesianToTree = (v: number[]) => {
    const $ = (v: number[], half: number): number[] => {
        const t = v.reduce((t, x, i) => t + (1 << i) * <any>(x >= half), 0);
        return half > 1
            ? [
                  t,
                  ...$(
                      v.map((x) => x % half),
                      half >>> 1
                  )
              ]
            : [t];
    };
    return $(v, Math.max(2, ceilPow2(Math.max(...v) + 1)) >> 1);
};
