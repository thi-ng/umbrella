export function isNegative(x: any): x is number {
    return typeof x === "number" && x < 0;
}
