export function isSet(x: any): x is Set<any> {
    return x instanceof Set;
}
