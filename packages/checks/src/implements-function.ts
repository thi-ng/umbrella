export function implementsFunction(x: any, fn: string | symbol) {
    return x != null && typeof x[fn] === "function";
}
