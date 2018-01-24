export function isArrayLike(x: any): x is ArrayLike<any> {
    return x != null && (x.constructor === Array || x.length !== undefined);
}
