import { Vec, VecOpSV, VectorConstructor } from "../api";

export const mapStridedBuffer = <T>(
    ctor: VectorConstructor<T>,
    buf: Vec,
    num: number,
    start: number,
    cstride: number,
    estride: number
) => {
    const res: T[] = [];
    while (--num >= 0) {
        res.push(new ctor(buf, start, cstride));
        start += estride;
    }
    return res;
};

export const intoStridedBuffer = (
    set: VecOpSV,
    buf: Vec,
    src: Iterable<Vec>,
    start: number,
    cstride: number,
    estride: number
) => {
    for (let v of src) {
        set(buf, v, start, 0, cstride, 1);
        start += estride;
    }
    return buf;
};

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
