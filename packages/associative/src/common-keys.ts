/**
 * Like `commonKeysObj()`, but for ES6 Maps.
 *
 * @param a
 * @param b
 * @param out
 */
export const commonKeysMap = <K>(
    a: Map<K, any>,
    b: Map<K, any>,
    out: K[] = []
) => {
    for (let k of a.keys()) {
        b.has(k) && out.push(k);
    }
    return out;
};

/**
 * Returns array of keys present in both args, i.e. the set intersection
 * of the given objects' key / property sets.
 *
 * ```
 * commonKeys({ a: 1, b: 2 }, { c: 10, b: 20, a: 30 })
 * // [ "a", "b" ]
 * ```
 *
 * @param a
 * @param b
 * @param out
 */
export const commonKeysObj = <A extends any, B extends any>(
    a: A,
    b: B,
    out: string[] = []
): (keyof A & keyof B)[] => {
    for (let k in a) {
        b.hasOwnProperty(k) && out.push(k);
    }
    return <any>out;
};
