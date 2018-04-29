export function isArrayLike(x: any): x is ArrayLike<any> {
    return (x != null && typeof x !== "function" && x.length !== undefined);
}
