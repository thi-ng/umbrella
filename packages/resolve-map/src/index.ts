import { Path, getIn, toPath } from "@thi.ng/paths";
import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { isString } from "@thi.ng/checks/is-string";

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
export function resolveMap(obj: any, root?: any) {
    for (let k in obj) {
        obj[k] = _resolve(k, obj, root);
    }
    return obj;
}

/**
 * Same as `resolveMap`, but for arrays.
 *
 * @param arr
 * @param root
 */
export function resolveArray(arr: any[], root?: any) {
    for (let i = 0, n = arr.length; i < n; i++) {
        arr[i] = _resolve(i, arr, root);
    }
    return arr;
}

function _resolve(k: Path, obj: any, root?: any, makeAbs = false) {
    root = root || obj;
    const v = getIn(obj, k);
    if (isString(v) && v.indexOf("->") === 0) {
        if (v.charAt(2) === "/") {
            return _resolve(v.substr(3), root, root);
        } else {
            if (makeAbs) {
                const path = toPath(k);
                return _resolve([...path.slice(0, path.length - 1), ...toPath(v.substr(2))], root);
            }
            return _resolve(v.substr(2), obj, root);
        }
    } else if (isPlainObject(v)) {
        return resolveMap(v, root);
    } else if (isArray(v)) {
        return resolveArray(v, root);
    } else if (isFunction(v)) {
        return v((x) => _resolve(x, root, root, true));
    } else {
        return v;
    }
}
