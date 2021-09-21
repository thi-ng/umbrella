import type { NumOrString, Path } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { isProtoPath } from "@thi.ng/checks/is-proto-path";
import { isString } from "@thi.ng/checks/is-string";
import { assert } from "@thi.ng/errors/assert";

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
export const toPath = (path: Path): readonly NumOrString[] =>
    isArray(path)
        ? <any[]>path
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
 * Helper function to analyze given `path` using
 * {@link @thi.ng/checks#isProtoPath}. Throws an error if path contains any
 * property which might lead to prototype poisoning.
 *
 * @remarks
 * The following properties are considered illegal.
 *
 * - `__proto__`
 * - `prototype`
 * - `constructor`
 *
 * @param path
 */
export const disallowProtoPath = (path: Path) => (
    assert(!isProtoPath(path), `unsafe path: '${path}'`), path
);
