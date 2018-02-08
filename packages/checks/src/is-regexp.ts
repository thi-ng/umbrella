export function isRegExp(x: any): x is RegExp {
    return x instanceof RegExp;
}
