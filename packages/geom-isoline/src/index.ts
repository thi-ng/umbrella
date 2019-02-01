import { range2d } from "@thi.ng/transducers";
import { ReadonlyVec, Vec } from "@thi.ng/vectors";

const EDGE_INDEX = [
    [-1, -1], [2, 0], [1, 0], [1, 0],
    [0, 0], [-1, -1], [0, 0], [0, 0],
    [3, 0], [2, 0], [-1, -1], [1, 0],
    [3, 0], [2, 0], [3, 0], [-1, -1]
];

const NEXT_EDGES = [[-1, 0], [0, 1], [1, 0], [0, -1]];

const S5 = [[2, 4], [0, 1], [0, 13], [2, 7]];
const S10 = [[3, 2], [1, 8], [3, 11], [1, 14]];

export const setBorder =
    (src: Vec, w: number, h: number, val: number) => {
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

const encodeCrossings =
    (src: ReadonlyVec, w: number, h: number, iso: number) => {
        const out: number[] = new Array(src.length);
        const w1 = w - 1;
        const h1 = h - 1;
        for (let y = 0, i = 0; y < h1; y++) {
            for (let x = 0; x < w1; i++ , x++) {
                out[i] =
                    (src[i] < iso ? 8 : 0) |
                    (src[i + 1] < iso ? 4 : 0) |
                    (src[i + 1 + w] < iso ? 2 : 0) |
                    (src[i + w] < iso ? 1 : 0);
            }
            i++;
        }
        return out;
    };

const cellValue =
    (src: ReadonlyVec, w: number, x: number, y: number) => {
        const idx = y * w + x;
        return (
            src[idx] +
            src[idx + 1] +
            src[idx + w] +
            src[idx + w + 1]
        ) * 0.25;
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

const contourVertex = (
    src: ReadonlyVec,
    w: number,
    x: number,
    y: number,
    to: number,
    iso: number
) => {
    switch (to) {
        case 0:
            return [x + mix(src, w, x, y, x + 1, y, iso), y];
        case 1:
            return [x + 1, y + mix(src, w, x + 1, y, x + 1, y + 1, iso)];
        case 2:
            return [x + mix(src, w, x, y + 1, x + 1, y + 1, iso), y + 1];
        case 3:
            return [x, y + mix(src, w, x, y, x, y + 1, iso)];
        default:
    }
};

export function* isolines(src: ReadonlyVec, w: number, h: number, iso: number) {
    const coded = encodeCrossings(src, w, h, iso);
    let curr: number[][] = [];
    let from: number;
    let to = -1;
    let clear: number;
    let x: number;
    let y: number;
    const w1 = w - 1;
    const h1 = h - 1;
    const cells = range2d(h, w);
    let next: boolean = true;
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
        const id = coded[y * w + x];
        if (id === 5) {
            [to, clear] = S5[
                (cellValue(src, w, x, y) > iso ? 0 : 2) +
                (from === 3 ? 0 : 1)
            ];
        } else if (id === 10) {
            [to, clear] = S10[
                cellValue(src, w, x, y) > iso ?
                    (from === 0 ? 0 : 1) :
                    (from === 2 ? 2 : 3)
            ];
        } else {
            [to, clear] = EDGE_INDEX[id];
        }
        if (curr.length > 0 && from === -1 && to > -1) {
            yield curr;
            curr = [];
        }
        if (clear !== -1) {
            coded[y * w + x] = clear;
        }
        if (to >= 0) {
            curr.push(contourVertex(src, w, x, y, to, iso));
            y += NEXT_EDGES[to][0];
            x += NEXT_EDGES[to][1];
        } else {
            next = true;
        }
    }
    if (curr.length > 0) {
        yield curr;
    }
};
