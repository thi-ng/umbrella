export function isPlainObject(x: any): x is Object {
    return Object.prototype.toString.call(x) === "[object Object]";
}
