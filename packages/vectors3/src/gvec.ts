import { range } from "@thi.ng/transducers/iter/range";
import { map } from "@thi.ng/transducers/xform/map";
import { Vec, IVector } from "./api";
import { zeroes } from "./setn";
import { eqDeltaS } from "./eqdelta";
import { EPS } from "@thi.ng/math/api";

/**
 * Wrapper for strided, arbitrary length vectors. Wraps given buffer in
 * ES6 `Proxy` with custom property getters/setters and implements the
 * ES6 `Iterable` interface and this libraries `IVector` methods and
 * read/write access of the following properties:
 *
 * - `i` - start index
 * - `s` - component stride
 * - `buf` - backing buffer (readonly)
 * - `length` - vector size
 *
 * Array index access uses bounds checking against the [0..`size`)
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
 * @param i
 * @param s
 */
export const gvec = (buf: Vec, size: number, i = 0, s = 1): IVector<any> =>
    <any>new Proxy(buf, {
        get: (obj, id) => {
            switch (id) {
                case Symbol.iterator:
                    return function* () {
                        for (let j = 0, ii = i, ss = s; j < size; j++) {
                            yield obj[ii + j * ss];
                        }
                    };
                case "length":
                    return size;
                case "buf":
                    return buf;
                case "i":
                    return i;
                case "s":
                    return s;
                case "copy":
                    return function () {
                        const res = [];
                        for (let j = 0; j < size; j++) {
                            res[j] = obj[i + j * s];
                        }
                        return res;
                    };
                case "empty":
                    return () => zeroes(size);
                case "eqDelta":
                    return (o, eps = EPS) => eqDeltaS(buf, o, size, eps, i, 0, s, 1);
                default:
                    let j = parseInt(<string>id);
                    return !isNaN(j) && j >= 0 && j < size ?
                        obj[i + j * s] :
                        undefined;
            }
        },
        set: (obj, id, value) => {
            const j = parseInt(<string>id);
            if (!isNaN(j) && <any>j >= 0 && <any>j < size) {
                obj[i + (<number>id | 0) * s] = value;
            } else {
                switch (id) {
                    case "i":
                        i = value;
                        break;
                    case "s":
                        s = value;
                        break;
                    case "length":
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
            id === "i" ||
            id == "s" ||
            id == "length",
        ownKeys: () =>
            [...map(String, range(size)), "i", "s", "length"],
    });
