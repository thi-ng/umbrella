export function isIterable(x: any): x is Iterable<any> {
    return x != null && typeof x[Symbol.iterator] === "function";
}
