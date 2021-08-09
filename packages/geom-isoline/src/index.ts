import type { Fn5 } from "@thi.ng/api";
import { range2d } from "@thi.ng/transducers";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";

// flattened [to, clear] tuples
// all positive values are given as times 2
// prettier-ignore
const EDGE_INDEX = [
    -1, -1, 4, 0, 2, 0, 2, 0, 0, 0, -1, -1, 0, 0, 0, 0,
    6, 0, 4, 0, -1, -1, 2, 0, 6, 0, 4, 0, 6, 0, -1, -1
];

// flattened coord offsets [x,y] tuples
const NEXT_EDGES = [0, -1, 1, 0, 0, 1, -1, 0];

// flattened [to,clear] tuples (all values times 2)
const S5 = [4, 8, 0, 2, 0, 26, 4, 14];
const S10 = [6, 4, 2, 16, 6, 22, 2, 28];

export const setBorder = (src: Vec, w: number, h: number, val: number) => {
    const w1 = w - 1;
    const h1 = h - 1;
    const idxH1 = h1 * w;
    for (let x = 0; x < w; x++) {
        src[x] = src[idxH1 + x] = val;
    }
    for (let y = 0; y < h; y++) {
        const yy = y * w;
        src[yy] = src[w1 + yy] = val;
    }
    return src;
};

const encodeCrossings = (
    src: ReadonlyVec,
    w: number,
    h: number,
    iso: number
) => {
    const out = new Uint8Array(src.length);
    const w1 = w - 1;
    const h1 = h - 1;
    for (let y = 0, i = 0; y < h1; y++) {
        for (let x = 0; x < w1; i++, x++) {
            out[i] =
                (src[i] < iso ? 16 : 0) |
                (src[i + 1] < iso ? 8 : 0) |
                (src[i + 1 + w] < iso ? 4 : 0) |
                (src[i + w] < iso ? 2 : 0);
        }
        i++;
    }
    return out;
};

const cellValue = (src: ReadonlyVec, w: number, idx: number) => {
    return (src[idx] + src[idx + 1] + src[idx + w] + src[idx + w + 1]) * 0.25;
};

const mix = (
    src: ReadonlyVec,
    w: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    iso: number
) => {
    const a = src[y1 * w + x1];
    const b = src[y2 * w + x2];
    return a === b ? 0 : (a - iso) / (a - b);
};

// prettier-ignore
const contourVertex: Fn5<ReadonlyVec, number, number, number, number, Vec>[] = [
    (src, w, x, y, iso) => [x + mix(src, w, x, y, x + 1, y, iso), y],
    (src, w, x, y, iso) => [x + 1, y + mix(src, w, x + 1, y, x + 1, y + 1, iso)],
    (src, w, x, y, iso) => [x + mix(src, w, x, y + 1, x + 1, y + 1, iso), y + 1],
    (src, w, x, y, iso) => [x, y + mix(src, w, x, y, x, y + 1, iso)]
];

/**
 * Takes an linearized 2d input field of scalars (i.e. `src` array), its
 * `width`, `height` and computes iso lines (contours) for given `iso` threshold
 * value. The computation is implemented as a generator, yielding 1 point array
 * per found contour. The returned points optionally can be scaled using `scale`
 * factor or vector. The default scale of 1.0 will result in coords in these
 * ranges: [0.5 .. w-0.5] (for X) and [0.5 .. h-0.5] (for Y).
 *
 * @param src
 * @param w
 * @param h
 * @param iso
 * @param scale
 */
export function* isolines(
    src: ReadonlyVec,
    w: number,
    h: number,
    iso: number,
    scale: ReadonlyVec | number = 1
) {
    const coded = encodeCrossings(src, w, h, iso);
    let curr: Vec[] = [];
    let from: number;
    let to = -1;
    let clear: number;
    let x!: number;
    let y!: number;
    const w1 = w - 1;
    const h1 = h - 1;
    const [sx, sy] = typeof scale === "number" ? [scale, scale] : scale;
    const cells = range2d(h, w);
    let next: boolean = true;
    let idx: number;
    while (true) {
        from = to;
        if (next) {
            const c = cells.next();
            if (c.done) break;
            [y, x] = c.value;
            next = false;
        }
        if (x >= w1 || y >= h1) {
            next = true;
            continue;
        }
        const i = y * w + x;
        const id = coded[i]; // * 2
        if (id === 10) {
            idx = (cellValue(src, w, i) > iso ? 0 : 4) + (from === 6 ? 0 : 2);
            to = S5[idx];
            clear = S5[idx + 1];
        } else if (id === 20) {
            idx =
                cellValue(src, w, i) > iso
                    ? from === 0
                        ? 0
                        : 2
                    : from === 4
                    ? 4
                    : 6;
            to = S10[idx];
            clear = S10[idx + 1];
        } else {
            to = EDGE_INDEX[id];
            clear = EDGE_INDEX[id + 1];
        }
        if (from === -1 && to > -1 && curr.length > 0) {
            yield curr;
            curr = [];
        }
        if (clear !== -1) {
            coded[i] = clear;
        }
        if (to >= 0) {
            const p = contourVertex[to >> 1](src, w, x, y, iso);
            p[0] = (p[0] + 0.5) * sx;
            p[1] = (p[1] + 0.5) * sy;
            curr.push(p);
            x += NEXT_EDGES[to];
            y += NEXT_EDGES[to + 1];
        } else {
            next = true;
        }
    }
    if (curr.length > 0) {
        yield curr;
    }
}
