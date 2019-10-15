import {
    SIZEOF,
    Type,
    TYPEDARRAY_CTORS,
    TypedArrayTypeMap
} from "@thi.ng/api";

/**
 * Takes an `ArrayBuffer` and creates a number of typed array vector
 * views with given `size` and spacing. `byteOffset` defines the start
 * offset for the first vector and `byteStride` the number of bytes
 * between resulting vectors (defaults to `size * SIZEOF[type]`).
 *
 * ```
 * mapBuffer(Type.F32, new ArrayBuffer(32), 4, 2)
 * // [
 * //   Float32Array [ 0, 0 ],
 * //   Float32Array [ 0, 0 ],
 * //   Float32Array [ 0, 0 ],
 * //   Float32Array [ 0, 0 ]
 * // ]
 * ```
 *
 * @param type
 * @param buf
 * @param num
 * @param size
 * @param byteOffset
 * @param byteStride
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
