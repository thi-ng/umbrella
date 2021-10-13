import { illegalArity } from "@thi.ng/errors/illegal-arity";
import { cycle } from "./cycle.js";
import { iterator } from "./iterator.js";
import { map } from "./map.js";

export function* interleave(...inputs: Iterable<any>[]) {
    let n = inputs.length;
    if (n === 0) {
        illegalArity(0);
    }
    let iter = cycle(map(iterator, inputs));
    let chunk = [];
    let v: IteratorResult<any>;
    while (true) {
        for (let i = 0; i < n; i++) {
            if (((v = (iter.next().value as Iterator<any>).next()), v.done)) {
                return;
            }
            chunk[i] = v.value;
        }
        yield* chunk;
    }
}
