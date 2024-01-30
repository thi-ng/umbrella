import type { NumOrString, Path } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { isNumber } from "@thi.ng/checks/is-number";
import { isProtoPath } from "@thi.ng/checks/is-proto-path";
import { isString } from "@thi.ng/checks/is-string";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";

/**
 * Converts the given key path to canonical form (array).
 *
 * @remarks
 * If given path is an array, performs a safety check to ensure that all path
 * items are strings or numbers and that illegal paths like `[["__proto__"],
 * "foo"]` will be disallowed (throws an error).
 *
 * Also see {@link disallowProtoPath}.
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
export const toPath = (path: Path): readonly NumOrString[] => {
	if (isArray(path)) {
		if (!path.every((x) => isString(x) || isNumber(x))) __illegal(path);
		return <any[]>path;
	} else {
		return isString(path)
			? path.length > 0
				? path.split(".")
				: []
			: path != null
			? <any[]>[path]
			: [];
	}
};

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
 * Helper function. First converts given `path` using {@link toPath} and then
 * analyzes it via
 * [`isProtoPath()`](https://docs.thi.ng/umbrella/checks/functions/isProtoPath.html).
 * Throws an error if path contains any property which might lead to prototype
 * poisoning. Returns converted path if valid.
 *
 * @remarks
 * The following properties are considered illegal.
 *
 * - `__proto__`
 * - `prototype`
 * - `constructor`
 *
 * @param path -
 */
export const disallowProtoPath = (path: Path): readonly NumOrString[] => {
	const $path = toPath(path);
	if (isProtoPath($path)) __illegal(path);
	return $path;
};

/** @internal */
const __illegal = (path: any) =>
	illegalArgs(`illegal path: ${JSON.stringify(path)}`);
