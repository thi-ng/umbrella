import { ceilPow2 } from "@thi.ng/binary/pow";
import { fit, fit01 } from "@thi.ng/math/fit";

export const encode5 = (x: number) => {
    x &= 0x0000001f;
    x = (x * 0x01041041) & 0x10204081;
    x = (x * 0x00108421) & 0x15500000;
    return x >>> 20;
};

export const encode10 = (x: number) => {
    x &= 0x000003ff;                // ---- ---- ---- ---- ---- --98 7654 3210
    x = (x | x << 16) & 0xff0000ff; // ---- --98 ---- ---- ---- ---- 7654 3210
    x = (x | x << 8) & 0x0300f00f;  // ---- --98 ---- ---- 7654 ---- ---- 3210
    x = (x | x << 4) & 0x030c30c3;  // ---- --98 ---- 76-- --54 ---- 32-- --10
    x = (x | x << 2) & 0x09249249;  // ---- 9--8 --7- -6-- 5--4 --3- -2-- 1--0
    return x >>> 0;
};

export const encode16 = (x: number) => {
    x &= 0x0000ffff;               // ---- ---- ---- ---- fedc ba98 7654 3210
    x = (x | x << 8) & 0x00ff00ff; // ---- ---- fedc ba98 ---- ---- 7654 3210
    x = (x | x << 4) & 0x0f0f0f0f; // ---- fedc ---- ba98 ---- 7654 ---- 3210
    x = (x | x << 2) & 0x33333333; // --fe --dc --ba --98 --76 --54 --32 --10
    x = (x | x << 1) & 0x55555555; // -f-e -d-c -b-a -9-8 -7-6 -5-4 -3-2 -1-0
    return x >>> 0;
};

export const decode5 = (x: number) => {
    x &= 0x00000155;
    x = (x | x >> 1) & 0x00000133;
    x = (x | x >> 2) & 0x0000010f;
    x = (x | x >> 4) & 0x0000001f;
    return x;
};

export const decode10 = (x: number) => {
    x &= 0x09249249;
    x = (x | x >> 2) & 0x030c30c3;
    x = (x | x >> 4) & 0x0300f00f;
    x = (x | x >> 8) & 0xff0000ff;
    x = (x | x >> 16) & 0x000003ff;
    return x;
};

export const decode16 = (x: number) => {
    x &= 0x55555555;
    x = (x | x >> 1) & 0x33333333;
    x = (x | x >> 2) & 0x0f0f0f0f;
    x = (x | x >> 4) & 0x00ff00ff;
    x = (x | x >> 8) & 0x0000ffff;
    return x;
};

export const encodeScaled5 = (x: number, min = 0, max = 1) =>
    encode5(Math.round(fit(x, min, max, 0, 0x1f)));

export const encodeScaled10 = (x: number, min = 0, max = 1) =>
    encode10(Math.round(fit(x, min, max, 0, 0x3ff)));

export const encodeScaled16 = (x: number, min = 0, max = 1) =>
    encode16(Math.round(fit(x, min, max, 0, 0xffff)));

export const decodeScaled5 = (x: number, min = 0, max = 1) =>
    fit01(decode5(x) / 0x1f, min, max);

export const decodeScaled10 = (x: number, min = 0, max = 1) =>
    fit01(decode10(x) / 0x3ff, min, max);

export const decodeScaled16 = (x: number, min = 0, max = 1) =>
    fit01(decode16(x) / 0xffff, min, max);

export const mux2 = (x: number, y: number) =>
    (encode16(x) | encode16(y) << 1) >>> 0;

export const mux3 = (x: number, y: number, z: number) =>
    (encode10(x) | encode10(y) << 1 | encode10(z) << 2) >>> 0;

export const demux2 = (n: number) =>
    [decode16(n), decode16(n >>> 1)];

export const demux3 = (n: number) =>
    [decode10(n), decode10(n >>> 1), decode10(n >>> 2)];

export const muxScaled2 = (x: number, y: number, min = 0, max = 1) =>
    (
        encodeScaled16(x, min, max) |
        encodeScaled16(y, min, max) << 1
    ) >>> 0;

export const muxScaled3 = (x: number, y: number, z: number, min = 0, max = 1) =>
    (
        encodeScaled10(x, min, max) |
        encodeScaled10(y, min, max) << 1 |
        encodeScaled10(z, min, max) << 2
    ) >>> 0;

export const demuxScaled2 = (n: number, min = 0, max = 1) =>
    [
        decodeScaled16(n, min, max),
        decodeScaled16(n >>> 1, min, max)
    ];

export const demuxScaled3 = (n: number, min = 0, max = 1) =>
    [
        decodeScaled10(n, min, max),
        decodeScaled10(n >>> 1, min, max),
        decodeScaled10(n >>> 2, min, max)
    ];

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
    const $ = (v: number[], half: number) => {
        const t = v.reduce(
            (t, x, i) => t + ((1 << i) * <any>(x >= half)),
            0
        );
        return half > 1 ?
            [t, ...$(v.map((x) => x % half), half >>> 1)] :
            [t];
    };
    return $(v, Math.max(2, ceilPow2(Math.max(...v) + 1)) >> 1);
};
