import { EPS } from "@thi.ng/math/api";
import { memoize1 } from "@thi.ng/memoize/memoize1";
import { range } from "@thi.ng/transducers/iter/range";
import { map } from "@thi.ng/transducers/xform/map";
import { IVector, Vec } from "./api";
import { eqDeltaS } from "./eqdelta";
import { values } from "./internal/vec-utils";
import { zeroes } from "./setn";
import { setS } from "./sets";

const B = "buf";
const L = "length";
const O = "offset";
const S = "stride";

const keys = memoize1((size: number) =>
    [...map(String, range(size)), L, O, S]);

/**
 * Wrapper for strided, arbitrary length vectors. Wraps given buffer in
 * ES6 `Proxy` with custom property getters/setters and implements the following
 * interfaces:
 *
 * - `Iterable` (ES6)
 * - `ICopy`
 * - `IEmpty`
 * - `IEqualsDelta`
 * - `IVector`
 *
 * Read/write access for the following properties:
 *
 * - array indices in the [0 .. `size`) interval
 * - `offset` - start index
 * - `stride` - component stride
 * - `buf` - backing buffer (readonly)
 * - `length` - vector size
 *
 * Array index access uses bounds checking against the [0 .. `size`)
 * interval, but, for performance reasons, **not** against the actual
 * wrapped buffer.
 *
 * Note: ES6 Proxy use is approx. 10x slower than standard array
 * accesses. If several computations are to be performed on such vectors
 * it will be much more efficient to first copy them to compact arrays
 * and then copy result back if needed.
 *
 * ```
 * // 3D vector w/ stride length of 4
 * a = gvec([1,0,0,0,2,0,0,0,3,0,0,0], 3, 0, 4);
 * a[0] // 1
 * a[1] // 2
 * a[2] // 3
 *
 * [...a]
 * // [1, 2, 3]
 *
 * add([], a, a)
 * // [2, 4, 6]
 *
 * add()
 * ```
 *
 * @param buf
 * @param size
 * @param offset
 * @param stride
 */
export const gvec =
    (buf: Vec, size: number, offset = 0, stride = 1): IVector<any> =>
        <any>new Proxy(buf, {
            get: (obj, id) => {
                switch (id) {
                    case Symbol.iterator:
                        return () => values(obj, size, offset, stride);
                    case L:
                        return size;
                    case B:
                        return buf;
                    case O:
                        return offset;
                    case S:
                        return stride;
                    case "copy":
                        return () =>
                            gvec(setS([], obj, 0, offset, 1, stride), size);
                    case "copyView":
                        return () =>
                            gvec(obj, size, offset, stride);
                    case "empty":
                        return () => zeroes(size);
                    case "eqDelta":
                        return (o, eps = EPS) =>
                            eqDeltaS(buf, o, size, eps, offset, 0, stride, 1);
                    default:
                        let j = parseInt(<string>id);
                        return !isNaN(j) && j >= 0 && j < size ?
                            obj[offset + j * stride] :
                            undefined;
                }
            },
            set: (obj, id, value) => {
                const j = parseInt(<string>id);
                if (!isNaN(j) && <any>j >= 0 && <any>j < size) {
                    obj[offset + (<number>id | 0) * stride] = value;
                } else {
                    switch (id) {
                        case O:
                            offset = value;
                            break;
                        case S:
                            stride = value;
                            break;
                        case L:
                            size = value;
                            break;
                        default:
                            return false;
                    }
                }
                return true
            },
            has: (_, id) =>
                (<any>id >= 0 && <any>id < size) ||
                id === O ||
                id == S ||
                id == L,
            ownKeys: () => keys(size),
        });
