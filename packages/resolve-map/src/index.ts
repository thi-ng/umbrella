import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { isString } from "@thi.ng/checks/is-string";
import { getIn, mutIn, toPath } from "@thi.ng/paths";

const SEMAPHORE = Symbol("SEMAPHORE");

/**
 * Visits all key-value pairs in depth-first order for given object and
 * expands any reference values. Cyclic references are not allowed or
 * checked for and if present will cause a stack overflow error.
 * However, refs pointing to other refs are recursively resolved (again,
 * provided there are no cycles).
 *
 * Reference values are special strings representing lookup paths of
 * other values in the object and are prefixed with `->` for relative
 * refs or `->/` for absolute refs. Relative refs are resolved from
 * currently visited object and only support child access (no
 * ancestors). Absolute refs are resolved from root level (the original
 * object passed to this function).
 *
 * ```
 * resolveMap({a: 1, b: {c: "->d", d: "->/a"} })
 * // { a: 1, b: { c: 1, d: 1 } }
 * ```
 *
 * If a value is a function, it is called with a single arg `resolve`, a
 * function which accepts an *absolute* path to look up other values.
 * The return value of the (value) function is used as final value for
 * that key. This mechanism can be used to compute derived values of
 * other values stored in the object.
 *
 * ```
 * // the value of `a` is derived from 1st array element in `b.d`
 * resolveMap({
 *   a: (resolve) => resolve("b.c") * 10,
 *   b: { c: "->d.0", d: [2, 3] }
 * })
 * // { a: 20, b: { c: 2, d: [ 2, 3 ] } }
 * ```
 *
 * The function mutates the original object and returns it. User code
 * should never provide the optional `root` arg (only used for internal
 * recursion purposes).
 *
 * @param obj
 * @param root
 */
export const resolveMap = (obj: any, root?: any, path: PropertyKey[] = [], resolved: any = {}) => {
    root = root || obj;
    for (let k in obj) {
        _resolve(root, [...path, k], resolved);
    }
    // console.log("resolved:::", resolved);
    return obj;
}

export const resolveArray = (arr: any[], root?: any, path: PropertyKey[] = [], resolved: any = {}) => {
    root = root || arr;
    for (let k = 0, n = arr.length; k < n; k++) {
        _resolve(root, [...path, k], resolved);
    }
    return arr;
}

const _resolve = (root: any, path: PropertyKey[], resolved: any) => {
    let v = getIn(root, path), rv = SEMAPHORE;
    const pp = path.join(".");
    if (!resolved[pp]) {
        if (isString(v) && v.indexOf("->") === 0) {
            if (v.charAt(2) === "/") {
                rv = _resolve(root, toPath(v.substr(3)), resolved);
            } else {
                rv = _resolve(root, [...path.slice(0, path.length - 1), ...toPath(v.substr(2))], resolved);
            }
        } else if (isPlainObject(v)) {
            resolveMap(v, root, path, resolved);
        } else if (isArray(v)) {
            resolveArray(v, root, path, resolved);
        } else if (isFunction(v)) {
            rv = v((p) => _resolve(root, toPath(p), resolved));
        }
        if (rv !== SEMAPHORE) {
            mutIn(root, path, rv);
            v = rv;
        }
        resolved[pp] = true;
    }
    return v;
}
