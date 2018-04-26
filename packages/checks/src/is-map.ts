export function isMap(x: any): x is Set<any> {
    return x instanceof Map;
}
