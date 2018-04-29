export function isMap(x: any): x is Map<any, any> {
    return x instanceof Map;
}
