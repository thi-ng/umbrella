export function isPromise(x: any): x is Promise<any> {
    return x instanceof Promise;
}
