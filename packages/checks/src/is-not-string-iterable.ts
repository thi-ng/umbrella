export function isNotStringAndIterable(x: any): x is Iterable<any> {
    return x != null &&
        typeof x !== "string" &&
        typeof x[Symbol.iterator] === "function";
}
