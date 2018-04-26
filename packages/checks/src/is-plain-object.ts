/**
 * Similar to `isObject()`, but also checks if prototype is that of
 * `Object` (or `null`).
 *
 * @param x
 */
export function isPlainObject(x: any): x is object {
    let proto;
    return Object.prototype.toString.call(x) === "[object Object]" &&
        (proto = Object.getPrototypeOf(x), proto === null || proto === Object.getPrototypeOf({}));
}
