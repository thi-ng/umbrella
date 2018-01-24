export function isSymbol(x: any): x is Symbol {
    return typeof x === "symbol";
}
