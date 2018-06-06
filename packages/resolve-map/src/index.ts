import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { isString } from "@thi.ng/checks/is-string";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { getIn, mutIn } from "@thi.ng/paths";

const SEMAPHORE = Symbol("SEMAPHORE");

const RE_ARGS = /^(function\s+\w+)?\s*\(\{([\w\s,]+)\}/

export type ResolveFn = (path: string) => any;

export type LookupPath = PropertyKey[];

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
 * If a value is a function, it is called using two possible
 * conventions:
 *
 * 1) If the user function uses ES6 object destructuring for its first
 *    argument, the given object keys are resolved prior to calling the
 *    function and the resolved values provided as first argument and a
 *    general `resolve` function as second argument.
 * 2) If no de-structure form is found in the function's arguments, the
 *    function is only called with `resolve` as argument.
 *
 * **Important:** Since ES6 var names can't contain special characters,
 * destructured keys are ALWAYS looked up as siblings of the currently
 * processed value.
 *
 * ```
 * // `c` uses ES6 destructuring form to look up `a` & `b` values
 * {a: 1, b: 2, c: ({a,b}) => a + b }
 * =>
 * // { a: 1, b: 2, c: 3 }
 * ```
 *
 * The single arg `resolve` function accepts a path (**without `@`
 * prefix**) to look up any other values in the object.
 *
 * The return value of the user provided function is used as final value
 * for that key in the object. This mechanism can be used to compute
 * derived values of other values stored anywhere in the root object.
 * **Function values will always be called only once.** Therefore, in
 * order to associate a function as final value to a key, it MUST be
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
export const resolveMap = (obj: any, root?: any, path: LookupPath = [], resolved: any = {}) => {
    root = root || obj;
    for (let k in obj) {
        _resolve(root, [...path, k], resolved);
    }
    return obj;
};

/**
 * Like `resolveMap`, but for arrays.
 *
 * @param arr
 * @param root
 * @param path
 * @param resolved
 */
const _resolveArray = (arr: any[], root?: any, path: LookupPath = [], resolved: any = {}) => {
    root = root || arr;
    for (let k = 0, n = arr.length; k < n; k++) {
        _resolve(root, [...path, k], resolved);
    }
    return arr;
};

const _resolve = (root: any, path: LookupPath, resolved: any) => {
    let rv = SEMAPHORE;
    let v = getIn(root, path);
    const pp = path.join("/");
    if (!resolved[pp]) {
        if (pp.length > 1) {
            resolved[path.slice(0, path.length - 1).join("/")] = true;
        }
        if (isPlainObject(v)) {
            resolveMap(v, root, path, resolved);
        } else if (isArray(v)) {
            _resolveArray(v, root, path, resolved);
        } else if (isString(v) && v.charAt(0) === "@") {
            rv = _resolvePath(root, absPath(path, v), resolved);
        } else if (isFunction(v)) {
            rv = _resolveFunction(v, (p: string) => _resolvePath(root, absPath(path, p, 0), resolved));
        }
        if (rv !== SEMAPHORE) {
            mutIn(root, path, rv);
            v = rv;
        }
        resolved[pp] = true;
    }
    return v;
};

/**
 * Resolution helper for function values. Checks if the user function
 * uses ES6 object destructuring for its first argument and if so
 * resolves the given keys before calling the function and provides
 * their values as first arg. If no de-structure form is found, calls
 * function only with `resolve` as argument.
 *
 * See `resolveMap` comments for further details.
 *
 * @param fn
 * @param resolve
 */
const _resolveFunction = (fn: (x: any, r?: ResolveFn) => any, resolve: ResolveFn) => {
    const match = RE_ARGS.exec(fn.toString());
    if (match) {
        const args = {};
        for (let k of match[2].replace(/\s/g, "").split(/,/g)) {
            args[k] = resolve(k);
        }
        return fn(args, resolve);
    } else {
        return fn(resolve);
    }
};

/**
 * If the value at given path is still unresolved, repeatedly calls
 * `_resolve` by stepwise descending along given path and returns final
 * value. This is to ensure full resolution of deeper values created by
 * functions at intermediate tree levels. If the path is already marked
 * as resolved, returns its value.
 *
 * E.g. given:
 *
 * ```
 * {a: () => ({b: {c: 1}}), d: "@/a/b/c" }
 * =>
 * { a: { b: { c: 1 } }, d: 1 }
 * ```
 *
 * @param root
 * @param path
 * @param resolved
 */
const _resolvePath = (root: any, path: LookupPath, resolved: any) => {
    if (resolved[path.join("/")]) {
        return getIn(root, path);
    }
    let v;
    for (let i = 1, n = path.length; i <= n; i++) {
        v = _resolve(root, path.slice(0, i), resolved);
    }
    return v;
};

/**
 * Takes the path for the current key and a lookup path string. Converts
 * the possibly relative lookup path into its absolute form.
 *
 * @param curr
 * @param path
 * @param idx
 */
export const absPath = (curr: LookupPath, path: string, idx = 1): PropertyKey[] => {
    if (path.charAt(idx) === "/") {
        return path.substr(idx + 1).split("/");
    }
    curr = curr.slice(0, curr.length - 1);
    const sub = path.substr(idx).split("/");
    for (let i = 0, n = sub.length; i < n; i++) {
        if (sub[i] === "..") {
            !curr.length && illegalArgs(`invalid lookup path: ${path}`);
            curr.pop();
        } else {
            return curr.concat(sub.slice(i));
        }
    }
    !curr.length && illegalArgs(`invalid lookup path: ${path}`);
    return curr;
};
