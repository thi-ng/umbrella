import { iterator } from "./iterator";

export function zip(keys: Iterable<any>, vals: Iterable<any>, target?: any) {
    let kiter = iterator(keys),
        viter = iterator(vals),
        k: IteratorResult<string>,
        v: IteratorResult<any>;
    target = target || {};
    while (true) {
        k = kiter.next();
        v = viter.next();
        if (k.done || v.done) {
            return target;
        }
        target[k.value] = v.value;
    }
}
