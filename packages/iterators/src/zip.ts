import { iterator } from "./iterator.js";

export const zip = (keys: Iterable<any>, vals: Iterable<any>, target?: any) => {
    let kiter = iterator(keys);
    let viter = iterator(vals);
    let k: IteratorResult<string>;
    let v: IteratorResult<any>;
    target = target || {};
    while (true) {
        k = kiter.next();
        v = viter.next();
        if (k.done || v.done) {
            return target;
        }
        target[k.value] = v.value;
    }
};
