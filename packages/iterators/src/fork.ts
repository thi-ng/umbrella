import { DCons } from "@thi.ng/dcons";

import { iterator } from "./iterator";

export function fork<T>(src: Iterable<T>, cacheLimit = 16) {
    const iter = iterator(src),
        cache = new DCons<T>(),
        forks = [];
    let done = false,
        total = 0;

    function consume() {
        if (!done) {
            if (cache.length === cacheLimit) {
                cache.drop();
                for (let i = forks.length - 1; i >= 0; i--) {
                    forks[i] = Math.max(forks[i] - 1, 0);
                }
            }
            const v = iter.next();
            if (!v.done) {
                cache.push(v.value);
                total++;
            }
            done = v.done;
            return v.value;
        }
    }

    return function () {
        const id = forks.length;
        forks.push(0);
        return <IterableIterator<T>>{
            [Symbol.iterator](): Iterator<T> { return this; },
            next() {
                if (forks[id] < cache.length) {
                    if (forks[id] < total) {
                        return { done: false, value: cache.nth(forks[id]++) };
                    }
                }
                else {
                    const value = consume();
                    if (!done) {
                        forks[id]++;
                    }
                    return { done, value };
                }
            }
        };
    };
}
