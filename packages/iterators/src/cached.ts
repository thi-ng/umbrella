import iterator from "./iterator";

export default function cached<T>(input: Iterable<T>) {
    let cache: T[] = [],
        iter = iterator(input),
        done = false;
    return function () {
        let i = 0;
        return {
            [Symbol.iterator](): IterableIterator<T> { return this; },
            next(): IteratorResult<T> {
                if (i < cache.length) {
                    return { done: false, value: cache[i++] };
                } else if (!done) {
                    let v = iter.next();
                    if (!v.done) {
                        i++;
                        cache.push(v.value);
                        return { done: false, value: v.value };
                    }
                    done = true;
                }
                return { done, value: undefined };
            }
        };
    };
}
