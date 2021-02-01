import {
    NumericArray,
    SIZEOF,
    Type,
    typedArray,
    TypedArrayTypeMap,
    TYPEDARRAY_CTORS,
} from "@thi.ng/api";
import type { ReadonlyVec, Vec, VecOpSV, VectorConstructor } from "./api";

/**
 * Takes an `ArrayBuffer` and creates a number of typed array vector
 * views of `type` with given `size` (number of elements per vector) and
 * spacing. `byteOffset` defines the start offset for the first vector
 * and `byteStride` the number of bytes between resulting vectors
 * (defaults to `size * SIZEOF[type]`). It's user's responsibility to
 * ensure these two values are compatible with the chosen array type
 * (i.e. for `Type.F32`, these MUST be multiples of 4).
 *
 * @example
 * ```ts
 * mapBuffer(Type.F32, new ArrayBuffer(32), 4, 2)
 * // [
 * //   Float32Array [ 0, 0 ],
 * //   Float32Array [ 0, 0 ],
 * //   Float32Array [ 0, 0 ],
 * //   Float32Array [ 0, 0 ]
 * // ]
 * ```
 *
 * @param type -
 * @param buf -
 * @param num -
 * @param size -
 * @param byteOffset -
 * @param byteStride -
 */
export const mapBuffer = <T extends Type>(
    type: T,
    buf: ArrayBufferLike,
    num: number,
    size: number,
    byteOffset = 0,
    byteStride = size * SIZEOF[type]
) => {
    const res: TypedArrayTypeMap[T][] = [];
    const ctor = TYPEDARRAY_CTORS[type];
    for (; --num >= 0; byteOffset += byteStride) {
        res.push(<any>new ctor(buf, byteOffset, size));
    }
    return res;
};

/**
 * Writes given `src` vector values into mapped `ArrayBuffer` of stated
 * `type` and from given offset & stride/spacing.
 *
 * {@link mapBuffer}
 *
 * @param type -
 * @param buf -
 * @param src -
 * @param byteOffset -
 * @param byteStride -
 */
export const intoBuffer = <T extends Type>(
    type: T,
    buf: ArrayBufferLike,
    src: Iterable<ReadonlyVec>,
    byteOffset: number,
    byteStride: number
) => {
    const view = typedArray(type, buf);
    const size = SIZEOF[type];
    byteOffset /= size;
    byteStride /= size;
    for (let x of src) {
        view.set(x, byteOffset);
        byteOffset += byteStride;
    }
};

export const mapStridedBuffer = <T>(
    ctor: VectorConstructor<T>,
    buf: NumericArray,
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
    buf: NumericArray,
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
