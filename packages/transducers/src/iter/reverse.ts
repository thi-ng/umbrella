export function* reverse<T>(input: Iterable<T>) {
    if (!(input.constructor === Array || (<any>input).length !== undefined)) {
        input = [...input];
    }
    let n = (<any>input).length;
    while (--n >= 0) {
        yield input[n];
    }
}
