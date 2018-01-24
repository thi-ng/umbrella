export function isArray(x: any): x is Array<any> {
    return x != null && x.constructor === Array;
}
