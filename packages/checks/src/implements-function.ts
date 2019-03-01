export const implementsFunction = (x: any, fn: string | symbol) =>
    x != null && typeof x[fn] === "function";
