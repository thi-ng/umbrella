import { iterator } from "./iterator";

export const cached = <T>(input: Iterable<T>) => {
    let cache: T[] = [];
    let iter = iterator(input);
    let done = false;
    return function () {
        let i = 0;
        return {
            [Symbol.iterator](): IterableIterator<T> {
                return this;
            },
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
                return <IteratorResult<T>>{ done };
            },
        };
    };
};
