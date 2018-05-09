import { illegalArgs } from "@thi.ng/api/error";
import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { isString } from "@thi.ng/checks/is-string";
import { getIn, mutIn } from "@thi.ng/paths";

const SEMAPHORE = Symbol("SEMAPHORE");

/**
 * Visits all key-value pairs in depth-first order for given object or
 * array, expands any reference values, mutates the original object and
 * returns it. Cyclic references are not allowed or checked for and if
 * present will cause a stack overflow error. However, refs pointing to
 * other refs are recursively resolved (again, provided there are no
 * cycles).
 *
 * Reference values are special strings representing lookup paths of
 * other values in the object and are prefixed with `@` for relative
 * refs or `@/` for absolute refs and both using `/` as path separator
 * (Note: trailing slashes are NOT allowed!). Relative refs are resolved
 * from currently visited object and support "../" prefixes to access
 * any parent levels. Absolute refs are always resolved from the root
 * level (the original object passed to this function).
 *
 * ```ts
 * resolveMap({a: 1, b: {c: "@d", d: "@/a"} })
 * // { a: 1, b: { c: 1, d: 1 } }
 * ```
 *
 * If a value is a function, it is called with a single arg `resolve`, a
 * function which accepts a path (**without `@` prefix**) to look up
 * other values. The return value of the user provided function is used
 * as final value for that key. This mechanism can be used to compute
 * derived values of other values stored anywhere in the root object.
 * **Function values will always be called only once.** Therefore, in
 * order to associate a function as value to a key, it needs to be
 * wrapped with an additional function, as shown for the `e` key in the
 * example below. Similarly, if an actual string value should happen to
 * start with `@`, it needs to be wrapped in a function (see `f` key
 * below).
 *
 * ```ts
 * // `a` is derived from 1st array element in `b.d`
 * // `b.c` is looked up from `b.d[0]`
 * // `b.d[1]` is derived from calling `e(2)`
 * // `e` is a wrapped function
 * res = resolveMap({
 *   a: (resolve) => resolve("b/c") * 100,
 *   b: { c: "@d/0", d: [2, (resolve) => resolve("../../e")(2) ] },
 *   e: () => (x) => x * 10,
 *   f: () => "@foo",
 * })
 * // { a: 200, b: { c: 2, d: [ 2, 20 ] }, e: [Function], f: "@foo" }
 *
 * res.e(2);
 * // 20
 * ```
 *
 * `resolveMap` mutates the original object and returns it. User code
 * should NEVER provide any of the optional args (these are only used
 * for internal recursion purposes).
 *
 * @param obj
 */
export const resolveMap = (obj: any, root?: any, path: PropertyKey[] = [], resolved: any = {}) => {
    root = root || obj;
    for (let k in obj) {
        _resolve(root, [...path, k], resolved);
    }
    return obj;
}

/**
 * Like `resolveMap`, but for arrays.
 *
 * @param arr
 * @param root
 * @param path
 * @param resolved
 */
const resolveArray = (arr: any[], root?: any, path: PropertyKey[] = [], resolved: any = {}) => {
    root = root || arr;
    for (let k = 0, n = arr.length; k < n; k++) {
        _resolve(root, [...path, k], resolved);
    }
    return arr;
}

const _resolve = (root: any, path: PropertyKey[], resolved: any) => {
    let v = getIn(root, path), rv = SEMAPHORE;
    const pp = path.join("/");
    if (!resolved[pp]) {
        if (isString(v) && v.charAt(0) === "@") {
            rv = _resolve(root, absPath(path, v), resolved);
        } else if (isPlainObject(v)) {
            resolveMap(v, root, path, resolved);
        } else if (isArray(v)) {
            resolveArray(v, root, path, resolved);
        } else if (isFunction(v)) {
            rv = v((p: string) => _resolve(root, absPath(path, p, 0), resolved));
        }
        if (rv !== SEMAPHORE) {
            mutIn(root, path, rv);
            v = rv;
        }
        resolved[pp] = true;
    }
    return v;
}

const absPath = (curr: PropertyKey[], q: string, idx = 1): PropertyKey[] => {
    if (q.charAt(idx) === "/") {
        return q.substr(idx + 1).split("/");
    }
    curr = curr.slice(0, curr.length - 1);
    const sub = q.substr(idx).split("/");
    for (let i = 0, n = sub.length; i < n; i++) {
        if (sub[i] === "..") {
            !curr.length && illegalArgs(`invalid lookup path`);
            curr.pop();
        } else {
            return curr.concat(sub.slice(i));
        }
    }
    !curr.length && illegalArgs(`invalid lookup path`);
    return curr;
}
