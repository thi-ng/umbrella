import type { ReadonlyVec, Vec } from "./api.js";

/**
 * Computes tensor product (aka outer product) of `a` and `b` and writes result
 * to `out` (or creates a new array if null). The result is to be interpreted as
 * a matrix (in column-major order) of `a.length` rows and `b.length` columns.
 *
 * @remarks
 * The tensor product is not commutative, i.e. `tensor(a,b) != tensor(b,a)`. The
 * latter case results in the Kronecker product and can be understood as
 * vectorization of `tensor(a,b)`.
 *
 * The Dot product (aka inner product) of `a` and `b` is the matrix trace of the
 * tensor/outer product.
 *
 * References:
 *
 * - https://en.wikipedia.org/wiki/Outer_product
 * - https://en.wikipedia.org/wiki/Outer_product#Connection_with_the_Kronecker_product
 *
 * @example
 * ```ts
 * tensor([], [1, 2, 3], [4, 5])
 * // [ 4, 8, 12, 5, 10, 15 ]
 *
 * tensorProduct([], [4, 5], [1, 2, 3])
 * // [ 4, 5, 8, 10, 12, 15 ]
 * ```
 *
 * @param out
 * @param a
 * @param b
 */
export const tensor = (out: Vec | null, a: ReadonlyVec, b: ReadonlyVec) => {
    out = out || [];
    const n = a.length;
    const m = b.length;
    for (let i = 0, k = 0; i < m; i++) {
        const bb = b[i];
        for (let j = 0; j < n; j++) {
            out[k++] = a[j] * bb;
        }
    }
    return out;
};
