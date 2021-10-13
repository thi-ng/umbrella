import type { NumericArray } from "@thi.ng/api";
import type { VectorConstructor } from "./api.js";

export function* vecIterator<T>(
    ctor: VectorConstructor<T>,
    buf: NumericArray,
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
    buf: NumericArray,
    num: number,
    start: number,
    stride: number
) {
    while (num-- > 0) {
        yield buf[start];
        start += stride;
    }
}
