import type { Fn, NumOrString } from "@thi.ng/api";
import { SEMAPHORE } from "@thi.ng/api/api";
import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { isString } from "@thi.ng/checks/is-string";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { getInUnsafe } from "@thi.ng/paths/get-in";
import { mutInUnsafe } from "@thi.ng/paths/mut-in";
import { exists } from "@thi.ng/paths/path";

const RE_ARGS = /^(function\s+\w+)?\s*\(\{([\w\s,:]+)\}/;

export type Unresolved<T> = {
    [K in keyof T]:
        | Unresolved<T[K]>
        | Fn<T, T[K]>
        | Fn<ResolveFn, T[K]>
        | Function
        | string;
};

export type ResolveFn = (path: string) => any;

export type LookupPath = NumOrString[];

/**
 * Visits all key-value pairs or array items in depth-first order, expands any
 * reference values, mutates the original object and returns it. Cyclic
 * references are not allowed and will throw an error. However, refs pointing to
 * other refs are recursively resolved (again, provided there are no cycles).
 *
 * @remarks
 * Reference values are special strings representing lookup paths of other
 * values in the object and are prefixed with given `prefix` string (default:
 * `@`) for relative refs or `@/` for absolute refs and both using `/` as path
 * separator (Note: trailing slashes are NOT allowed!). Relative refs are
 * resolved from the currently visited object and support "../" prefixes to
 * access any parent levels. Absolute refs are always resolved from the root
 * level (the original object passed to this function).
 *
 * @example
 * ```ts
 * // `c` references sibling `d`
 * // `d` references parent `a`
 * resolve({ a: 1, b: { c: "@d", d: "@/a" } })
 * // { a: 1, b: { c: 1, d: 1 } }
 * ```
 *
 * Any function values are called using two possible conventions:
 *
 * 1) If the user function uses ES6 object destructuring for its first
 *    argument, the given object keys are resolved prior to calling the
 *    function and the resolved values provided as first argument
 *    (object) and a general `resolve` function as second argument.
 * 2) If no de-structure form is found in the function's arguments, the
 *    function is only called with `resolve` as argument.
 *
 * **Important:** Since ES6 var names can't contain special characters,
 * destructured keys can ALWAYS only be looked up as siblings of the
 * currently processed key.
 *
 * The `resolve` function provided as arg to the user function accepts a
 * path (**without `@` prefix**) to look up any other values in the root
 * object.
 *
 * ```
 * // `c` uses ES6 destructuring form to look up `a` & `b` values
 * // `d` uses provided resolve fn arg `$` to look up `c`
 * resolve({ a: 1, b: 2, c: ({ a, b }) => a + b, d: ($) => $("c") })
 * // { a: 1, b: 2, c: 3, d: 3 }
 *
 * // last item references item @ index = 2
 * resolve([1, 2, ($) => $("0") + $("1"), "@2"])
 * // [1, 2, 3, 3]
 * ```
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
 * ```
 * // `a` is derived from 1st array element in `b.d`
 * // `b.c` is looked up from `b.d[0]`
 * // `b.d[1]` is derived from calling `e(2)`
 * // `e` is a wrapped function
 * res = resolve({
 *   a: ($) => $("b/c") * 100,
 *   b: { c: "@d/0", d: [2, ($) => $("../../e")(2) ] },
 *   e: () => (x) => x * 10,
 *   f: () => "@foo",
 * })
 * // { a: 200, b: { c: 2, d: [ 2, 20 ] }, e: [Function], f: "@foo" }
 *
 * res.e(2);
 * // 20
 * ```
 *
 * @param root -
 * @param prefix -
 */
export function resolve<T>(root: Unresolved<T>, prefix?: string): T;
export function resolve<T>(root: Unresolved<T[]>, prefix?: string): T[];
export function resolve(root: any, prefix = "@") {
    if (isPlainObject(root)) {
        return resolveMap(root, prefix);
    } else if (isArray(root)) {
        return resolveArray(root, prefix);
    }
    return root;
}

const resolveMap = <T>(
    obj: Unresolved<T>,
    prefix: string,
    root?: any,
    path: LookupPath = [],
    resolved: any = {},
    stack: string[] = []
) => {
    root = root || obj;
    for (let k in obj) {
        _resolve(root, [...path, k], resolved, stack, prefix);
    }
    return <T>obj;
};

const resolveArray = <T>(
    arr: Unresolved<T[]>,
    prefix: string,
    root?: any,
    path: LookupPath = [],
    resolved: any = {},
    stack: string[] = []
): T[] => {
    root = root || arr;
    for (let k = 0, n = arr.length; k < n; k++) {
        _resolve(root, [...path, k], resolved, stack, prefix);
    }
    return <any>arr;
};

/**
 * The actual recursive resolution mechanism. Takes root object, key
 * path, helper object for marking visited keys and a stack of currently
 * active lookups. The latter is used for cycle detection and `_resolve`
 * will throw an error if a cycle has been detected.
 *
 * @param root -
 * @param path -
 * @param resolved -
 * @param stack -
 */
const _resolve = (
    root: any,
    path: LookupPath,
    resolved: any,
    stack: string[],
    prefix: string
) => {
    const pathID = path.join("/");
    if (stack.indexOf(pathID) >= 0) {
        illegalArgs(`cyclic references not allowed: ${pathID}`);
    }
    // console.log(pp, resolved[pp], stack);
    let v = getInUnsafe(root, path);
    if (!resolved[pathID]) {
        let res = SEMAPHORE;
        stack.push(pathID);
        if (isPlainObject(v)) {
            resolveMap(v, prefix, root, path, resolved, stack);
        } else if (isArray(v)) {
            resolveArray(v, prefix, root, path, resolved, stack);
        } else if (isString(v) && v.startsWith(prefix)) {
            res = _resolve(
                root,
                absPath(path, v, prefix.length),
                resolved,
                stack,
                prefix
            );
        } else if (isFunction(v)) {
            res = resolveFunction(
                v,
                (p: string) =>
                    _resolve(
                        root,
                        absPath(path, p, 0),
                        resolved,
                        stack,
                        prefix
                    ),
                pathID,
                resolved
            );
        } else if (!exists(root, path)) {
            v = resolvePath(root, path, resolved, stack, prefix);
        }
        if (res !== SEMAPHORE) {
            mutInUnsafe(root, path, res);
            v = res;
        }
        resolved[pathID] = true;
        stack.pop();
    }
    return v;
};

/**
 * Repeatedly calls `_resolve` by stepwise descending along given path
 * and returns final value. This is to ensure full resolution of deeper
 * values created by functions at intermediate tree levels.
 *
 * E.g. given:
 *
 * ```
 * {a: () => ({b: {c: 1}}), d: "@/a/b/c" }
 * =>
 * { a: { b: { c: 1 } }, d: 1 }
 * ```
 *
 * @param root -
 * @param path -
 * @param resolved -
 */
const resolvePath = (
    root: any,
    path: LookupPath,
    resolved: any,
    stack: string[],
    prefix: string
) => {
    // temporarily remove current path to avoid cycle detection
    let pathID = stack.pop();
    let v;
    for (let i = 1, n = path.length; i <= n; i++) {
        v = _resolve(root, path.slice(0, i), resolved, stack, prefix);
    }
    // restore
    stack.push(pathID!);
    return v;
};

/**
 * Resolution helper for function values. Checks if the user function
 * uses ES6 object destructuring for its first argument and if so
 * resolves the given keys before calling the function and provides
 * their values as first arg. If no de-structure form is found, calls
 * function only with `resolve` as argument.
 *
 * If the user function returns an array or plain object, all of its
 * nested values are marked as resolved.
 *
 * See `resolve` comments for further details.
 *
 * @param fn -
 * @param resolve -
 * @param pathID - current base path for marking
 * @param resolved -
 */
const resolveFunction = (
    fn: (x: any, r?: ResolveFn) => any,
    resolve: ResolveFn,
    pathID: string,
    resolved: any
) => {
    const match = RE_ARGS.exec(fn.toString());
    let res;
    if (match) {
        const args = match[2]
            // remove white space and trailing comma
            .replace(/\s|(,\s*$)/g, "")
            .split(/,/g)
            .map((k) => k.split(":")[0])
            .reduce((acc: any, k) => ((acc[k] = resolve(k)), acc), {});
        res = fn(args, resolve);
    } else {
        res = fn(resolve);
    }
    markResolved(res, pathID, resolved);
    return res;
};

const markResolved = (v: any, path: string, resolved: any) => {
    resolved[path] = true;
    if (isPlainObject(v)) {
        markObjResolved(v, path, resolved);
    } else if (isArray(v)) {
        markArrayResolved(v, path, resolved);
    }
};

const markObjResolved = (obj: any, path: string, resolved: any) => {
    let v, p;
    for (let k in obj) {
        v = obj[k];
        p = path + "/" + k;
        markResolved(v, p, resolved);
    }
};

const markArrayResolved = (arr: any[], path: string, resolved: any) => {
    let v, p;
    for (let i = 0, n = arr.length; i < n; i++) {
        v = arr[i];
        p = path + "/" + i;
        markResolved(v, p, resolved);
    }
};

/**
 * Takes the path for the current key and a lookup path string. Converts
 * the possibly relative lookup path into its absolute form.
 *
 * @param curr -
 * @param path -
 * @param idx -
 */
export const absPath = (
    curr: LookupPath,
    path: string,
    idx = 1
): NumOrString[] => {
    if (path.charAt(idx) === "/") {
        return path.substring(idx + 1).split("/");
    }
    curr = curr.slice(0, curr.length - 1);
    const sub = path.substring(idx).split("/");
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
