import { assert, NumOrString, Path } from "@thi.ng/api";
import { isArray, isString } from "@thi.ng/checks";

/**
 * Converts the given key path to canonical form (array).
 *
 * ```
 * toPath("a.b.c");
 * // ["a", "b", "c"]
 *
 * toPath(0)
 * // [0]
 *
 * toPath(["a", "b", "c"])
 * // ["a", "b", "c"]
 * ```
 *
 * @param path -
 */
export const toPath = (path: Path): NumOrString[] =>
    isArray(path)
        ? path
        : isString(path)
        ? path.length > 0
            ? path.split(".")
            : []
        : path != null
        ? [path]
        : [];

/**
 * Takes an arbitrary object and lookup path. Descends into object along
 * path and returns true if the full path exists (even if final leaf
 * value is `null` or `undefined`). Checks are performed using
 * `hasOwnProperty()`.
 *
 * @param obj -
 * @param path -
 */
export const exists = (obj: any, path: Path) => {
    if (obj == null) {
        return false;
    }
    path = toPath(path);
    for (let n = path.length - 1, i = 0; i <= n; i++) {
        const k = path[i];
        if (!obj.hasOwnProperty(k)) {
            return false;
        }
        obj = obj[k];
        if (obj == null && i < n) {
            return false;
        }
    }
    return true;
};

/**
 * Helper function to analyze given lookup path for presence of
 * `__proto__`. Returns true if the case.
 *
 * @remarks
 * Also see {@link disallowProtoPath}
 *
 * @param path
 */
export const isProtoPath = (path: Path) =>
    isArray(path)
        ? path.some((x) => x === "__proto__")
        : isString(path)
        ? path.indexOf("__proto__") >= 0
        : false;

/**
 * Helper function to analyze given path using {@link isProtoPath}.
 * Throws error if path contains `__proto__`.
 *
 * @param path
 */
export const disallowProtoPath = (path: Path) => (
    assert(!isProtoPath(path), `unsafe path: '${path}'`), path
);
