export function isPosititve(x: any): x is number {
    return typeof x === "number" && x > 0;
}
