import { iterator } from "./iterator.js";

export function* map<T>(fn: (...args: any[]) => T, ...inputs: Iterable<any>[]) {
    let v: IteratorResult<T>;
    let n = inputs.length;
    switch (n) {
        case 0:
            return;
        case 1:
            let iter = iterator(inputs[0]);
            while (((v = iter.next()), !v.done)) {
                yield fn(v.value);
            }
            return;
        default:
            let iters = inputs.map(iterator);
            while (true) {
                let args = [];
                for (let i = 0; i < n; i++) {
                    v = iters[i].next();
                    if (v.done) {
                        return;
                    }
                    args.push(v.value);
                }
                yield fn.apply(null, args);
            }
    }
}
