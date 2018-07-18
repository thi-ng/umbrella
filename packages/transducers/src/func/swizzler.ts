/**
 * Returns optimized function to select, repeat, reshape and / or
 * reorder array/object values in the specified index order. The
 * returned function can be used directly or as mapping function for the
 * `map` transducer. Fast paths for up to 8 indices are provided, before
 * loop based approach is used.
 *
 * ```
 * swizzler([0, 0, 0])([1, 2, 3, 4])    // [ 1, 1, 1 ]
 * swizzler([1, 1, 3, 3])([1, 2, 3, 4]) // [ 2, 2, 4, 4 ]
 * swizzler([2, 0])([1, 2, 3])          // [ 3, 1 ]
 * ```
 *
 * Even though, objects can be used as input to the generated function,
 * the returned values will always be in array form.
 *
 * ```
 * swizzler(["a", "c", "b"])({a: 1, b: 2, c: 3}) // [ 1, 3, 2 ]
 * ```
 *
 * @param order indices
 */
export function swizzler<T>(order: string | PropertyKey[]): (x: T) => any[] {
    const [a, b, c, d, e, f, g, h] = order;
    switch (order.length) {
        case 0:
            return () => [];
        case 1:
            return (x) => [x[a]];
        case 2:
            return (x) => [x[a], x[b]];
        case 3:
            return (x) => [x[a], x[b], x[c]];
        case 4:
            return (x) => [x[a], x[b], x[c], x[d]];
        case 5:
            return (x) => [x[a], x[b], x[c], x[d], x[e]];
        case 6:
            return (x) => [x[a], x[b], x[c], x[d], x[e], x[f]];
        case 7:
            return (x) => [x[a], x[b], x[c], x[d], x[e], x[f], x[g]];
        case 8:
            return (x) => [x[a], x[b], x[c], x[d], x[e], x[f], x[g], x[h]];
        default:
            return (x) => {
                const res = [];
                for (let i = order.length - 1; i >= 0; i--) {
                    res[i] = x[order[i]];
                }
                return res;
            };
    }
}