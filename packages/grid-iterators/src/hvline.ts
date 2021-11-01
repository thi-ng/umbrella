import { asInt } from "./utils.js";

export function* hline(x: number, y: number, len: number) {
    [x, y, len] = asInt(x, y, len);
    for (const xmax = x + len; x < xmax; x++) {
        yield [x, y];
    }
}

export function* vline(x: number, y: number, len: number) {
    [x, y, len] = asInt(x, y, len);
    for (const ymax = y + len; y < ymax; y++) {
        yield [x, y];
    }
}

export function* hlineClipped(
    x: number,
    y: number,
    len: number,
    left: number,
    top: number,
    right: number,
    bottom: number
) {
    [x, y, len] = asInt(x, y, len);
    if (x >= right || y < top || y >= bottom) return;
    if (x < left) {
        len += x - left;
        x = left;
    }
    yield* hline(x, y, Math.min(len, right - x));
}

export function* vlineClipped(
    x: number,
    y: number,
    len: number,
    left: number,
    top: number,
    right: number,
    bottom: number
) {
    [x, y, len] = asInt(x, y, len);
    if (x < left || x >= right || y >= bottom) return;
    if (y < top) {
        len += y - top;
        y = top;
    }
    yield* vline(x, y, Math.min(len, bottom - y));
}
