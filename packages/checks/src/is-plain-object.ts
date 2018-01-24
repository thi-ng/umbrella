export function isPlainObject(x: any): x is Object {
    return x != null && x.constructor === Object;
}
