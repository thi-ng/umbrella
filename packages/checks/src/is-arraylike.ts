export function isArrayLike(x: any): x is ArrayLike<any> {
    return Array.isArray(x) || (x != null && x.length !== undefined);
}
