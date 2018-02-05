import { cycle } from "./cycle";
import { map } from "./map";
import { iterator } from "./iterator";

export function* interleave(...inputs: Iterable<any>[]) {
    let n = inputs.length;
    if (n === 0) {
        throw new Error(`no inputs given`);
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
