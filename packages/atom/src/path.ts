import { isArray } from "@thi.ng/checks/is-array";
import { isString } from "@thi.ng/checks/is-string";

import { SwapFn } from "./api";

function compS(k, f) {
    return (s, v) => ({ ...s, [k]: f((s || {})[k], v) });
}

function compG(k, f) {
    return (s) => s ? f(s[k]) : undefined;
}

function toPath(path: PropertyKey | PropertyKey[]) {
    return isArray(path) ? path : isString(path) ? path.split(".") : [path];
}

/**
 * Composes a getter function for given nested lookup path.
 * If `path` is given as string, it will be split using `.`.
 * Returns function which accepts single object and
 * when called, returns value at given path.
 *
 * If any intermediate key is not present in the given obj,
 * descent stops and the function returns `undefined`.
 *
 * If `path` is an empty array, the returned getter will simply
 * return the given state arg (identity function).
 *
 * Also see: `getIn()`
 *
 * ```
 * g = getter("a.b.c");
 * // or
 * g = getter(["a","b","c"]);
 *
 * g({a: {b: {c: 23}}}) // 23
 * g({x: 23}) // undefined
 * g() // undefined
 * ```
 *
 * @param path
 */
export function getter(path: PropertyKey | PropertyKey[]) {
    const ks = toPath(path);
    if (ks.length > 0) {
        const kl = ks[ks.length - 1];
        let f = (s) => s ? s[kl] : undefined;
        for (let i = ks.length - 2; i >= 0; i--) {
            f = compG(ks[i], f);
        }
        return f;
    }
    return (s) => s;
}

/**
 * Composes a setter function for given nested lookup path.
 * If `path` is given as string, it will be split using `.`.
 * Returns function which accepts single object and
 * when called, **immutably** updates value at given path,
 * i.e. produces a partial deep copy of obj up until given path.
 *
 * If any intermediate key is not present in the given obj,
 * creates a plain empty object for that key and descends further.
 *
 * If `path` is an empty array, the returned setter will simply
 * return the new value.
 *
 * Also see: `setIn()`, `updateIn()`, `deleteIn()`
 *
 * ```
 * s = setter("a.b.c");
 * // or
 * s = setter(["a","b","c"]);
 *
 * s({a: {b: {c: 23}}}, 24)
 * // {a: {b: {c: 24}}}
 *
 * s({x: 23}, 24)
 * // { x: 23, a: { b: { c: 24 } } }
 *
 * s(null, 24)
 * // { a: { b: { c: 24 } } }
 * ```
 *
 * Only keys in the path will be modied, all other keys present
 * in the given object retain their original values to provide
 * efficient structural sharing / re-use.
 *
 * ```
 * s = setter("a.b.c");
 *
 * a = {x: {y: {z: 1}}};
 * b = s(a, 2);
 * // { x: { y: { z: 1 } }, a: { b: { c: 2 } } }
 *
 * a.x === b.x // true
 * a.x.y === b.x.y // true
 * ```
 *
 * @param path
 */
export function setter(path: PropertyKey | PropertyKey[]) {
    const ks = toPath(path);
    if (ks.length > 0) {
        const kl = ks[ks.length - 1];
        let f = (s, v) => ({ ...(s || {}), [kl]: v });
        for (let i = ks.length - 2; i >= 0; i--) {
            f = compS(ks[i], f);
        }
        return f;
    }
    return (_, v) => v;
}

/**
 * Immediate use getter, i.e. same as: `getter(path)(state)`.
 *
 * ```
 * getIn({a: {b: {c: 23}}}, "a.b.c");
 * // 23
 * ```
 *
 * @param state
 * @param path
 */
export function getIn(state: any, path: PropertyKey | PropertyKey[]) {
    return getter(path)(state);
}

/**
 * Immediate use setter, i.e. same as: `setter(path)(state, val)`.
 *
 * ```
 * setIn({}, "a.b.c", 23);
 * // {a: {b: {c: 23}}}
 * ```
 *
 * @param state
 * @param path
 */
export function setIn(state: any, path: PropertyKey | PropertyKey[], val: any) {
    return setter(path)(state, val);
}

/**
 * Similar to `setIn()`, but applies given function to current path
 * value (incl. any additional/optional arguments passed to `updateIn`)
 * and uses result as new value. Does not modify original state (unless
 * given function does so itself).
 *
 * ```
 * add = (x, y) => x + y;
 * updateIn({a: {b: {c: 23}}}, "a.b.c", add, 10);
 * // {a: {b: {c: 33}}}
 * ```
 *
 * @param state
 * @param path
 */
export function updateIn(state: any, path: PropertyKey | PropertyKey[], fn: SwapFn<any>, ...args: any[]) {
    args.unshift(getIn(state, path));
    return setter(path)(state, fn.apply(null, args));
}

/**
 * Uses `updateIn()` and returns updated state with key for given path removed.
 * Does not modify original state.
 *
 * Returns `undefined` if `path` is an empty array.
 *
 * ```
 * deleteIn({a:{b:{c: 23}}}, "a.b.c");
 * // {a: {b: {}}}
 * ```
 *
 * @param state
 * @param path
 */
export function deleteIn(state: any, path: PropertyKey | PropertyKey[]) {
    const ks = [...toPath(path)];
    if (ks.length > 0) {
        const k = ks.pop();
        return updateIn(state, ks, (x) => { x = { ...x }; delete x[k]; return x; });
    }
}
