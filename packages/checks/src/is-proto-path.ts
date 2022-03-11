import { isArray } from "./is-array.js";
import { isString } from "./is-string.js";

const ILLEGAL_KEYS = new Set(["__proto__", "prototype", "constructor"]);

/**
 * Returns true, if given `x` is an illegal object key as per
 * {@link ILLEGAL_KEYS}.
 *
 * @see {@link isProtoPath} for more details
 *
 * @param x - 
 */
export const isIllegalKey = (x: any) => ILLEGAL_KEYS.has(x);

/**
 * Returns true if given `path` contains any {@link ILLEGAL_KEYS}, i.e. could be
 * used to poison the prototype chain of an object.
 *
 * @remarks
 * If given an array, each item is considered a single sub-path property and
 * will be checked as is. If given a string it will be split using "." as
 * delimiter and each item checked as is (same way array paths are handled).
 *
 * Original discussion here, implementation updated to be more encompassing:
 * https://github.com/thi-ng/umbrella/pull/273
 *
 * @param path - 
 */
export const isProtoPath = (
    path: string | number | readonly (string | number)[]
) =>
    isArray(path)
        ? path.some(isIllegalKey)
        : isString(path)
        ? path.indexOf(".") !== -1
            ? path.split(".").some(isIllegalKey)
            : isIllegalKey(path)
        : false;
