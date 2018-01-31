import { isArray } from "@thi.ng/checks/is-array";
import { isString } from "@thi.ng/checks/is-string";

function compS(k, f) {
    return (s, v) => ({ ...s, [k]: f((s || {})[k], v) });
}

function compG(k, f) {
    return (s) => s ? f(s[k]) : undefined;
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
    const ks = isArray(path) ? path : isString(path) ? path.split(".") : [path],
        kl = ks.pop();
    let f = (s) => s ? s[kl] : undefined;
    for (let i = ks.length - 1; i >= 0; i--) {
        f = compG(ks[i], f);
    }
    return f;
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
    const ks = isArray(path) ? path : isString(path) ? path.split(".") : [path],
        kl = ks.pop();
    let f = (s, v) => ({ ...(s || {}), [kl]: v });
    for (let i = ks.length - 1; i >= 0; i--) {
        f = compS(ks[i], f);
    }
    return f;
}
