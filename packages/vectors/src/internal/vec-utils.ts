import type { Vec, VectorConstructor } from "../api";

export function* vecIterator<T>(
    ctor: VectorConstructor<T>,
    buf: Vec,
    num: number,
    start: number,
    cstride: number,
    estride: number
) {
    while (num-- > 0) {
        yield new ctor(buf, start, cstride);
        start += estride;
    }
}

export function* stridedValues(
    buf: Vec,
    num: number,
    start: number,
    stride: number
) {
    while (num-- > 0) {
        yield buf[start];
        start += stride;
    }
}
