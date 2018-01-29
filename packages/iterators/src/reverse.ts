export function* reverse<T>(input: Iterable<T>) {
    if (!(input.constructor === Array || (input as T[]).length !== undefined)) {
        input = [...input];
    }
    let n = (input as T[]).length;
    while (--n >= 0) {
        yield input[n];
    }
}
